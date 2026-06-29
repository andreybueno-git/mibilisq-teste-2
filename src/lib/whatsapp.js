export function createWhatsAppUrl({
  phone,
  customerName,
  items,
  orderId,
}) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const message = [
    `Olá, Mibilisq! Quero confirmar o pedido ${orderId}.`,
    `Cliente: ${customerName}`,
    "",
    ...items.map(
      (item) =>
        `${item.quantity}x ${item.name} — ${money.format(
          item.price * item.quantity,
        )}`,
    ),
    "",
    `Total: ${money.format(total)}`,
  ].join("\n");

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
