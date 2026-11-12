"use client";

import { useRef, useState } from "react";
import { ArrowRight, Fingerprint, Shield } from "./icons";

type Verification = {
  signature: boolean;
  authorized: boolean;
  fingerprint: string;
};
type SignedReceipt = {
  keyPair: CryptoKeyPair;
  signature: ArrayBuffer;
  payload: Uint8Array<ArrayBuffer>;
  fingerprint: string;
};

export function Playground() {
  const [deployment, setDeployment] = useState(0);
  const [revoked, setRevoked] = useState([false, false]);
  const [tampered, setTampered] = useState(false);
  const [result, setResult] = useState<Verification | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const receipts = useRef<(SignedReceipt | undefined)[]>([]);

  async function verify() {
    setPending(true);
    setError("");
    setResult(null);
    try {
      if (!crypto.subtle)
        throw new Error(
          "Web Crypto is unavailable. Open this page over HTTPS or localhost to run the demo.",
        );
      let receipt = receipts.current[deployment];
      if (!receipt) {
        const keyPair = (await crypto.subtle.generateKey(
          { name: "Ed25519" },
          false,
          ["sign", "verify"],
        )) as CryptoKeyPair;
        const payload = new TextEncoder().encode(
          `agentpassport:activity:v1\n${JSON.stringify({ passportId: "ap:near:testnet:42", deploymentId: `deployment_00${deployment + 1}`, eventType: "task.completed", outcome: "success" })}`,
        );
        const signature = await crypto.subtle.sign(
          "Ed25519",
          keyPair.privateKey,
          payload,
        );
        const publicKey = await crypto.subtle.exportKey(
          "raw",
          keyPair.publicKey,
        );
        const fingerprint = Array.from(new Uint8Array(publicKey))
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");
        receipt = { keyPair, signature, payload, fingerprint };
        receipts.current[deployment] = receipt;
      }
      const data = tampered
        ? new TextEncoder().encode(
            new TextDecoder()
              .decode(receipt.payload)
              .replace('"success"', '"modified"'),
          )
        : receipt.payload;
      const valid = await crypto.subtle.verify(
        "Ed25519",
        receipt.keyPair.publicKey,
        receipt.signature,
        data,
      );
      setResult({
        signature: valid,
        authorized: !revoked[deployment],
        fingerprint: receipt.fingerprint,
      });
    } catch (caught) {
      setError(
        caught instanceof Error && caught.message.includes("HTTPS")
          ? caught.message
          : "This browser cannot run Ed25519 verification. Try a recent version of Chrome, Safari, or Firefox.",
      );
    } finally {
      setPending(false);
    }
  }

  function reset() {
    setDeployment(0);
    setRevoked([false, false]);
    setTampered(false);
    setResult(null);
    setError("");
    receipts.current = [];
  }
  const accepted = result?.signature && result.authorized;

  return (
    <div className="playground">
      <div className="playground-toolbar">
        <div>
          <span className="terminal-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>identity.verify</span>
        </div>
        <span className="sandbox-label">
          <span className="status-dot" /> LOCAL SANDBOX
        </span>
      </div>
      <div className="playground-body">
        <div className="playground-agent">
          <div className="demo-agent-heading">
            <div className="demo-fingerprint">
              <Fingerprint />
            </div>
            <div>
              <span className="mono">EXAMPLE PASSPORT</span>
              <h3>
                Atlas<span>_001</span>
              </h3>
              <p>ap:near:testnet:42</p>
            </div>
          </div>
          <div className="deployment-label mono">
            SELECT A DEPLOYMENT <span>02 CONNECTED</span>
          </div>
          <div className="demo-deployments">
            {["OpenAI agent", "Custom runtime"].map((name, index) => (
              <button
                disabled={pending}
                key={name}
                className={
                  deployment === index
                    ? "demo-deployment selected"
                    : "demo-deployment"
                }
                aria-pressed={deployment === index}
                onClick={() => {
                  setDeployment(index);
                  setResult(null);
                  setError("");
                }}
              >
                <span className="deployment-radio" />
                <span>
                  {name}
                  <small>deployment_00{index + 1}</small>
                </span>
                <span
                  className={`mini-badge ${revoked[index] ? "muted-badge" : ""}`}
                >
                  {revoked[index] ? "REVOKED" : "ACTIVE"}
                </span>
              </button>
            ))}
          </div>
          <div className="sandbox-controls">
            <label>
              <input
                type="checkbox"
                checked={tampered}
                disabled={pending}
                onChange={(event) => {
                  setTampered(event.target.checked);
                  setResult(null);
                }}
              />
              <span className="custom-checkbox" aria-hidden="true">
                {tampered && "✓"}
              </span>
              Tamper with the receipt
            </label>
            <button
              className="revoke-button"
              disabled={pending || revoked[deployment]}
              onClick={() => {
                setRevoked((previous) =>
                  previous.map((value, index) =>
                    index === deployment ? true : value,
                  ),
                );
                setResult(null);
              }}
            >
              {revoked[deployment] ? "Deployment revoked" : "Revoke deployment"}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
          <button
            className="button button-light verify-button"
            disabled={pending}
            onClick={verify}
          >
            {pending ? "Checking signature…" : "Verify identity"}
            <ArrowRight />
          </button>
        </div>
        <div
          className="verification-output"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="output-heading mono">
            <span>VERIFICATION OUTPUT</span>
            <span>Ed25519</span>
          </div>
          <div
            className={`result-icon ${result ? (accepted ? "result-success" : "result-failed") : ""}`}
          >
            <Shield />
          </div>
          <h3>
            {error
              ? "Browser support needed"
              : pending
                ? "Checking the evidence…"
                : result
                  ? accepted
                    ? "Identity checks out."
                    : "Verification rejected."
                  : "Trust, but verify."}
          </h3>
          <p className="result-description">
            {error ||
              (result
                ? !result.signature
                  ? "The receipt changed after it was signed. Its signature no longer matches."
                  : !result.authorized
                    ? "The signature is valid, but this key’s authorization has been revoked in the demo."
                    : "The signature is valid and this deployment is authorized in the demo registry."
                : "Select a deployment and run a check.\nThe evidence will speak for itself.")}
          </p>
          <div className="check-list">
            <div>
              <span>Cryptographic signature</span>
              <span
                className={
                  result ? (result.signature ? "check-pass" : "check-fail") : ""
                }
              >
                {result ? (result.signature ? "✓ VALID" : "× INVALID") : "—"}
              </span>
            </div>
            <div>
              <span>Deployment authorization</span>
              <span
                className={
                  result
                    ? result.authorized
                      ? "check-pass"
                      : "check-fail"
                    : ""
                }
              >
                {result ? (result.authorized ? "✓ ACTIVE" : "× REVOKED") : "—"}
              </span>
            </div>
            <div>
              <span>Claim independently proven</span>
              <span>NOT ASSERTED</span>
            </div>
          </div>
          <div className="key-fingerprint mono">
            {result
              ? `KEY ${result.fingerprint.slice(0, 16)}…${result.fingerprint.slice(-8)}`
              : "AWAITING VERIFICATION_"}
          </div>
        </div>
      </div>
      <div className="playground-footer">
        <p>
          Real signatures. Simulated registry. Everything stays in your browser.
        </p>
        <button onClick={reset} disabled={pending}>
          Reset demo <span aria-hidden="true">↺</span>
        </button>
      </div>
    </div>
  );
}
