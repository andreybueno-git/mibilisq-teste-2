import { describe, expect, it } from "vitest";
import {
  addItem,
  getCartCount,
  getCartTotal,
  removeItem,
  setItemQuantity,
} from "./cart";

const product = {
  id: "bolo",
  name: "Bolo de cacau",
  price: 18.9,
};

describe("cart", () => {
  it("adds a new product with quantity one", () => {
    expect(addItem([], product)).toEqual([{ ...product, quantity: 1 }]);
  });

  it("increments the quantity of a product already in the cart", () => {
    expect(addItem([{ ...product, quantity: 1 }], product)[0].quantity).toBe(2);
  });

  it("removes a product when quantity reaches zero", () => {
    expect(setItemQuantity([{ ...product, quantity: 2 }], product.id, 0)).toEqual(
      [],
    );
  });

  it("removes a product explicitly", () => {
    expect(removeItem([{ ...product, quantity: 1 }], product.id)).toEqual([]);
  });

  it("calculates item count and total", () => {
    const items = [{ ...product, quantity: 2 }];
    expect(getCartCount(items)).toBe(2);
    expect(getCartTotal(items)).toBeCloseTo(37.8);
  });
});
