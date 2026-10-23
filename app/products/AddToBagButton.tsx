"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProductToCart, MAX_CART_SUBTOTAL } from "../cart";
import { getTotalStock, getVariantStock, type Product } from "../../products";

export function AddToBagButton({ product }: { product: Product }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [message, setMessage] = useState("");
  const sizes = product.sizes || [];
  const colors = product.colors || [];
  const requiresSize = sizes.length > 0;
  const requiresColor = colors.length > 0;
  const soldOut = getTotalStock(product) === 0;
  const incomplete = (requiresSize && !selectedSize) || (requiresColor && !selectedColor);
  const selectedStock = incomplete ? 0 : getVariantStock(product, selectedSize, selectedColor);

  const sizeStock = (size: string) => colors.length
    ? (selectedColor ? getVariantStock(product, size, selectedColor) : colors.reduce((sum, color) => sum + getVariantStock(product, size, color), 0))
    : getVariantStock(product, size);

  return <div className="mt-10">
    {requiresColor && <fieldset className="mb-7"><legend className="mb-3 text-sm font-medium">Color{selectedColor && <span className="ml-2 text-xs font-normal text-[#73778a]">/ {selectedColor}</span>}</legend><div className="flex flex-wrap gap-3">{colors.map((color) => {
      const available = sizes.reduce((sum, size) => sum + getVariantStock(product, size, color), 0);
      return <button key={color} type="button" disabled={!available} aria-pressed={selectedColor === color} onClick={() => { setSelectedColor(color); setMessage(""); }} className={`rounded-[16px] border px-5 py-3 text-sm transition disabled:cursor-not-allowed disabled:opacity-35 ${selectedColor === color ? "border-[#171b2e] bg-[#171b2e] text-white" : "border-[#171b2e]/25 bg-transparent hover:border-[#171b2e]"}`}>{color}</button>;
    })}</div></fieldset>}
    {requiresSize && <fieldset><legend className="mb-3 text-sm font-medium">Size{selectedSize && <span className="ml-2 text-xs font-normal text-[#73778a]">/ {selectedSize}</span>}</legend><div className="flex flex-wrap gap-3">{sizes.map((size) => <button key={size} type="button" disabled={sizeStock(size) === 0} aria-pressed={selectedSize === size} title={sizeStock(size) === 0 ? "Out of stock" : `${sizeStock(size)} available`} onClick={() => { setSelectedSize(size); setMessage(""); }} className={`min-w-[62px] rounded-[16px] border px-5 py-3 text-sm transition disabled:cursor-not-allowed disabled:opacity-35 ${selectedSize === size ? "border-[#171b2e] bg-[#171b2e] text-white" : "border-[#171b2e]/25 bg-transparent hover:border-[#171b2e]"}`}>{size}</button>)}</div></fieldset>}
    <p className="mt-5 text-xs text-[#73778a]">{soldOut ? "Sold out" : incomplete ? "Select options to see availability." : selectedStock ? `${selectedStock} available in this selection` : "This selection is sold out."}</p>
    {message && <p role="status" className="mt-3 text-xs text-[#7d403a]">{message}</p>}
    <div className="mt-6 flex items-center gap-5"><span className="text-lg font-semibold">₱{product.price.toFixed(2)}</span><button type="button" disabled={soldOut || incomplete || selectedStock === 0} onClick={() => { const result = addProductToCart(product.id, selectedSize, selectedColor); if (result === "added") router.push("/cart"); else setMessage(result === "cart-limit" ? `Your bag cannot exceed ₱${MAX_CART_SUBTOTAL.toLocaleString()}.` : "All available pieces in this size are already in your bag."); }} className="rounded-[14px] bg-[#171b2e] px-6 py-4 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(23,27,46,.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#303653] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0">{soldOut || (!incomplete && selectedStock === 0) ? "Sold out" : requiresColor && !selectedColor ? "Select a color" : requiresSize && !selectedSize ? "Select a size" : "Add to bag"}</button></div>
    <p className="mt-3 text-[11px] text-[#9699a4]">Bag limit: ₱{MAX_CART_SUBTOTAL.toLocaleString()}</p>
  </div>;
}
