import { describe, expect, it } from "vitest";
import { filterProducts } from "./catalog";

const items = [
  { id: "bolo", name: "Bolo de cacau", category: "Doces" },
  { id: "pao", name: "Pão artesanal", category: "Pães" },
  { id: "coxinha", name: "Coxinha", category: "Salgados" },
];

describe("filterProducts", () => {
  it("returns every product for the Todas category", () => {
    expect(filterProducts(items, "Todas", "")).toHaveLength(3);
  });

  it("filters by category and search text without case sensitivity", () => {
    expect(filterProducts(items, "Doces", "CACAU")).toEqual([items[0]]);
  });
});
