import {
  ArrowUpRight,
  ArrowRight,
  Fingerprint,
  Mark,
  Shield,
  Terminal,
} from "./components/icons";
import { HeroVisual } from "./components/hero-visual";
import { Navigation } from "./components/navigation";
import { Playground } from "./components/playground";
import { CodeExample } from "./components/code-example";

const questions = [
  [
    "What exactly is an agent passport?",
    "A persistent identity for a logical agent. It connects an owner account to separately authorized deployment keys, so the same agent can be recognized across runtimes. AgentPassport Connect is the proposed protocol behind whoami.",
  ],
  [
    "Do I need to change my agent’s framework?",
    "The protocol is designed to work alongside your existing agent. A framework-independent TypeScript SDK is planned first, followed by an OpenAI Agents SDK adapter. Your prompts, models, and hosting stay under your control.",
  ],
  [
    "Does a verified passport mean an agent is trustworthy?",
    "Verification establishes a signature’s validity and a key’s authorization. It does not prove that an agent is safe, that its advertised capabilities work, or that a self-reported task actually happened. Independent evaluation credentials are a future milestone.",
  ],
  [
    "What goes onchain?",
    "The proposed NEAR registry records ownership, deployment authorization, revocation, and public metadata commitments. Agent execution and activity receipts stay offchain. Private keys, prompts, and conversations are never part of the registry.",
  ],
  [
    "Can I use the protocol today?",
    "You can explore this frontend and run the local cryptographic playground now. The registry, published SDK, wallet connection, and hosted verification service are still in development. The playground makes no blockchain transactions.",
  ],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <section className="hero section-shell" aria-labelledby="hero-heading">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <a className="release-tag" href="#playground">
              <span className="status-dot" /> INTRODUCING AGENTPASSPORT CONNECT{" "}
              <ArrowUpRight />
            </a>
            <h1 id="hero-heading">
              Your agent.
              <br />
              One identity.
              <br />
              <span>Anywhere.</span>
            </h1>
            <p className="hero-description">
              An identity that moves with your agent.
              <br className="desktop-break" /> Connect deployments. Prove
              control.
              <br className="desktop-break" /> Stay recognizable across every
              runtime.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href="#playground">
                Explore the demo <ArrowUpRight />
              </a>
              <a className="text-link" href="#protocol">
                Meet the protocol <ArrowRight />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="tiny-cross">+</span> OPEN BY DESIGN{" "}
              <span className="footnote-divider" /> ANCHORED ON NEAR
            </div>
          </div>
          <HeroVisual />
          <div className="hero-bottom">
            <span>
              <span className="status-dot" /> IDENTITY WITHOUT BOUNDARIES
            </span>
            <a href="#protocol">
              SCROLL TO DISCOVER <span>↓</span>
            </a>
            <span className="hero-coordinate">01 / ∞</span>
          </div>
        </section>
        <section
          className="runtime-strip section-shell"
          aria-label="Framework support roadmap"
        >
          <p>
            YOUR RUNTIME.
            <br />
            <span>YOUR RULES.</span>
          </p>
          <div className="runtime-brand">
            <Terminal />
            <span>TypeScript</span>
            <small>SDK PLANNED</small>
          </div>
          <div className="runtime-brand">
            <span className="openai-symbol" aria-hidden="true">
              ✳
            </span>
            <span>OpenAI</span>
            <small>ADAPTER PLANNED</small>
          </div>
          <div className="runtime-brand">
            <span className="graph-symbol" aria-hidden="true">
              ⌘
            </span>
            <span>LangGraph</span>
            <small>ON THE ROADMAP</small>
          </div>
          <div className="runtime-brand">
            <span className="near-symbol" aria-hidden="true">
              N
            </span>
            <span>NEAR</span>
            <small>REGISTRY LAYER</small>
          </div>
        </section>
        <section
          className="protocol-section section-shell section-space"
          id="protocol"
          aria-labelledby="protocol-heading"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="tiny-cross">+</span> 01 — THE PROTOCOL
              </span>
              <h2 id="protocol-heading">
                Different runtimes.
                <br />
                <span>Still you.</span>
              </h2>
            </div>
            <p>
              Models change. Frameworks evolve.
              <br />
              Your agent’s identity should endure.
              <br />
              One passport connects it all.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature feature-identity">
              <div className="feature-top">
                <span className="mono">01 / PERSISTENCE</span>
                <Fingerprint />
              </div>
              <div className="identity-illustration" aria-hidden="true">
                <div className="identity-ring ring-outer" />
                <div className="identity-ring ring-inner" />
                <div className="identity-orbit-dot" />
                <div className="identity-core">
                  <Fingerprint />
                </div>
                <span className="identity-label">ap:near:testnet:42</span>
              </div>
              <h3>One identity. Every version.</h3>
              <p>
                A stable passport for your agent, even as its model, framework,
                or infrastructure changes.
              </p>
            </article>
            <article className="feature feature-deployments">
              <div className="feature-top">
                <span className="mono">02 / CONNECTION</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden="true"
                >
                  <rect x="8" y="2" width="8" height="6" rx="1.5" />
                  <rect x="2" y="16" width="8" height="6" rx="1.5" />
                  <rect x="14" y="16" width="8" height="6" rx="1.5" />
                  <path d="M12 8v4M6 16v-4h12v4" />
                </svg>
              </div>
              <div className="deployment-illustration" aria-hidden="true">
                <div className="small-passport">
                  <Mark /> PASSPORT_042
                </div>
                <div className="branch-lines" />
                <div className="deployment-pills">
                  <span>
                    <span className="status-dot" /> OpenAI
                  </span>
                  <span>
                    <span className="status-dot" /> Custom agent
                  </span>
                </div>
                <div className="connection-caption">
                  INDEPENDENT KEYS. SHARED IDENTITY.
                </div>
              </div>
              <h3>Many deployments. One you.</h3>
              <p>
                Link each runtime with its own signing key. Connect your
                existing agents on your terms.
              </p>
            </article>
            <article className="feature feature-control">
              <div className="feature-top">
                <span className="mono">03 / CONTROL</span>
                <Shield />
              </div>
              <div className="control-illustration" aria-hidden="true">
                <div>
                  <span className="control-key">↗</span>
                  <span>deployment_001</span>
                  <span className="mini-badge">ACTIVE</span>
                </div>
                <div>
                  <span className="control-key">↗</span>
                  <span>deployment_002</span>
                  <span className="mini-badge muted-badge">REVOKED</span>
                </div>
                <div className="control-caption">
                  <Shield /> YOUR KEYS. YOUR CALL.
                </div>
              </div>
              <h3>Control that stays with you.</h3>
              <p>
                Authorize a deployment. Revoke a compromised key. Keep the rest
                of your agent running.
              </p>
            </article>
          </div>
        </section>
        <section
          className="playground-section section-shell section-space"
          id="playground"
          aria-labelledby="playground-heading"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="tiny-cross">+</span> 02 — THE PROOF
              </span>
              <h2 id="playground-heading">
                Don’t take its word.
                <br />
                <span>Check its signature.</span>
              </h2>
            </div>
            <p>
              An identity is only useful if you can verify it.
              <br />
              Try a real signature check in your browser,
              <br />
              then see what happens when trust changes.
            </p>
          </div>
          <Playground />
        </section>
        <section
          className="developer-section section-shell section-space"
          id="developers"
          aria-labelledby="developer-heading"
        >
          <div className="developer-copy">
            <span className="eyebrow">
              <span className="tiny-cross">+</span> 03 — BUILT FOR BUILDERS
            </span>
            <h2 id="developer-heading">
              Keep your stack.
              <br />
              <span>Add an identity.</span>
            </h2>
            <p>
              A small integration. A persistent identity.
              <br />
              Designed to fit the agent you’ve already built.
            </p>
            <ol className="integration-steps">
              <li>
                <span>01</span>
                <div>
                  <strong>Create a passport</strong>
                  <p>Establish an owner-controlled identity on NEAR.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Connect your deployment</strong>
                  <p>Generate a local key. Authorize its public half.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Sign. Share. Verify.</strong>
                  <p>Make your agent’s identity independently checkable.</p>
                </div>
              </li>
            </ol>
          </div>
          <CodeExample />
        </section>
        <section
          className="faq-section section-shell section-space"
          id="questions"
          aria-labelledby="faq-heading"
        >
          <div>
            <span className="eyebrow">
              <span className="tiny-cross">+</span> GOOD QUESTIONS
            </span>
            <h2 id="faq-heading">
              A little more
              <br />
              <span>context.</span>
            </h2>
          </div>
          <div className="faq-list">
            {questions.map(([question, answer], index) => (
              <details key={question}>
                <summary>
                  <span className="faq-number">0{index + 1}</span>
                  {question}
                  <span className="faq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="closing-section section-shell">
          <div className="closing-orbit" aria-hidden="true" />
          <span className="eyebrow">
            THE FUTURE HAS AGENTS. GIVE YOURS AN IDENTITY.
          </span>
          <h2>
            Be known.
            <br />
            <span>Everywhere.</span>
          </h2>
          <a className="button button-light" href="#playground">
            Find your whoami <ArrowUpRight />
          </a>
          <p>One agent. One passport. Endless possibilities.</p>
        </section>
      </main>
      <footer className="footer section-shell">
        <a className="wordmark" href="#main" aria-label="whoami home">
          <Mark />
          whoami<span className="wordmark-period">_</span>
        </a>
        <p>Identity for the agentic world.</p>
        <div>
          <a href="#protocol">
            Protocol <ArrowUpRight />
          </a>
          <a href="#developers">
            Developers <ArrowUpRight />
          </a>
          <a href="#questions">
            FAQ <ArrowUpRight />
          </a>
        </div>
        <span className="footer-note">AGENTPASSPORT CONNECT · PROTOTYPE</span>
      </footer>
    </>
  );
}
