export function addItem(items, product) {
  const existing = items.find((item) => item.id === product.id);

  if (!existing) {
    return [...items, { ...product, quantity: 1 }];
  }

  return items.map((item) =>
    item.id === product.id
      ? { ...item, quantity: item.quantity + 1 }
      : item,
  );
}

export function setItemQuantity(items, productId, quantity) {
  if (quantity <= 0) {
    return removeItem(items, productId);
  }

  return items.map((item) =>
    item.id === productId ? { ...item, quantity } : item,
  );
}

export function removeItem(items, productId) {
  return items.filter((item) => item.id !== productId);
}

export function getCartCount(items) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal(items) {
  return items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}
