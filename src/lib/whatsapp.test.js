import { describe, expect, it } from "vitest";
import { createWhatsAppUrl } from "./whatsapp";

describe("createWhatsAppUrl", () => {
  it("creates a Mibilisq order message with customer, items and total", () => {
    const url = createWhatsAppUrl({
      phone: "5563992259449",
      customerName: "Ana",
      orderId: "PREV-1042",
      items: [
        {
          id: "bolo",
          name: "Bolo de cacau",
          price: 18.9,
          quantity: 2,
        },
      ],
    });

    expect(url).toMatch(/^https:\/\/wa\.me\/5563992259449\?text=/);

    const message = decodeURIComponent(url.split("?text=")[1]);
    expect(message).toContain("Ana");
    expect(message).toContain("PREV-1042");
    expect(message).toContain("2x Bolo de cacau");
    expect(message).toContain("R$ 37,80");
  });
});
