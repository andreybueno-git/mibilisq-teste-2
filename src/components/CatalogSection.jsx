import { MagnifyingGlass } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { categories } from "../data/products";
import { filterProducts } from "../lib/catalog";
import { ProductCard } from "./ProductCard";

export function CatalogSection({ products, onAdd }) {
  const [category, setCategory] = useState("Todas");
  const [query, setQuery] = useState("");
  const visibleProducts = useMemo(
    () => filterProducts(products, category, query),
    [products, category, query],
  );

  return (
    <section className="catalog-section" id="catalogo">
      <div className="section-heading catalog-heading" data-reveal="up">
        <div>
          <span className="section-number" aria-hidden="true">
            01
          </span>
          <h2>Escolha o que dá vontade</h2>
          <p>
            Doces, pães e salgados feitos em pequenas fornadas. Nesta
            prévia, os produtos e preços são demonstrativos.
          </p>
        </div>
        <label className="search-field">
          <span className="sr-only">Buscar produto</span>
          <MagnifyingGlass size={19} />
          <input
            type="search"
            placeholder="Buscar no catálogo"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <div className="category-tabs" aria-label="Categorias" data-reveal="up">
        {categories.map((item, index) => (
          <motion.button
            type="button"
            key={item}
            className={item === category ? "active" : ""}
            onClick={() => setCategory(item)}
            whileHover={{ y: -3, rotate: index % 2 ? 0.6 : -0.6 }}
            whileTap={{ scale: 0.96 }}
          >
            {item}
          </motion.button>
        ))}
      </div>

      <div className="product-grid" data-reveal-group>
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </div>

      {visibleProducts.length === 0 && (
        <p className="empty-state">
          Nenhum produto encontrado. Experimente outra busca.
        </p>
      )}
    </section>
  );
}
