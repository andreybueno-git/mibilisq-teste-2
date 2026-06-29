import { useLayoutEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Collage entrance variants. Each is a GSAP "from" state; content lives at its
// natural (visible) state and we only animate FROM these on scroll. Because the
// tweens use immediateRender:false, the hidden state is applied only when a
// ScrollTrigger is about to fire — so a crawler or non-scrolling renderer never
// sees blank content, and there is no flash on scroll-in (the swap happens
// while the element is still below the viewport).
const VARIANTS = {
  up: { y: 52, opacity: 0 },
  left: { x: -64, rotate: -2.5, opacity: 0 },
  right: { x: 64, rotate: 2.5, opacity: 0 },
};

/**
 * Sitewide motion: Lenis smooth scroll + GSAP scroll-driven collage reveals.
 * Honors prefers-reduced-motion (no Lenis, no reveals — everything stays
 * visible and static). Call once with a ref wrapping the whole page.
 */
export function useSiteMotion(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return undefined;
    }
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return undefined;

    // Smooth scroll feeds ScrollTrigger (never native scroll listeners).
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Single-element reveals (headings, story panels, location).
      root.querySelectorAll("[data-reveal]").forEach((el) => {
        const variant = VARIANTS[el.getAttribute("data-reveal")] || VARIANTS.up;
        gsap.from(el, {
          ...variant,
          duration: 0.8,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        });
      });

      // Staggered collage groups (catalog cards, safety items) — cutouts that
      // rise and settle with an alternating tilt for the paper-collage feel.
      root.querySelectorAll("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll("[data-reveal-item]");
        if (!items.length) return;
        gsap.from(items, {
          y: 70,
          opacity: 0,
          scale: 0.95,
          rotate: (i) => (i % 2 ? 2.8 : -2.8),
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          immediateRender: false,
          scrollTrigger: {
            trigger: group,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      });

      // Parallax layers — depth as you scroll (scrubbed, starts at natural pos).
      root.querySelectorAll("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.getAttribute("data-parallax")) || 0.12;
        gsap.to(el, {
          yPercent: -amount * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, root);

    // Recalculate trigger positions once fonts/images settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const settle = window.setTimeout(refresh, 450);

    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      ctx.revert();
    };
  }, [rootRef]);
}
