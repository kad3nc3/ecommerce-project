import { getVariantStock, products } from "../products";

export type CartState = Record<string, number>;
export const MAX_CART_SUBTOTAL = 3500;

const CART_KEY = "archives-cart";

export function readCart(): CartState {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(window.localStorage.getItem(CART_KEY) || "{}"); } catch { return {}; }
}

export function writeCart(cart: CartState) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("archives-cart-updated"));
}

export function getCartSubtotal(cart: CartState) {
  return Object.entries(cart).reduce((total, [key, quantity]) => {
    const product = products.find((item) => item.id === Number(key.split(":")[0]));
    return total + (product ? product.price * quantity : 0);
  }, 0);
}

export function getCartStockIssues(cart: CartState) {
  return Object.entries(cart).filter(([key, quantity]) => {
    const [id, size, color] = key.split(":");
    const product = products.find((item) => item.id === Number(id));
    return product && quantity > getVariantStock(product, size, color);
  }).map(([key]) => key);
}

export function addProductToCart(id: number, size?: string, color?: string) {
  const product = products.find((item) => item.id === id);
  if (!product || (product.sizes?.length && !product.sizes.includes(size || "")) || (product.colors?.length && !product.colors.includes(color || ""))) return "unavailable";
  const cart = readCart();
  const key = [id, size || "", color || ""].join(":");
  if ((cart[key] || 0) >= getVariantStock(product, size, color)) return "unavailable";
  if (getCartSubtotal(cart) + product.price > MAX_CART_SUBTOTAL) return "cart-limit";
  cart[key] = (cart[key] || 0) + 1;
  writeCart(cart);
  return "added";
}

export function changeCartQuantity(cart: CartState, key: string, delta: number) {
  const [id, size, color] = key.split(":");
  const product = products.find((item) => item.id === Number(id));
  if (!product) return cart;
  const quantity = Math.max(0, Math.min(getVariantStock(product, size, color), (cart[key] || 0) + delta));
  if (delta > 0 && getCartSubtotal(cart) + product.price * (quantity - (cart[key] || 0)) > MAX_CART_SUBTOTAL) return cart;
  const next = { ...cart };
  if (quantity) next[key] = quantity;
  else delete next[key];
  return next;
}
