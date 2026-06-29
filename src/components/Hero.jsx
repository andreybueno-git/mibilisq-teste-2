import { ArrowDown, WhatsappLogo } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const enter = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="hero" id="inicio">
      <div className="hero-copy">
        <motion.h1 {...enter(0.05)}>
          Sabor que acolhe.{" "}
          <span>Cuidado que alimenta.</span>
        </motion.h1>
        <motion.p {...enter(0.15)}>
          Alimentos artesanais sem glúten, sem leite e sem açúcar,
          feitos para você comer com tranquilidade — e com muito sabor.
        </motion.p>
        <motion.div className="hero-actions" {...enter(0.25)}>
          <a className="button button-primary" href="#catalogo">
            Ver catálogo
            <ArrowDown size={18} weight="bold" />
          </a>
          <a
            className="button button-secondary"
            href="https://wa.me/5563992259449"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsappLogo size={20} weight="fill" />
            Falar com a loja
          </a>
        </motion.div>
        <motion.p className="hero-note" {...enter(0.34)}>
          Feito artesanalmente em Palmas, Tocantins.
        </motion.p>
      </div>

      <motion.div
        className="hero-media"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94, rotate: 1.5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-frame">
          <img
            src="/assets/hero-mibilisq.webp"
            alt="Bolo de cacau, pão, biscoitos e salgados artesanais"
            data-parallax="0.06"
          />
        </div>
        <motion.div
          className="hero-stamp"
          animate={reduceMotion ? {} : { rotate: [0, 3, 0, -3, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <span>feito com</span>
          <strong>cuidado</strong>
          <span>todos os dias</span>
        </motion.div>
      </motion.div>

      <div className="hero-scraps" aria-hidden="true">
        <span className="scrap scrap--wheat">
          <img src="/assets/scrap-wheat.png" alt="" data-parallax="0.24" />
        </span>
        <span className="scrap scrap--ribbon">
          <img src="/assets/scrap-ribbon.png" alt="" data-parallax="0.34" />
        </span>
        <span className="scrap scrap--seal">
          <img src="/assets/scrap-seal.png" alt="" data-parallax="0.14" />
        </span>
      </div>
    </section>
  );
}
