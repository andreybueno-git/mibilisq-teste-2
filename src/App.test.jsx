import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("Mibilisq storefront", () => {
  it("presents the approved positioning and core sections", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: "Sabor que acolhe. Cuidado que alimenta.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Escolha o que dá vontade" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Comer diferente também é pertencer.",
      }),
    ).toBeInTheDocument();
  });

  it("filters products by category", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Pães" }));

    expect(
      screen.getByRole("heading", { name: "Pão artesanal da casa" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Bolo intenso de cacau" }),
    ).not.toBeInTheDocument();
  });

  it("adds a product and updates the order count", async () => {
    const user = userEvent.setup();
    render(<App />);

    const card = screen
      .getByRole("heading", { name: "Bolo intenso de cacau" })
      .closest("article");
    await user.click(
      within(card).getByRole("button", { name: "Adicionar ao pedido" }),
    );

    expect(
      screen.getByRole("button", { name: "Meu pedido, 1 item" }),
    ).toBeInTheDocument();
  });

  it("validates customer name before offering the WhatsApp link", async () => {
    const user = userEvent.setup();
    render(<App />);

    const card = screen
      .getByRole("heading", { name: "Bolo intenso de cacau" })
      .closest("article");
    await user.click(
      within(card).getByRole("button", { name: "Adicionar ao pedido" }),
    );
    await user.click(
      screen.getByRole("button", { name: "Meu pedido, 1 item" }),
    );
    await user.click(
      screen.getByRole("button", { name: "Continuar pelo WhatsApp" }),
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Informe seu nome para continuar.",
    );

    await user.type(screen.getByLabelText("Seu nome"), "Ana");

    const link = screen.getByRole("link", {
      name: "Finalizar no WhatsApp",
    });
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/5563992259449"),
    );
  });

  it("keeps cart scrolling independent from the site smooth scroll", async () => {
    const user = userEvent.setup();
    render(<App />);

    const card = screen
      .getByRole("heading", { name: "Bolo intenso de cacau" })
      .closest("article");
    await user.click(
      within(card).getByRole("button", { name: "Adicionar ao pedido" }),
    );
    await user.click(
      screen.getByRole("button", { name: "Meu pedido, 1 item" }),
    );

    expect(
      screen.getByRole("complementary", { name: "Meu pedido" }),
    ).toHaveAttribute("data-lenis-prevent");
  });
});
