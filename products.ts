export type Product = { id: number; slug: string; name: string; description: string; details: string; price: number; image?: string; secondaryImage?: string; sizes?: string[]; colors?: string[] };

const apparelSizes = ["S", "M", "L", "XL", "2XL"];

export const products: Product[] = [
  { id: 1, slug: "archives-jacket", name: "Archives Jacket", description: "Heavyweight black cotton hoodie", details: "A heavyweight everyday layer cut from soft cotton fleece. Finished with a relaxed fit, a deep hood, ribbed cuffs, and the signature Archives graphic across the chest.", price: 88, image: "/archives-jacket-optimized.jpg", secondaryImage: "/archives-jacket-worn-optimized.jpg", sizes: apparelSizes },
  { id: 2, slug: "archives-iconic-tee", name: "Iconic Archives Tee", description: "Graphic cotton tee in white or black", details: "A relaxed everyday tee printed with the Archives icon language. Choose between a clean white base or a black base with the same signature artwork.", price: 48, image: "/archives-iconic-tee-white.JPG", secondaryImage: "/archives-iconic-tee-black.JPG", sizes: apparelSizes, colors: ["White", "Black"] },
  { id: 3, slug: "archives-shorts", name: "Archives Shorts", description: "Relaxed cotton fleece shorts", details: "Easy everyday shorts with a soft elastic waist, practical side pockets, and a subtle Archives mark at the hem.", price: 44, image: "/archives-shorts.jpg", sizes: apparelSizes },
  { id: 4, slug: "archives-white-tee", name: "Archives White Tee Design", description: "Signature graphic cotton tee", details: "A clean white tee finished with an oversized Archives graphic. Cut with an easy fit for everyday rotation.", price: 42, image: "/archives-white-tee.jpg", sizes: apparelSizes },
];
