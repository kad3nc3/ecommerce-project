import { ProductCard } from "./components";
import { products } from "../products";

export default function Home() {
  return (
    <main className="container">
      <header className="header"><a className="brand" href="/">everyday<span>goods</span></a><nav><a href="#products">Shop</a><a href="#about">About</a><a href="#cart">Cart (0)</a></nav></header>
      <section className="hero"><p className="eyebrow">A SIMPLE STORE TEMPLATE</p><h1>Good things<br />for everyday.</h1><p>Discover a few thoughtful favorites for your home.</p><a className="button" href="#products">Browse products</a></section>
      <section id="products" className="products"><div className="section-heading"><div><p className="eyebrow">THE COLLECTION</p><h2>Featured products</h2></div><span>{products.length} items</span></div><div className="grid">{products.map(product => <ProductCard key={product.id} product={product} />)}</div></section>
      <footer id="about">timdan20.</footer>
    </main>
  );
}
