export type Product = { id: number; name: string; description: string; price: number; emoji: string };

export const products: Product[] = [
  { id: 1, name: "Ceramic mug", description: "Hand-finished stoneware", price: 18, emoji: "☕" },
  { id: 2, name: "Linen tote", description: "Everyday carry-all", price: 24, emoji: "👜" },
  { id: 3, name: "Desk plant", description: "A little green companion", price: 16, emoji: "🪴" }
];
