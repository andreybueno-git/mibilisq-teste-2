import { InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img
          src="/assets/logo-mibilisq-oficial.webp"
          alt="Mibilisq — livre de glúten e outros"
        />
      </div>
      <p>
        Feito com cuidado em Palmas–TO.
        <br />
        Esta é uma prévia visual do novo site.
      </p>
      <div className="footer-links">
        <a
          href="https://www.instagram.com/mibilisqsemgluten/"
          target="_blank"
          rel="noreferrer"
        >
          <InstagramLogo size={22} />
          Instagram
        </a>
        <a
          href="https://wa.me/5563992259449"
          target="_blank"
          rel="noreferrer"
        >
          <WhatsappLogo size={22} />
          WhatsApp
        </a>
      </div>
    </footer>
  );
}
