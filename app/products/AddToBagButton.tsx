"use client";

import { useState } from "react";
import { addProductToCart } from "../cart";

export function AddToBagButton({ productId }: { productId: number }) {
  const [added, setAdded] = useState(false);
  return <button type="button" onClick={() => { addProductToCart(productId); setAdded(true); }} className="rounded-[14px] bg-[#171b2e] px-6 py-4 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(23,27,46,.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#303653]">{added ? "Added to bag ✓" : "Add to bag"}</button>;
}
