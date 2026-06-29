import {
  Clock,
  MapPin,
  NavigationArrow,
  Phone,
} from "@phosphor-icons/react";

export function LocationSection() {
  return (
    <section className="location-section" id="localizacao">
      <div className="section-heading location-heading" data-reveal="up">
        <span className="section-number" aria-hidden="true">
          02
        </span>
        <h2>Tem uma Mibilisq esperando por você.</h2>
      </div>
      <div className="location-layout">
        <div className="map-panel" data-reveal="left">
          <img
            src="./assets/mapa-mibilisq.png"
            alt="Mapa do Google mostrando a localização da Mibilisq em Palmas"
          />
          <a
            className="map-action"
            href="https://www.google.com/maps/search/?api=1&query=Mibilisq+Sem+Gluten+Palmas+TO"
            target="_blank"
            rel="noreferrer"
          >
            Abrir no mapa
            <NavigationArrow size={17} weight="fill" />
          </a>
        </div>
        <div className="location-details" data-reveal="right">
          <div>
            <MapPin size={24} weight="duotone" />
            <p>
              <strong>R. SE-07, 35, Sala 08</strong>
              Plano Diretor Sul, Palmas–TO
              <br />
              CEP 77020-022
            </p>
          </div>
          <div>
            <Phone size={24} weight="duotone" />
            <p>
              <strong>(63) 99225-9449</strong>
              Pedidos e atendimento pelo WhatsApp
            </p>
          </div>
          <div>
            <Clock size={24} weight="duotone" />
            <p>
              <strong>Horários atualizados no atendimento</strong>
              Fale com a gente antes da visita.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
