import { Heart } from "@phosphor-icons/react";

export function StorySection() {
  return (
    <section className="story-section" id="historia">
      <div className="story-visual" data-reveal="left">
        <img
          src="./assets/hero-mibilisq.webp"
          alt="Mesa com alimentos artesanais da Mibilisq"
          data-parallax="0.08"
        />
        <span className="story-ribbon">feito em pequenas fornadas</span>
      </div>
      <div className="story-copy" data-reveal="right">
        <Heart size={34} weight="fill" />
        <h2>Comer diferente também é pertencer.</h2>
        <p>
          Na Mibilisq, cada ingrediente carrega um propósito. A gente
          acredita em comida afetiva, atendimento acolhedor e na liberdade
          de escolher com tranquilidade.
        </p>
        <p>
          Mais do que uma loja, queremos ser aquele lugar onde você entra,
          pergunta, descobre e encontra algo gostoso para levar.
        </p>
        <a href="#localizacao">Conheça a nossa loja</a>
      </div>
    </section>
  );
}
