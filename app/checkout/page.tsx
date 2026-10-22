"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { readCart, type CartState } from "../cart";
import { products } from "../../products";

const inputClass = "w-full rounded-[14px] border border-[#1e2341]/10 bg-white/85 px-4 py-3.5 text-sm text-[#171b2e] shadow-sm outline-none transition placeholder:text-[#858895] focus:border-[#8993d7] focus:ring-2 focus:ring-[#8993d7]/20";

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartState>({});
  const [payment, setPayment] = useState("bpi");
  const [submitted, setSubmitted] = useState(false);
  const [discount, setDiscount] = useState("");

  useEffect(() => { const sync = () => setCart(readCart()); sync(); window.addEventListener("archives-cart-updated", sync); return () => window.removeEventListener("archives-cart-updated", sync); }, []);

  const items = useMemo(() => Object.entries(cart).flatMap(([key, quantity]) => {
    const [id, size, color] = key.split(":");
    const product = products.find((item) => item.id === Number(id));
    return product ? [{ key, product, quantity, size, color }] : [];
  }), [cart]);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const completeOrder = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };

  if (!items.length) return <main className="grid min-h-screen place-items-center bg-gradient-to-br from-[#fbfaf6] via-[#f4f3f8] to-[#e9ecf9] px-6 text-[#171b2e]"><div className="text-center"><p className="text-[10px] font-bold uppercase tracking-[2px] text-[#8a8e9e]">Archives checkout</p><h1 className="mt-4 font-serif text-5xl">Your bag is empty.</h1><Link href="/#shop" className="mt-8 inline-flex rounded-[14px] bg-[#171b2e] px-6 py-4 text-xs font-semibold text-white">Return to the collection</Link></div></main>;

  return <main className="min-h-screen bg-gradient-to-br from-[#fbfaf6] via-[#f4f3f8] to-[#e9ecf9] text-[#171b2e]">
    <header className="border-b border-[#1e2341]/10 bg-white/45 px-5 py-5 backdrop-blur sm:px-10"><div className="mx-auto flex max-w-6xl items-center justify-between"><Link href="/" className="font-serif text-2xl">archives.</Link><Link href="/" className="text-xs text-[#747989] transition hover:text-[#171b2e]">Return to store</Link></div></header>
    <form onSubmit={completeOrder} className="mx-auto grid max-w-6xl gap-14 px-5 py-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20 lg:px-10 lg:py-16">
      <div className="space-y-10">
        <section><div className="mb-4 flex items-center justify-between"><h1 className="text-xl font-semibold">Contact</h1><span className="text-xs text-[#8a8e9e]">Secure checkout</span></div><input required type="email" autoComplete="email" placeholder="Email address" className={inputClass} /><label className="mt-3 flex items-center gap-2 text-xs text-[#73778a]"><input type="checkbox" className="h-4 w-4 accent-[#171b2e]" /> Email me with news and offers</label></section>

        <section><h2 className="mb-4 text-xl font-semibold">Delivery</h2><div className="grid gap-3 sm:grid-cols-2"><label className="relative sm:col-span-2"><span className="pointer-events-none absolute left-4 top-2 text-[10px] text-[#747789]">Country/Region</span><select defaultValue="Philippines" className={`${inputClass} pt-5`}><option>Philippines</option></select></label><input required autoComplete="given-name" placeholder="First name" className={inputClass} /><input required autoComplete="family-name" placeholder="Last name" className={inputClass} /><input required autoComplete="street-address" placeholder="Address" className={`${inputClass} sm:col-span-2`} /><input required placeholder="Barangay" className={`${inputClass} sm:col-span-2`} /><input required autoComplete="postal-code" placeholder="Postal code" className={inputClass} /><input required autoComplete="address-level2" placeholder="City" className={inputClass} /><input required autoComplete="address-level1" placeholder="Region / Province" className={`${inputClass} sm:col-span-2`} /><input required type="tel" autoComplete="tel" placeholder="Phone" className={`${inputClass} sm:col-span-2`} /></div><label className="mt-3 flex items-center gap-2 text-xs text-[#73778a]"><input type="checkbox" className="h-4 w-4 accent-[#171b2e]" /> Save this information for next time</label></section>

        <section><h2 className="mb-4 text-xl font-semibold">Shipping method</h2><div className="rounded-[14px] border border-[#1e2341]/10 bg-white/55 px-5 py-5 text-center text-sm text-[#73778a]">Shipping options appear after you enter your address.</div></section>

        <section><h2 className="text-xl font-semibold">Payment</h2><p className="mb-4 mt-1 text-xs text-[#8a8e9e]">All transactions are secure and encrypted.</p><div className="overflow-hidden rounded-[16px] border border-[#1e2341]/10 bg-white/85 text-[#171b2e] shadow-sm">{[["bpi", "BPI bank payment"], ["gcash", "GCash"], ["cod", "Cash on Delivery (COD)"]].map(([value, label]) => <label key={value} className="block border-b border-black/10 last:border-0"><span className="flex cursor-pointer items-center gap-3 px-4 py-4 text-sm"><input type="radio" name="payment" value={value} checked={payment === value} onChange={() => setPayment(value)} className="h-4 w-4 accent-[#171b2e]" />{label}</span>{payment === value && value === "bpi" && <span className="block border-t border-black/10 bg-[#f3f3f3] px-4 py-5 text-xs leading-5 text-[#5f6270]">Payment instructions and account details will be sent to your email after the order is reviewed.</span>}</label>)}</div></section>

        <section><h2 className="mb-4 text-base font-medium">Billing address</h2><div className="overflow-hidden rounded-[16px] border border-[#1e2341]/10 bg-white/85 text-[#171b2e] shadow-sm"><label className="flex cursor-pointer items-center gap-3 border-b border-black/10 px-4 py-4 text-sm"><input defaultChecked type="radio" name="billing" className="h-4 w-4 accent-[#171b2e]" />Same as shipping address</label><label className="flex cursor-pointer items-center gap-3 px-4 py-4 text-sm"><input type="radio" name="billing" className="h-4 w-4 accent-[#171b2e]" />Use a different billing address</label></div></section>

        {submitted && <div role="status" className="rounded-[14px] border border-[#8993d7]/30 bg-[#8993d7]/10 p-4 text-sm text-[#4f5785]">Checkout design is ready. Connect a payment and order backend before accepting live orders.</div>}
        <button type="submit" className="w-full rounded-[14px] bg-[#171b2e] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#303653]">Complete order</button>
        <p className="text-center text-[11px] text-[#9296a5]">By continuing, you agree to the store terms and privacy policy.</p>
      </div>

      <aside className="rounded-[24px] border border-white/70 bg-white/45 p-6 shadow-[0_20px_50px_rgba(49,58,101,.08)] backdrop-blur lg:sticky lg:top-8 lg:self-start"><div className="space-y-5">{items.map(({ key, product, quantity, size }) => <div key={key} className="flex items-center gap-4"><div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-[14px] border border-[#1e2341]/10 bg-white"><img src={product.image || "/archives-hero.jpg"} alt="" className="h-full w-full object-cover" /><span className="absolute right-1 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#171b2e] px-1 text-[10px] font-semibold text-white">{quantity}</span></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{product.name}</p>{size && <p className="mt-1 text-xs text-[#8a8e9e]">Size {size}</p>}</div><span className="text-sm">₱{(product.price * quantity).toFixed(2)}</span></div>)}</div>
        <div className="mt-8 flex gap-2"><input value={discount} onChange={(event) => setDiscount(event.target.value)} placeholder="Discount code" className={inputClass} /><button type="button" className="rounded-[14px] border border-[#1e2341]/15 px-5 text-xs text-[#73778a] transition hover:border-[#171b2e] hover:text-[#171b2e]">Apply</button></div>
        <div className="mt-8 space-y-3 border-t border-[#1e2341]/10 pt-6 text-sm"><div className="flex justify-between"><span className="text-[#73778a]">Subtotal</span><span>₱{subtotal.toFixed(2)}</span></div><div className="flex justify-between"><span className="text-[#73778a]">Shipping</span><span className="text-xs text-[#8a8e9e]">Enter shipping address</span></div><div className="flex justify-between border-t border-[#1e2341]/10 pt-4 text-lg"><strong>Total</strong><strong><span className="mr-2 text-xs font-normal text-[#8a8e9e]">PHP</span>₱{subtotal.toFixed(2)}</strong></div></div>
      </aside>
    </form>
  </main>;
}
