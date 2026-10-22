"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProductToCart } from "../cart";

export function AddToBagButton({ productId, price, sizes = [], colors = [] }: { productId: number; price: number; sizes?: string[]; colors?: string[] }) {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const requiresSize = sizes.length > 0;
  const requiresColor = colors.length > 0;
  const incomplete = (requiresSize && !selectedSize) || (requiresColor && !selectedColor);

  return <div className="mt-10">
    {requiresColor && <fieldset className="mb-7"><legend className="mb-3 text-sm font-medium">Color{selectedColor && <span className="ml-2 text-xs font-normal text-[#73778a]">/ {selectedColor}</span>}</legend><div className="flex flex-wrap gap-3">{colors.map((color) => <button key={color} type="button" aria-pressed={selectedColor === color} onClick={() => { setSelectedColor(color); setAdded(false); }} className={`rounded-[16px] border px-5 py-3 text-sm transition ${selectedColor === color ? "border-[#171b2e] bg-[#171b2e] text-white" : "border-[#171b2e]/25 bg-transparent hover:border-[#171b2e]"}`}>{color}</button>)}</div></fieldset>}
    {requiresSize && <fieldset><legend className="mb-3 text-sm font-medium">Size{selectedSize && <span className="ml-2 text-xs font-normal text-[#73778a]">/ {selectedSize}</span>}</legend><div className="flex flex-wrap gap-3">{sizes.map((size) => <button key={size} type="button" aria-pressed={selectedSize === size} onClick={() => { setSelectedSize(size); setAdded(false); }} className={`min-w-[62px] rounded-[16px] border px-5 py-3 text-sm transition ${selectedSize === size ? "border-[#171b2e] bg-[#171b2e] text-white" : "border-[#171b2e]/25 bg-transparent hover:border-[#171b2e]"}`}>{size}</button>)}</div></fieldset>}
    <div className="mt-8 flex items-center gap-5"><span className="text-lg font-semibold">₱{price.toFixed(2)}</span><button type="button" disabled={incomplete} onClick={() => { addProductToCart(productId, selectedSize, selectedColor); setAdded(true); router.push("/cart"); }} className="rounded-[14px] bg-[#171b2e] px-6 py-4 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(23,27,46,.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#303653] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0">{added ? "Added to bag ✓" : requiresColor && !selectedColor ? "Select a color" : requiresSize && !selectedSize ? "Select a size" : "Add to bag"}</button></div>
  </div>;
}
