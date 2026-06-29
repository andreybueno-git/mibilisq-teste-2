import {
  Minus,
  Plus,
  ShoppingBagOpen,
  Trash,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { getCartTotal } from "../lib/cart";
import { createWhatsAppUrl } from "../lib/whatsapp";

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onQuantityChange,
}) {
  const [customerName, setCustomerName] = useState("");
  const [attempted, setAttempted] = useState(false);
  const total = useMemo(() => getCartTotal(items), [items]);
  const validName = customerName.trim().length >= 2;
  const orderId = "PREV-1042";
  const whatsappUrl =
    validName && items.length > 0
      ? createWhatsAppUrl({
          phone: "5563992259449",
          customerName: customerName.trim(),
          items,
          orderId,
        })
      : "";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            className="drawer-backdrop"
            type="button"
            aria-label="Fechar pedido"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="cart-drawer"
            aria-label="Meu pedido"
            data-lenis-prevent=""
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 27, stiffness: 230 }}
          >
            <div className="drawer-header">
              <div>
                <span>Seu carrinho</span>
                <h2>Meu pedido</h2>
              </div>
              <button type="button" onClick={onClose} aria-label="Fechar">
                <X size={24} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBagOpen size={48} weight="duotone" />
                <h3>Seu pedido ainda está vazio.</h3>
                <p>Escolha uma gostosura no catálogo para começar.</p>
                <button type="button" onClick={onClose}>
                  Voltar ao catálogo
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {items.map((item) => (
                    <article className="cart-item" key={item.id}>
                      <img src={item.image} alt="" />
                      <div>
                        <h3>{item.name}</h3>
                        <strong>{money.format(item.price)}</strong>
                        <div className="quantity-control">
                          <button
                            type="button"
                            onClick={() =>
                              onQuantityChange(item.id, item.quantity - 1)
                            }
                            aria-label={`Diminuir ${item.name}`}
                          >
                            {item.quantity === 1 ? (
                              <Trash size={16} />
                            ) : (
                              <Minus size={16} />
                            )}
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() =>
                              onQuantityChange(item.id, item.quantity + 1)
                            }
                            aria-label={`Aumentar ${item.name}`}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Total estimado</span>
                    <strong>{money.format(total)}</strong>
                  </div>
                  <p>
                    A loja confirmará disponibilidade, detalhes e valor final
                    pelo WhatsApp.
                  </p>
                </div>

                <div className="checkout-name">
                  <label htmlFor="customer-name">Seu nome</label>
                  <input
                    id="customer-name"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder="Como podemos chamar você?"
                    aria-invalid={attempted && !validName}
                  />
                  {attempted && !validName && (
                    <p role="alert">Informe seu nome para continuar.</p>
                  )}
                </div>

                {!attempted || !validName ? (
                  <button
                    className="button button-primary checkout-button"
                    type="button"
                    onClick={() => setAttempted(true)}
                  >
                    <WhatsappLogo size={20} weight="fill" />
                    Continuar pelo WhatsApp
                  </button>
                ) : (
                  <a
                    className="button button-primary checkout-button"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsappLogo size={20} weight="fill" />
                    Finalizar no WhatsApp
                  </a>
                )}
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
