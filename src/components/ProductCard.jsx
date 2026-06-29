import { Plus } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card" data-reveal-item>
      <div className="product-image-wrap">
        <img src={product.image} alt="" className="product-image" />
        <span className="product-category">{product.category}</span>
      </div>
      <div className="product-content">
        <div className="product-labels" aria-label="Características">
          {product.labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-footer">
          <strong>{money.format(product.price)}</strong>
          <motion.button
            className="add-button"
            type="button"
            onClick={() => onAdd(product)}
            aria-label="Adicionar ao pedido"
            whileTap={{ scale: 0.94 }}
          >
            <Plus size={18} weight="bold" />
            Adicionar
          </motion.button>
        </div>
      </div>
    </article>
  );
}
