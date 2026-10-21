# ecommerce-project

A tiny Next.js + TypeScript storefront starter. It uses sample product data only; no database or payment setup is included.

## Run in VS Code
1. Install Node.js (18.17 or newer) and unzip this folder.
2. In VS Code, choose **File → Open Folder** and select `ecommerce-project`.
3. Open **Terminal → New Terminal**, then run:
   ```bash
   npm install
   npm run dev
   ```
4. Open http://localhost:3000 in your browser. Stop the server with `Ctrl+C`.

Edit `products.ts` to change the sample products. The demo API is at `/api/products`. Copy `.env.example` to `.env.local` only if you need to add your own environment settings. Do not put real secrets in client-side variables.
