export type Product = { id: number; slug: string; name: string; description: string; details: string; price: number; image?: string; secondaryImage?: string; sizes?: string[]; colors?: string[]; stock: Record<string, number>; demoBadge?: "Best seller" };

const apparelSizes = ["S", "M", "L", "XL", "2XL"];

// Placeholder counts by size (and color where applicable); replace with verified inventory for live orders.
export const products: Product[] = [
  { id: 1, slug: "archives-jacket", name: "Archives Jacket", description: "Heavyweight black cotton hoodie", details: "A heavyweight everyday layer cut from soft cotton fleece. Finished with a relaxed fit, a deep hood, ribbed cuffs, and the signature Archives graphic across the chest.", price: 88, image: "/archives-jacket-optimized.jpg", secondaryImage: "/archives-jacket-worn-optimized.jpg", sizes: apparelSizes, stock: { S: 11, M: 17, L: 9, XL: 4, "2XL": 2 } },
  { id: 2, slug: "archives-iconic-tee", name: "Iconic Archives Tee", description: "Graphic cotton tee in white or black", details: "A relaxed everyday tee printed with the Archives icon language. Choose between a clean white base or a black base with the same signature artwork.", price: 550, image: "/archives-iconic-tee-white.JPG", secondaryImage: "/archives-iconic-tee-black.JPG", sizes: apparelSizes, colors: ["White", "Black"], stock: { "S:White": 13, "M:White": 19, "L:White": 12, "XL:White": 7, "2XL:White": 3, "S:Black": 9, "M:Black": 15, "L:Black": 11, "XL:Black": 5, "2XL:Black": 2 }, demoBadge: "Best seller" },
  { id: 3, slug: "archives-shorts", name: "Archives Shorts", description: "Relaxed cotton fleece shorts", details: "Easy everyday shorts with a soft elastic waist, practical side pockets, and a subtle Archives mark at the hem.", price: 44, image: "/archives-shorts.jpg", sizes: apparelSizes, stock: { S: 7, M: 12, L: 8, XL: 4, "2XL": 1 } },
  { id: 4, slug: "archives-white-tee", name: "Archives White Tee Design", description: "Signature graphic cotton tee", details: "A clean white tee finished with an oversized Archives graphic. Cut with an easy fit for everyday rotation.", price: 500, image: "/archives-white-tee.jpg", sizes: apparelSizes, stock: { S: 14, M: 16, L: 10, XL: 6, "2XL": 2 } },
  { id: 5, slug: "archives-sakura-tee", name: "Archives Sakura Tee", description: "Sakura graphic cotton tee", details: "A relaxed everyday tee featuring the Archives sakura graphic. Made for an easy fit with a clean finish and soft cotton feel.", price: 650, image: "/archives sakura1-optimized.jpg", secondaryImage: "/archives sakura worn-optimized.jpg", sizes: apparelSizes, stock: { S: 3, M: 1, L: 1, XL: 0, "2XL": 0 } },
  { id: 6, slug: "archives-doodle-set", name: "Archives Doodle Set", description: "Graphic hoodie and shorts set", details: "A matching hoodie and shorts set finished with the Archives doodle artwork. Built for a relaxed fit and comfortable everyday wear.", price: 1800, image: "/doodle hoodie set-optimized.jpg", secondaryImage: "/doodle hoodie worn-optimized.jpg", sizes: apparelSizes, stock: { S: 2, M: 1, L: 1, XL: 1, "2XL": 0 } },
];

export function getVariantStock(product: Product, size?: string, color?: string) {
  return product.stock[[size || "default", color].filter(Boolean).join(":")] ?? 0;
}

export function getTotalStock(product: Product) {
  return Object.values(product.stock).reduce((total, quantity) => total + quantity, 0);
}
