import {
  DropSlash,
  GrainsSlash,
  ShieldCheck,
} from "@phosphor-icons/react";

const items = [
  {
    icon: GrainsSlash,
    title: "Sem glúten",
    text: "Um cuidado que começa na escolha.",
  },
  {
    icon: DropSlash,
    title: "Sem leite",
    text: "Opções pensadas para diferentes rotinas.",
  },
  {
    icon: ShieldCheck,
    title: "Feito com atenção",
    text: "Ingredientes e rótulos sempre visíveis.",
  },
];

export function SafetyStrip() {
  return (
    <section
      className="safety-strip"
      aria-label="Cuidados da Mibilisq"
      data-reveal-group
    >
      {items.map(({ icon: Icon, title, text }) => (
        <div className="safety-item" key={title} data-reveal-item>
          <Icon size={27} weight="duotone" />
          <div>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
