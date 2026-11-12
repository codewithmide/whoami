"use client";
import { useState } from "react";
import { ArrowUpRight, Mark } from "./icons";

export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header section-shell">
      <a
        className="wordmark"
        href="#main"
        aria-label="whoami home"
        onClick={() => setOpen(false)}
      >
        <Mark />
        whoami<span className="wordmark-period">_</span>
      </a>
      <nav
        className={open ? "main-nav is-open" : "main-nav"}
        id="main-nav"
        aria-label="Main navigation"
      >
        <a href="#protocol" onClick={() => setOpen(false)}>
          The protocol
        </a>
        <a href="#playground" onClick={() => setOpen(false)}>
          Playground
        </a>
        <a href="#developers" onClick={() => setOpen(false)}>
          For developers
        </a>
        <a href="#questions" onClick={() => setOpen(false)}>
          FAQ
        </a>
      </nav>
      <a href="#playground" className="nav-cta">
        Launch demo <ArrowUpRight />
      </a>
      <button
        className="menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-controls="main-nav"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
