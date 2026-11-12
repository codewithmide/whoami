"use client";

import { useEffect, useRef, useState } from "react";
import { Fingerprint, Mark, Shield } from "./icons";

// Deterministic decorative identity matrix, not a functional QR code.
const matrix = Array.from({ length: 121 }, (_, index) => {
  const x = index % 11,
    y = Math.floor(index / 11);
  const finder = (ox: number, oy: number) =>
    x >= ox &&
    x < ox + 4 &&
    y >= oy &&
    y < oy + 4 &&
    (x === ox || x === ox + 3 || y === oy || y === oy + 3);
  return (
    finder(0, 0) ||
    finder(7, 0) ||
    finder(0, 7) ||
    (index * 17 + x * 7) % 11 < 4
  );
});

export function HeroVisual() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = root.current,
      surface = canvas.current;
    if (!element || !surface) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    import("three")
      .then((THREE) => {
        if (cancelled) return;
        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
        try {
          renderer = new THREE.WebGLRenderer({
            canvas: surface,
            alpha: true,
            antialias: true,
            powerPreference: "low-power",
            failIfMajorPerformanceCaveat: true,
          });
        } catch {
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
        camera.position.set(0, 0, 9.5);
        const network = new THREE.Group();
        network.rotation.set(0.22, 0.1, -0.22);
        scene.add(network);
        const positions: number[] = [];
        const pointCount = 1400;
        for (let i = 0; i < pointCount; i++) {
          const y = 1 - (i / (pointCount - 1)) * 2;
          const radius = Math.sqrt(1 - y * y);
          const angle = Math.PI * (3 - Math.sqrt(5)) * i;
          positions.push(
            Math.cos(angle) * radius * 2.24,
            y * 2.24,
            Math.sin(angle) * radius * 2.24,
          );
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3),
        );
        const pointMaterial = new THREE.PointsMaterial({
          color: 0xc6d0d4,
          size: 0.017,
          transparent: true,
          opacity: 0.55,
          sizeAttenuation: true,
        });
        network.add(new THREE.Points(geometry, pointMaterial));
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0xb7c5c8,
          transparent: true,
          opacity: 0.12,
        });
        const orbitMaterial = new THREE.LineBasicMaterial({
          color: 0xd4e0df,
          transparent: true,
          opacity: 0.34,
        });
        const ringGeometries: InstanceType<typeof THREE.BufferGeometry>[] = [];
        for (let ring = 0; ring < 9; ring++) {
          const points: InstanceType<typeof THREE.Vector3>[] = [];
          for (let i = 0; i <= 160; i++) {
            const angle = (i / 160) * Math.PI * 2;
            points.push(
              new THREE.Vector3(
                Math.cos(angle) * 2.24,
                Math.sin(angle) * 2.24,
                0,
              ),
            );
          }
          const ringGeometry = new THREE.BufferGeometry().setFromPoints(points);
          ringGeometries.push(ringGeometry);
          const circle = new THREE.LineLoop(ringGeometry, lineMaterial);
          circle.rotation.y = (ring * Math.PI) / 9;
          network.add(circle);
        }
        const satellites = new THREE.Group();
        satellites.rotation.set(1.12, 0.25, -0.2);
        scene.add(satellites);
        const orbitPoints = Array.from(
          { length: 180 },
          (_, i) =>
            new THREE.Vector3(
              Math.cos((i / 180) * Math.PI * 2) * 2.9,
              Math.sin((i / 180) * Math.PI * 2) * 2.9,
              0,
            ),
        );
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
          orbitPoints,
        );
        satellites.add(new THREE.LineLoop(orbitGeometry, orbitMaterial));
        const dotGeometry = new THREE.SphereGeometry(0.045, 12, 12);
        const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xd6f6c9 });
        const dots = Array.from({ length: 3 }, () => {
          const dot = new THREE.Mesh(dotGeometry, dotMaterial);
          satellites.add(dot);
          return dot;
        });
        let visible = true,
          frame = 0,
          last = 0,
          time = 0;
        let pointerX = 0,
          pointerY = 0;
        const render = () => renderer.render(scene, camera);
        const resize = () => {
          const { width, height } = element.getBoundingClientRect();
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          render();
        };
        const observer = new ResizeObserver(resize);
        observer.observe(element);
        const update = (now: number) => {
          frame = 0;
          if (!visible || document.hidden) return;
          const still = motion.matches || pausedRef.current;
          if (now - last >= 1000 / 30) {
            if (!still) {
              time += Math.min((now - last) / 1000, 0.05);
              network.rotation.y = time * 0.055 + pointerX * 0.12;
              network.rotation.x +=
                (0.22 + pointerY * 0.09 - network.rotation.x) * 0.06;
              dots.forEach((dot, i) => {
                const angle = time * 0.15 + (i * Math.PI * 2) / 3;
                dot.position.set(
                  Math.cos(angle) * 2.9,
                  Math.sin(angle) * 2.9,
                  0,
                );
              });
            }
            last = now;
            render();
          }
          if (!still) frame = requestAnimationFrame(update);
        };
        const resume = () => {
          if (frame) cancelAnimationFrame(frame);
          last = 0;
          frame = requestAnimationFrame(update);
        };
        const intersection = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            if (visible) resume();
            else if (frame) cancelAnimationFrame(frame);
          },
          { threshold: 0 },
        );
        intersection.observe(element);
        const move = (event: PointerEvent) => {
          if (
            motion.matches ||
            pausedRef.current ||
            event.pointerType === "touch"
          )
            return;
          const rect = element.getBoundingClientRect();
          pointerX = (event.clientX - rect.left) / rect.width - 0.5;
          pointerY = (event.clientY - rect.top) / rect.height - 0.5;
          if (card.current) {
            card.current.style.setProperty(
              "--pointer-x",
              `${pointerX * 10}deg`,
            );
            card.current.style.setProperty(
              "--pointer-y",
              `${-pointerY * 8}deg`,
            );
          }
        };
        const reset = () => {
          pointerX = 0;
          pointerY = 0;
          card.current?.style.setProperty("--pointer-x", "0deg");
          card.current?.style.setProperty("--pointer-y", "0deg");
        };
        const lost = (event: Event) => {
          event.preventDefault();
          if (frame) cancelAnimationFrame(frame);
          setReady(false);
        };
        surface.addEventListener("webglcontextlost", lost);
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", reset);
        element.addEventListener("motion-toggle", resume);
        document.addEventListener("visibilitychange", resume);
        motion.addEventListener("change", resume);
        dots.forEach((dot, i) => {
          const angle = (i * Math.PI * 2) / 3;
          dot.position.set(Math.cos(angle) * 2.9, Math.sin(angle) * 2.9, 0);
        });
        resize();
        resume();
        setReady(true);
        cleanup = () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          intersection.disconnect();
          surface.removeEventListener("webglcontextlost", lost);
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", reset);
          element.removeEventListener("motion-toggle", resume);
          document.removeEventListener("visibilitychange", resume);
          motion.removeEventListener("change", resume);
          geometry.dispose();
          ringGeometries.forEach((g) => g.dispose());
          orbitGeometry.dispose();
          dotGeometry.dispose();
          pointMaterial.dispose();
          lineMaterial.dispose();
          orbitMaterial.dispose();
          dotMaterial.dispose();
          renderer.dispose();
        };
      })
      .catch(() => {
        /* Keep the static orbit when WebGL cannot load. */
      });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);
  function toggleMotion() {
    const next = !paused;
    pausedRef.current = next;
    setPaused(next);
    root.current?.dispatchEvent(new Event("motion-toggle"));
  }
  return (
    <div className={`hero-visual ${paused ? "motion-paused" : ""}`} ref={root}>
      <div className="visual-coordinate mono" aria-hidden="true">
        IDENTITY OBJECT / 042
        <br />
        <span>NEAR · TESTNET</span>
      </div>
      <div
        className={`orbit-fallback ${ready ? "is-hidden" : ""}`}
        aria-hidden="true"
      >
        <i />
        <i />
        <i />
        <i />
      </div>
      <canvas
        ref={canvas}
        className={`network-canvas ${ready ? "is-ready" : ""}`}
        aria-hidden="true"
      />
      <div className="passport-position" aria-hidden="true">
        <div className="passport-float">
          <div className="passport-card" ref={card}>
            <div className="passport-shine" />
            <div className="passport-header">
              <span>
                <Mark /> whoami<span className="passport-underscore">_</span>
              </span>
              <span className="passport-chip">AGENT PASSPORT</span>
            </div>
            <div className="passport-art">
              <Fingerprint />
              <div className="identity-matrix">
                {matrix.map((filled, i) => (
                  <i key={i} className={filled ? "filled" : ""} />
                ))}
              </div>
              <div className="art-cross">+</div>
            </div>
            <div className="passport-name">
              <span>AUTONOMOUS IDENTITY</span>
              <strong>
                Atlas<span>_001</span>
              </strong>
            </div>
            <div className="passport-info">
              <div>
                <span>PASSPORT ID</span>
                <strong>ap:near:testnet:42</strong>
              </div>
              <div>
                <span>OWNER</span>
                <strong>atlas.testnet ↗</strong>
              </div>
            </div>
            <div className="passport-bottom">
              <span>
                <span className="status-dot" /> DEMO IDENTITY
              </span>
              <span>01 — ∞</span>
            </div>
          </div>
        </div>
      </div>
      <div className="orbit-tag orbit-tag-one" aria-hidden="true">
        <span className="tag-icon">✳</span>
        <div>
          OpenAI agent<span>DEPLOYMENT_001</span>
        </div>
        <span className="status-dot" />
      </div>
      <div className="orbit-tag orbit-tag-two" aria-hidden="true">
        <span className="tag-icon">&lt;/&gt;</span>
        <div>
          Custom runtime<span>DEPLOYMENT_002</span>
        </div>
        <span className="status-dot" />
      </div>
      <div className="verification-tag" aria-hidden="true">
        <Shield />
        <span>
          ONE IDENTITY.
          <br />
          <strong>INDEPENDENTLY VERIFIABLE.</strong>
        </span>
      </div>
      <button
        className="motion-toggle mono"
        onClick={toggleMotion}
        aria-pressed={paused}
        aria-label={paused ? "Resume 3D animation" : "Pause 3D animation"}
      >
        <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
        {paused ? "RESUME MOTION" : "PAUSE MOTION"}
      </button>
    </div>
  );
}
