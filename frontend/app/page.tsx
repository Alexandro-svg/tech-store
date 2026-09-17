import Link from "next/link";

import { CarouselNewProducts } from "@/components/carousel-new-products";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { backendApiUrl } from "@/lib/api";

export const dynamic = "force-dynamic";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string | null;
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${backendApiUrl}/api/products/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <CarouselNewProducts />
      <section className="p-10">
        <h1 className="text-3xl mb-5">Popular products</h1>
        <div className="flex justify-start gap-5">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}/`}
              className="relative w-full max-w-60"
            >
              <Card className="w-full pt-0">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full object-cover"
                  />
                ) : null}
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardFooter className="text-xl font-bold tracking-wider">
                  {product.price} грн
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
