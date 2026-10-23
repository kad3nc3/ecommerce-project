import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../../products";
import { ProductGallery } from "../ProductGallery";
import { AddToBagButton } from "../AddToBagButton";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);
  if (!product) notFound();
  return <main className="min-h-screen bg-[#f7f6f1] px-5 py-5 text-[#171b2e] sm:px-12 sm:py-8">
    <header className="mx-auto flex max-w-6xl items-center justify-between"><Link href="/" className="flex items-center gap-2.5 text-[17px] font-bold tracking-[-.5px]"><span className="brand-icon grid h-7 w-7 place-items-center rounded-[10px]" />archives</Link><Link href="/#shop" className="text-xs text-[#777c91]">← Back to shop</Link></header>
    <section className="mx-auto grid max-w-6xl gap-10 py-16 sm:grid-cols-[1.1fr_.9fr] sm:items-center sm:gap-20 sm:py-24"><ProductGallery images={[product.image || "/archives-hero-optimized.jpg", ...(product.secondaryImage ? [product.secondaryImage] : [])]} name={product.name} /><div><p className="mb-5 text-[10px] font-bold uppercase tracking-[1.8px] text-[#8a8e9e]">ARCHIVES / COLLECTION 01</p><h1 className="text-5xl font-semibold tracking-[-3px] sm:text-7xl">{product.name}</h1><p className="mt-5 text-lg text-[#73778a]">{product.description}</p><p className="mt-8 max-w-md text-sm leading-7 text-[#777c91]">{product.details}</p><AddToBagButton product={product} /></div></section>
  </main>;
}
