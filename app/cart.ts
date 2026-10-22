export type CartState = Record<string, number>;

const CART_KEY = "archives-cart";

export function readCart(): CartState {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(window.localStorage.getItem(CART_KEY) || "{}"); } catch { return {}; }
}

export function writeCart(cart: CartState) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("archives-cart-updated"));
}

export function addProductToCart(id: number, size?: string) {
  const cart = readCart();
  const key = size ? `${id}:${size}` : String(id);
  cart[key] = (cart[key] || 0) + 1;
  writeCart(cart);
}
