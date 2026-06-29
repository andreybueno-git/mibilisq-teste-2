import { useMemo, useRef, useState } from "react";
import { useSiteMotion } from "./lib/useSiteMotion";
import { CartDrawer } from "./components/CartDrawer";
import { CatalogSection } from "./components/CatalogSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { LocationSection } from "./components/LocationSection";
import { SafetyStrip } from "./components/SafetyStrip";
import { StorySection } from "./components/StorySection";
import { products } from "./data/products";
import {
  addItem,
  getCartCount,
  setItemQuantity,
} from "./lib/cart";

export function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = useMemo(() => getCartCount(cartItems), [cartItems]);
  const shellRef = useRef(null);
  useSiteMotion(shellRef);

  function handleAdd(product) {
    setCartItems((current) => addItem(current, product));
  }

  function handleQuantity(productId, quantity) {
    setCartItems((current) =>
      setItemQuantity(current, productId, quantity),
    );
  }

  return (
    <div className="site-shell" ref={shellRef}>
      <Header
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />
      <main>
        <Hero />
        <SafetyStrip />
        <CatalogSection products={products} onAdd={handleAdd} />
        <StorySection />
        <LocationSection />
      </main>
      <Footer />
      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onQuantityChange={handleQuantity}
      />
    </div>
  );
}
