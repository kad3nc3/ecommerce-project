"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "./components";
import { addProductToCart, changeCartQuantity, getCartStockIssues, getCartSubtotal, MAX_CART_SUBTOTAL, readCart, type CartState, writeCart } from "./cart";
import { getTotalStock, getVariantStock, products } from "../products";

export default function Home() {
  const [cart, setCart] = useState<CartState>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [availability, setAvailability] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  useEffect(() => { const sync = () => setCart(readCart()); sync(); window.addEventListener("archives-cart-updated", sync); return () => window.removeEventListener("archives-cart-updated", sync); }, []);
  useEffect(() => { const items = document.querySelectorAll<HTMLElement>("[data-reveal]"); const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)), { threshold: 0.16 }); items.forEach((item) => observer.observe(item)); return () => observer.disconnect(); }, [query, availability, priceFilter, sortBy]);
  useEffect(() => { const story = document.getElementById("story"); if (!story || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; story.querySelectorAll<HTMLElement>("[data-story-item]").forEach((item, index) => item.animate([{ opacity: 0, transform: "translateY(32px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 700, delay: index * 140, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" })); observer.disconnect(); }, { threshold: 0.35 }); observer.observe(story); return () => observer.disconnect(); }, []);
  const cartItems = useMemo(() => Object.entries(cart).flatMap(([key, quantity]) => { const [id, size, color] = key.split(":"); const product = products.find((item) => item.id === Number(id)); return product ? [{ key, product, quantity, size, color }] : []; }), [cart]);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = getCartSubtotal(cart);
  const cartNeedsReview = getCartStockIssues(cart).length > 0 || subtotal > MAX_CART_SUBTOTAL;
  const filteredProducts = products.filter((product) => {
    const stock = getTotalStock(product);
    const matchesSearch = `${product.name} ${product.description}`.toLowerCase().includes(query.toLowerCase());
    const matchesAvailability = availability === "all" || (availability === "in-stock" ? stock > 0 : stock === 0);
    const matchesPrice = priceFilter === "all" || (priceFilter === "under-500" ? product.price < 500 : priceFilter === "500-999" ? product.price >= 500 && product.price < 1000 : product.price >= 1000);
    return matchesSearch && matchesAvailability && matchesPrice;
  }).sort((a, b) => sortBy === "price-asc" ? a.price - b.price : sortBy === "price-desc" ? b.price - a.price : sortBy === "name" ? a.name.localeCompare(b.name) : 0);
  const add = (id: number) => { if (addProductToCart(id) === "added") setCartOpen(true); };
  const changeQuantity = (key: string, delta: number) => { const next = changeCartQuantity(cart, key, delta); if (next !== cart) writeCart(next); };

  return <main className="relative mx-auto min-h-screen max-w-[1440px] overflow-hidden bg-white px-[18px] pt-[14px] text-[#171b2e] sm:px-[42px] sm:pt-[22px]">
    <div className="pointer-events-none absolute -right-40 top-64 h-[400px] w-[400px] rounded-full bg-[#b1b8f7]/25 blur-sm" />
    <header className="glass-nav relative z-10 flex h-16 items-center justify-between rounded-[22px] px-3 pl-[18px]">
      <a className="flex items-center gap-2.5 text-[17px] font-bold tracking-[-.5px] text-[#171b2e]" href="#top"><span className="brand-icon grid h-7 w-7 place-items-center rounded-[10px]" /><span>archives</span></a>
      <nav className="hidden gap-8 text-[13px] text-[#171b2e]/75 sm:flex"><a className="transition-colors hover:text-[#171b2e]" href="#shop">Shop all</a><a className="transition-colors hover:text-[#171b2e]" href="/contact">Contact us</a><a className="transition-colors hover:text-[#171b2e]" href="/faq">FAQ</a></nav>
      <div className="flex items-center gap-2"><a href="/account" aria-label="Customer account" className="glass-control grid h-10 w-10 place-items-center rounded-[14px] text-[#171b2e] transition duration-300 hover:-translate-y-0.5"><svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.5" /><path d="M5.5 20c.4-4 2.55-6 6.5-6s6.1 2 6.5 6" /></svg></a><button type="button" onClick={() => setCartOpen(true)} className="glass-control rounded-[14px] px-3.5 py-2.5 text-xs font-semibold text-[#171b2e] transition duration-300 hover:-translate-y-0.5">Cart <span className="ml-2 text-[#171b2e]/60">{cartCount}</span></button></div>
    </header>

    <section id="top" data-reveal className="reveal relative z-[1] mt-3 grid min-h-[640px] items-center gap-12 rounded-[28px] bg-white bg-cover bg-center px-[2%] py-16 sm:mt-4 sm:grid-cols-[46%_54%] sm:gap-0 sm:px-[4%] sm:py-20" style={{ backgroundImage: "url('/archives-hero-optimized.jpg')" }}>
      <div className="max-w-[440px] rounded-[26px] bg-black/25 p-6 shadow-[0_20px_50px_rgba(0,0,0,.18)] backdrop-blur-md sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-0"><p className="mb-5 text-[10px] font-bold uppercase tracking-[1.8px] text-white/70">The art of everyday wear</p><h1 className="text-[65px] font-semibold leading-[.92] tracking-[-5px] text-white sm:text-[clamp(58px,7.2vw,106px)]">Archives.</h1><p className="my-7 max-w-[350px] text-[15px] leading-relaxed text-white/75"><strong className="font-semibold text-white">Archives clothing</strong> made to stand out without saying too much.</p><div className="flex items-center gap-6"><a className="liquid-button inline-flex items-center rounded-[14px] px-[18px] py-[15px] text-xs font-semibold transition duration-300 hover:-translate-y-1" href="#shop">Explore the collection</a><a className="text-xs text-white/75 transition hover:text-white" href="#story" onClick={(event) => { event.preventDefault(); document.getElementById("story")?.scrollIntoView({ behavior: "smooth", block: "start" }); window.history.replaceState(null, "", "#story"); }}>Why Archives <span className="ml-2 text-white/80">↓</span></a></div></div>
    </section>

    <section data-reveal className="marquee-band reveal relative z-[1] overflow-hidden border-y py-[18px] text-[8px] uppercase tracking-[1.1px] sm:text-[10px]"><div className="marquee-mask"><div className="marquee-track"><div className="marquee-group"><span>Thoughtfully sourced</span><i /><span>Made for everyday rituals</span><i /><span>Ships with care</span><i /></div><div className="marquee-group" aria-hidden="true"><span>Thoughtfully sourced</span><i /><span>Made for everyday rituals</span><i /><span>Ships with care</span><i /></div></div></div></section>
    <section id="shop" data-reveal className="reveal relative z-[1] px-[2%] py-24 sm:px-[4%] sm:py-[105px]">
      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-[32px] font-semibold tracking-[-2px] sm:text-[38px]">Essentials with a point of view.</h2>
        <div className="flex items-center gap-3 rounded-[14px] border border-[#1e2341]/10 bg-white/45 px-3.5 py-2.5 focus-within:border-[#8993d7]"><span className="text-sm text-[#8d91a0]">⌕</span><input aria-label="Search products" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" className="w-36 bg-transparent text-xs outline-none placeholder:text-[#a8abb6] sm:w-44" /></div>
      </div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-y border-[#1e2341]/10 py-4 text-xs text-[#171b2e]">
        <div className="flex flex-wrap items-center gap-3 sm:gap-5"><span className="text-[#777c91]">Filter:</span>
          <label className="flex items-center gap-2">Availability<select aria-label="Filter by availability" value={availability} onChange={(event) => setAvailability(event.target.value)} className="max-w-[130px] cursor-pointer bg-transparent text-[#73778a] outline-none"><option value="all">All</option><option value="in-stock">In stock</option><option value="sold-out">Sold out</option></select></label>
          <label className="flex items-center gap-2">Price<select aria-label="Filter by price" value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)} className="max-w-[130px] cursor-pointer bg-transparent text-[#73778a] outline-none"><option value="all">All</option><option value="under-500">Under ₱500</option><option value="500-999">₱500–₱999</option><option value="over-1000">₱1,000+</option></select></label>
        </div>
        <div className="flex items-center gap-3"><label className="flex items-center gap-2">Sort by:<select aria-label="Sort products" value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="max-w-[155px] cursor-pointer bg-transparent text-[#73778a] outline-none"><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name: A to Z</option></select></label><span className="text-[#9699a4]">{filteredProducts.length} results</span></div>
      </div>
      <div className="mb-5 flex items-center justify-between text-[11px] text-[#9699a4]"><span>{products.reduce((sum, product) => sum + getTotalStock(product), 0)} pieces available across the collection</span>{(query || availability !== "all" || priceFilter !== "all" || sortBy !== "featured") && <button type="button" onClick={() => { setQuery(""); setAvailability("all"); setPriceFilter("all"); setSortBy("featured"); }} className="underline underline-offset-4">Clear filters</button>}</div>
      <div className="grid gap-9 sm:grid-cols-3 sm:gap-[22px]">{filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} onAdd={() => add(product.id)} />)}</div>
      {filteredProducts.length === 0 && <p className="rounded-[20px] bg-white/50 p-10 text-center text-sm text-[#777c91]">No pieces match these filters.</p>}
    </section>
    <section id="lookbook" data-reveal className="reveal relative z-[1] mx-auto w-[92%] max-w-5xl scroll-mt-6 overflow-hidden rounded-[28px] bg-[#171b2e]">
      <img src="/akosidogie.png" alt="Archives clothing worn outdoors" className="h-[380px] w-full object-cover object-top sm:h-[520px]" />
    </section>
    <section id="story" className="relative z-[1] grid scroll-mt-6 grid-cols-[40px_1fr] gap-5 border-t border-[#1e2341]/10 px-[2%] py-24 sm:grid-cols-[80px_1fr_1fr] sm:gap-[35px] sm:px-[4%]"><div data-story-item className="font-serif text-2xl text-[#9da3d8]">01</div><div data-story-item><p className="mb-4 text-[10px] font-bold uppercase tracking-[1.8px] text-[#8a8e9e]">WHY ARCHIVES</p><h2 className="text-[42px] leading-[.98] tracking-[-3px] sm:text-[46px]">Everyday wear,<br /><em className="font-serif font-medium">made timeless.</em></h2></div><p data-story-item className="col-start-2 max-w-[360px] self-end text-sm leading-[1.7] text-[#767b8c] sm:col-start-3">Archives is built on minimalist design and timeless construction. We create foundational pieces with meticulous fits, premium fabrics, and quiet details&mdash;clothing made to last beyond the trend.</p></section>
    <footer id="contact" className="relative z-[1] flex flex-wrap items-center justify-between gap-3 border-t border-[#1e2341]/10 px-[4%] py-6 text-[11px] text-[#9296a5]">
      <div className="flex items-center gap-2 font-semibold text-[#171b2e]"><span className="brand-icon grid h-6 w-6 place-items-center rounded-[10px]" />archives</div>
      <div className="flex items-center gap-2">
        <a href="https://www.facebook.com/archives.apparel/" target="_blank" rel="noreferrer" aria-label="Archives Apparel on Facebook" className="grid h-8 w-8 place-items-center rounded-full border border-[#1e2341]/15 text-[#171b2e] transition duration-300 hover:-translate-y-0.5 hover:border-[#171b2e] hover:bg-[#171b2e] hover:text-white"><svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current"><path d="M13.5 22v-9h3l.5-3.5h-3.5V7.25c0-1.01.28-1.7 1.75-1.7H17V2.42c-.3-.04-1.34-.13-2.55-.13-2.52 0-4.25 1.54-4.25 4.37V9.5H7.35V13h2.85v9h3.3Z" /></svg></a>
        <a href="https://www.instagram.com/archives.apparel/?hl=en" target="_blank" rel="noreferrer" aria-label="Archives Apparel on Instagram" className="grid h-8 w-8 place-items-center rounded-full border border-[#1e2341]/15 text-[#171b2e] transition duration-300 hover:-translate-y-0.5 hover:border-[#171b2e] hover:bg-[#171b2e] hover:text-white"><svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.25" /><circle cx="17.4" cy="6.7" r="1" className="fill-current stroke-none" /></svg></a>
        <a href="https://www.tiktok.com/@archivesclothing" target="_blank" rel="noreferrer" aria-label="Archives Clothing on TikTok" className="grid h-8 w-8 place-items-center rounded-full border border-[#1e2341]/15 text-[#171b2e] transition duration-300 hover:-translate-y-0.5 hover:border-[#171b2e] hover:bg-[#171b2e] hover:text-white"><svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4v10.25a4.25 4.25 0 1 1-3-4.06" /><path d="M14 4c.45 2.5 2 4 5 4.5" /></svg></a>
      </div>
      <span>© 2024 Archives Studio</span>
    </footer>

    {cartOpen && <div className="fixed inset-0 z-50 bg-[#171b2e]/20 backdrop-blur-sm" onClick={() => setCartOpen(false)}>
      <aside role="dialog" aria-label="Shopping cart" onClick={(event) => event.stopPropagation()} className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fbfaf6] p-6 shadow-2xl sm:p-8">
        <div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[1.8px] text-[#8a8e9e]">YOUR CART</p><h2 className="mt-2 text-3xl font-semibold tracking-[-1.5px]">{cartCount ? `${cartCount} piece${cartCount === 1 ? "" : "s"}` : "It’s quiet in here."}</h2></div><button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-[#1e2341]/10 text-xl">×</button></div>
        {cartItems.length ? <>
          <div className="mt-8 flex-1 space-y-4 overflow-auto">{cartItems.map(({ key, product, quantity, size, color }) => <div key={key} className="flex gap-4 border-b border-[#1e2341]/10 pb-4">
            <div className="h-20 w-16 overflow-hidden rounded-xl bg-[#ddd]"><img src={product.image || "/archives-hero.jpg"} alt="" className="h-full w-full object-cover" /></div>
            <div className="flex-1"><div className="flex justify-between gap-3"><p className="text-sm font-medium">{product.name}</p><span className="text-sm">₱{(product.price * quantity).toFixed(2)}</span></div>{color && <p className="mt-1 text-xs text-[#73778a]">Color {color}</p>}{size && <p className="mt-1 text-xs text-[#73778a]">Size {size}</p>}<p className="mt-1 text-xs text-[#9699a4]">₱{product.price.toFixed(2)} each</p>
              <div className="mt-3 flex items-center gap-3 text-xs"><button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => changeQuantity(key, -1)} className="grid h-6 w-6 place-items-center rounded-full border border-[#1e2341]/15">−</button><span>{quantity}</span><button type="button" aria-label={`Increase ${product.name} quantity`} disabled={quantity >= getVariantStock(product, size, color) || subtotal + product.price > MAX_CART_SUBTOTAL} onClick={() => changeQuantity(key, 1)} className="grid h-6 w-6 place-items-center rounded-full border border-[#1e2341]/15 disabled:cursor-not-allowed disabled:opacity-30">+</button></div>
            </div>
          </div>)}</div>
          <div className="border-t border-[#1e2341]/10 pt-5"><div className="flex justify-between text-sm"><span>Subtotal</span><strong>₱{subtotal.toFixed(2)}</strong></div><p className="mt-2 text-xs text-[#9699a4]">Cart limit: ₱{MAX_CART_SUBTOTAL.toLocaleString()}</p>{cartNeedsReview && <p role="alert" className="mt-3 text-xs text-[#9b4a42]">Adjust unavailable items or reduce your subtotal to continue.</p>}<button type="button" onClick={() => { window.location.href = cartNeedsReview ? "/cart" : "/checkout"; }} className="mt-5 w-full rounded-[14px] bg-[#171b2e] px-5 py-4 text-xs font-semibold text-white transition hover:bg-[#303653]">{cartNeedsReview ? "Review cart" : "Continue to checkout"}</button><p className="mt-3 text-center text-[11px] text-[#9699a4]">Shipping and taxes calculated at checkout.</p></div>
        </> : <div className="flex flex-1 flex-col items-center justify-center text-center"><p className="text-5xl">◌</p><p className="mt-4 text-sm text-[#777c91]">Add something considered to your cart.</p><a href="#shop" onClick={() => setCartOpen(false)} className="mt-6 rounded-[14px] bg-[#171b2e] px-5 py-3 text-xs font-semibold text-white">Continue shopping</a></div>}
      </aside>
    </div>}
  </main>;
}
