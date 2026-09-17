import Link from "next/link";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type ProductCardProps = {
  product: {
    id: number;
    name: string;
    price: string;
    image: string | null;
  };
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}/`} className="relative w-full max-w-60">
      <Card className="w-full pt-0 hover:border">
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
        <CardFooter>{product.price} грн</CardFooter>
      </Card>
    </Link>
  );
}
