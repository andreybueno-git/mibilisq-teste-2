import { List, ShoppingBag, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const navigation = [
  ["Início", "#inicio"],
  ["Nossa história", "#historia"],
  ["Catálogo", "#catalogo"],
  ["Localização", "#localizacao"],
];

export function Header({ cartCount, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const itemLabel = cartCount === 1 ? "item" : "itens";

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Mibilisq — início">
        <img
          className="brand-logo"
          src="/assets/logo-mibilisq-oficial.webp"
          alt=""
        />
      </a>

      <nav className="desktop-nav" aria-label="Navegação principal">
        {navigation.map(([label, href]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <button
          className="cart-button"
          type="button"
          onClick={onOpenCart}
          aria-label={`Meu pedido, ${cartCount} ${itemLabel}`}
        >
          <ShoppingBag size={20} weight="bold" />
          <span className="cart-button-label">Meu pedido</span>
          <motion.span
            className="cart-count"
            key={cartCount}
            initial={{ scale: 0.65 }}
            animate={{ scale: 1 }}
          >
            {cartCount}
          </motion.span>
        </button>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={25} /> : <List size={25} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            aria-label="Navegação móvel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {navigation.map(([label, href]) => (
              <a
                href={href}
                key={href}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
