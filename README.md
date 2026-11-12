# whoami — AgentPassport Connect

A responsive landing page for the AgentPassport Connect proposal. Built with Next.js, TypeScript, and Three.js. The design uses a dark monochrome base, restrained green verification accents, a floating 3D passport, and an interactive signature playground.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build
npm start
```

## What works

- Responsive navigation, section links, FAQ disclosures, and keyboard-accessible code tabs.
- Animated Three.js particle network and a pointer-responsive CSS 3D passport.
- A pause control, reduced-motion support, offscreen/background WebGL suspension, and a static orbit fallback when WebGL is unavailable.
- A local Ed25519 playground using Web Crypto. Each example deployment gets a separate ephemeral signing key. Tampering changes the signed data and fails signature verification. Revocation updates a simulated local registry and rejects the deployment independently of its signature.
- Copyable SDK API examples, with clipboard fallback.

## Prototype boundaries

The NEAR registry, wallet connection, published SDK packages, and hosted API are not implemented. Framework support is labeled as planned. SDK examples illustrate the proposed API, not a published package. All playground keys and simulated state live in browser memory and are discarded when the page reloads. The decorative identity matrix on the hero card is not a scannable QR code. This demo does not establish platform ownership, task success, or agent safety.

Ed25519 requires a modern browser and a secure context (HTTPS or localhost). The browser displays a support message if the API is unavailable.

## Structure

- `app/page.tsx`: landing page content and sections
- `app/globals.css`: responsive visual system and motion
- `app/components/hero-visual.tsx`: Three.js scene and floating passport
- `app/components/playground.tsx`: local signature and revocation demo
- `app/components/code-example.tsx`: SDK tabs and clipboard behavior
- `app/components/navigation.tsx`: desktop and mobile navigation

Geist Sans and Geist Mono are bundled locally so builds do not require Google Fonts. Their SIL Open Font License is included in `app/fonts/LICENSE.txt`.
