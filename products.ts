export type Product = { id: number; slug: string; name: string; description: string; details: string; price: number; image?: string };

export const products: Product[] = [
  { id: 1, slug: "archives-jacket", name: "Archives Jacket", description: "Heavyweight black cotton hoodie", details: "A heavyweight everyday layer cut from soft cotton fleece. Finished with a relaxed fit, a deep hood, ribbed cuffs, and the signature Archives graphic across the chest.", price: 88, image: "/archives-jacket.jpg" },
  { id: 2, slug: "ceramic-mug", name: "Ceramic mug", description: "Hand-finished stoneware", details: "A quiet, hand-finished stoneware mug made for slow mornings.", price: 18 },
  { id: 3, slug: "linen-tote", name: "Linen tote", description: "Everyday carry-all", details: "A durable linen tote with room for the things you carry every day.", price: 24 },
  { id: 4, slug: "desk-plant", name: "Desk plant", description: "A little green companion", details: "A small green companion to bring a little life to your desk.", price: 16 },
];
