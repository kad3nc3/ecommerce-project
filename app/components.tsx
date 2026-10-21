import type { Product } from "../products";

export function ProductCard({ product }: { product: Product }) {
  return <article><div className="product-image" aria-label={product.name}>{product.emoji}</div><div className="product-info"><div><h3>{product.name}</h3><p>{product.description}</p></div><span className="price">${product.price.toFixed(2)}</span></div></article>;
}
