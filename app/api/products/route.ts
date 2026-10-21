import { NextResponse } from "next/server";
import { products } from "../../../products";

export async function GET() {
  return NextResponse.json(products);
}
