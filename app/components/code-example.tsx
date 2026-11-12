"use client";

import { useEffect, useRef, useState } from "react";

const examples = {
  connect: `import { AgentPassport } from "@agentpassport/sdk";\n\n// Your agent. Its own identity.\nconst passport = new AgentPassport({\n  passportId: "ap:near:testnet:42",\n  deploymentId: "deployment-001",\n  privateKey: process.env.AGENT_SIGNING_KEY\n});\n\n// Sign locally. Share only what you choose.\nawait passport.record({\n  type: "task.completed",\n  taskId: "research-001",\n  outcome: "success"\n});`,
  verify: `import { verifyPassport } from "@agentpassport/verifier";\n\n// Resolve the agent’s current identity.\nconst result = await verifyPassport({\n  passportId: "ap:near:testnet:42"\n});\n\n// Inspect the evidence, not just a badge.\nconsole.log(result.ownerVerified);\nconsole.log(result.activeDeployments);\n\n// Receipt signatures and authorization\n// are separate from proof of task success.\n// Always check the freshness of registry data.`,
};

function highlight(line: string) {
  if (line.trim().startsWith("//"))
    return <span className="code-comment">{line}</span>;
  return line
    .split(/("[^"]*"|\b(?:import|from|const|await|new)\b)/g)
    .map((part, index) => (
      <span
        key={index}
        className={
          part.startsWith('"')
            ? "code-string"
            : /^(import|from|const|await|new)$/.test(part)
              ? "code-keyword"
              : undefined
        }
      >
        {part}
      </span>
    ));
}

export function CodeExample() {
  const [tab, setTab] = useState<keyof typeof examples>("connect");
  const [copyStatus, setCopyStatus] = useState("");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const codeRef = useRef<HTMLPreElement>(null);
  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(examples[tab]);
      setCopyStatus("Copied!");
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      if (codeRef.current && selection) {
        range.selectNodeContents(codeRef.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setCopyStatus("Code selected — copy manually");
    }
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopyStatus(""), 2500);
  }
  return (
    <div className="code-window">
      <div className="code-toolbar">
        <div className="code-tabs" role="tablist" aria-label="SDK examples">
          {(["connect", "verify"] as const).map((name, index) => (
            <button
              id={`tab-${name}`}
              key={name}
              role="tab"
              aria-selected={tab === name}
              aria-controls="sdk-code"
              tabIndex={tab === name ? 0 : -1}
              onKeyDown={(event) => {
                if (
                  ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
                ) {
                  event.preventDefault();
                  const next =
                    event.key === "Home"
                      ? "connect"
                      : event.key === "End"
                        ? "verify"
                        : index === 0
                          ? "verify"
                          : "connect";
                  setTab(next);
                  document.getElementById(`tab-${next}`)?.focus();
                }
              }}
              onClick={() => setTab(name)}
            >
              {name}.ts
            </button>
          ))}
        </div>
        <button
          className="copy-button"
          onClick={copy}
          aria-label="Copy code example"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <rect x="8" y="8" width="12" height="13" rx="2" />
            <path d="M15 8V3H3v13h5" />
          </svg>
          <span>{copyStatus === "Copied!" ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div
        id="sdk-code"
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        tabIndex={0}
      >
        <pre ref={codeRef}>
          <code>
            {examples[tab].split("\n").map((line, i) => (
              <span className="code-line" key={i}>
                <span className="line-number" aria-hidden="true">
                  {i + 1}
                </span>
                <span>{highlight(line) || " "}</span>
              </span>
            ))}
          </code>
        </pre>
      </div>
      <div className="code-footer">
        <span>
          <span className="status-dot" /> TYPESCRIPT
        </span>
        <span>SDK API PREVIEW · NOT YET RELEASED</span>
      </div>
      <span className="copy-status" role="status">
        {copyStatus}
      </span>
      <div className="code-note">
        <span>↳</span> Private keys stay local. Your runtime stays yours.
      </div>
    </div>
  );
}
