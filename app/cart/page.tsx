"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { readCart, writeCart, type CartState } from "../cart";
import { products } from "../../products";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartState>({});
  const [ready, setReady] = useState(false);

  useEffect(() => { const sync = () => { setCart(readCart()); setReady(true); }; sync(); window.addEventListener("archives-cart-updated", sync); return () => window.removeEventListener("archives-cart-updated", sync); }, []);
  const items = useMemo(() => Object.entries(cart).flatMap(([key, quantity]) => { const [id, size] = key.split(":"); const product = products.find((item) => item.id === Number(id)); return product ? [{ key, product, quantity, size }] : []; }), [cart]);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const updateQuantity = (key: string, delta: number) => { const next = { ...cart, [key]: Math.max(0, (cart[key] || 0) + delta) }; if (!next[key]) delete next[key]; writeCart(next); };
  const remove = (key: string) => { const next = { ...cart }; delete next[key]; writeCart(next); };

  return <main className="min-h-screen bg-gradient-to-br from-[#fbfaf6] via-[#f4f3f8] to-[#e9ecf9] px-5 py-5 text-[#171b2e] sm:px-10 sm:py-8">
    <header className="mx-auto flex max-w-5xl items-center justify-between border-b border-[#1e2341]/10 pb-5"><Link href="/" className="font-serif text-2xl">archives.</Link><button type="button" onClick={() => router.back()} className="rounded-full border border-[#1e2341]/15 px-4 py-2 text-xs transition hover:bg-white">← Go back</button></header>
    <div className="mx-auto max-w-5xl py-12 sm:py-16">
      <div className="mb-10 flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[1.8px] text-[#8a8e9e]">Your selection</p><h1 className="mt-3 font-serif text-5xl tracking-[-2px] sm:text-6xl">Your bag.</h1></div><span className="text-sm text-[#73778a]">{items.reduce((sum, item) => sum + item.quantity, 0)} pieces</span></div>

      {!ready ? <div className="h-40 animate-pulse rounded-[24px] bg-white/45" /> : items.length ? <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">{items.map(({ key, product, quantity, size }) => <article key={key} className="grid grid-cols-[96px_1fr] gap-5 rounded-[24px] border border-white/75 bg-white/55 p-4 shadow-[0_12px_35px_rgba(49,58,101,.06)] sm:grid-cols-[120px_1fr]"><div className="aspect-[4/5] overflow-hidden rounded-[16px] bg-[#ddd]"><img src={product.image || "/archives-hero.jpg"} alt={product.name} className="h-full w-full object-cover" /></div><div className="flex min-w-0 flex-col justify-between py-1"><div><div className="flex justify-between gap-4"><div><h2 className="font-serif text-xl">{product.name}</h2>{size && <p className="mt-1 text-xs text-[#73778a]">Size {size}</p>}</div><strong className="whitespace-nowrap text-sm">₱{(product.price * quantity).toFixed(2)}</strong></div><p className="mt-2 text-xs text-[#9699a4]">₱{product.price.toFixed(2)} each</p></div><div className="mt-5 flex items-center justify-between"><div className="flex items-center overflow-hidden rounded-[12px] border border-[#1e2341]/15"><button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => updateQuantity(key, -1)} className="grid h-9 w-10 place-items-center transition hover:bg-white">−</button><span className="grid h-9 min-w-10 place-items-center text-sm">{quantity}</span><button type="button" aria-label={`Increase ${product.name} quantity`} onClick={() => updateQuantity(key, 1)} className="grid h-9 w-10 place-items-center transition hover:bg-white">+</button></div><button type="button" onClick={() => remove(key)} className="text-xs text-[#8a8e9e] underline underline-offset-4 transition hover:text-[#171b2e]">Remove</button></div></div></article>)}</div>

        <aside className="h-fit rounded-[24px] border border-white/75 bg-white/60 p-6 shadow-[0_12px_35px_rgba(49,58,101,.06)] lg:sticky lg:top-8"><div className="flex justify-between text-sm"><span className="text-[#73778a]">Subtotal</span><strong>₱{subtotal.toFixed(2)}</strong></div><p className="mt-3 text-xs leading-5 text-[#9699a4]">Shipping and taxes are calculated during checkout.</p><Link href="/checkout" className="mt-6 flex w-full justify-center rounded-[14px] bg-[#171b2e] px-5 py-4 text-xs font-semibold text-white transition hover:bg-[#303653]">Continue to checkout</Link><Link href="/#shop" className="mt-4 block text-center text-xs text-[#73778a] underline underline-offset-4">Continue shopping</Link></aside>
      </div> : <div className="rounded-[24px] border border-white/75 bg-white/55 px-6 py-20 text-center"><p className="font-serif text-3xl">Nothing here yet.</p><p className="mt-3 text-sm text-[#73778a]">Choose something from the collection.</p><Link href="/#shop" className="mt-7 inline-flex rounded-[14px] bg-[#171b2e] px-6 py-4 text-xs font-semibold text-white">Explore the collection</Link></div>}
    </div>
  </main>;
}
