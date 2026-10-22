export type Product = { id: number; slug: string; name: string; description: string; details: string; price: number; image?: string; secondaryImage?: string; sizes?: string[] };

const apparelSizes = ["S", "M", "L", "XL", "2XL"];

export const products: Product[] = [
  { id: 1, slug: "archives-jacket", name: "Archives Jacket", description: "Heavyweight black cotton hoodie", details: "A heavyweight everyday layer cut from soft cotton fleece. Finished with a relaxed fit, a deep hood, ribbed cuffs, and the signature Archives graphic across the chest.", price: 88, image: "/archives-jacket.jpg", secondaryImage: "/archives-jacket-worn.jpg", sizes: apparelSizes },
  { id: 2, slug: "ceramic-mug", name: "Ceramic mug", description: "Hand-finished stoneware", details: "A quiet, hand-finished stoneware mug made for slow mornings.", price: 18 },
  { id: 3, slug: "linen-tote", name: "Linen tote", description: "Everyday carry-all", details: "A durable linen tote with room for the things you carry every day.", price: 24 },
  { id: 4, slug: "desk-plant", name: "Desk plant", description: "A little green companion", details: "A small green companion to bring a little life to your desk.", price: 16 },
  { id: 5, slug: "archives-sakura-tee", name: "Archives Sakura Tee", description: "Oversized graphic cotton tee", details: "A relaxed white tee cut from soft cotton and finished with the Archives sakura tree graphic. Designed with dropped shoulders and an easy oversized fit for everyday wear.", price: 42, image: "/archives sakura1.jpg", secondaryImage: "/archives sakura worn.jpg", sizes: apparelSizes },
  { id: 6, slug: "archives-doodle-set", name: "Archives Doodle Set", description: "All-over print hoodie and pants set", details: "A matching hoodie and relaxed-leg pants covered in the Archives doodle print. Cut for an easy oversized fit and designed to be worn together or mixed into everyday rotation.", price: 120, image: "/doodle hoodie set.jpg", secondaryImage: "/doodle hoodie worn.jpg", sizes: apparelSizes },
];
