import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CarouselNewProducts } from "@/components/carousel-new-products";
import Link from "next/link";

// 🔥 тип продукта
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

// 🔥 fetch с типом
async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://backend:8000/api/products/", { cache: "no-store" });
  if (!res.ok) {
    console.log("API ERROR");
    return [];
  }

  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col">

      <section>
        <CarouselNewProducts />
      </section>

      <section className="p-10">
        <h1 className="text-3xl mb-5">Products</h1>

        <div className="flex justify-start gap-5">
          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.id}/`} className="relative w-full max-w-60">
              <Card className="w-full pt-0">
                <div className="absolute inset-0 z-30" />
                <img
                  src={
                    p.image.startsWith("http")
                      ? p.image
                      : `http://localhost:8000${p.image}`
                  }
                  alt={p.name}
                  className="relative z-20 w-full object-cover"
                />
                <CardHeader>
                  <CardTitle>{p.name}</CardTitle>
                </CardHeader>
                <CardFooter>{p.price} грн</CardFooter>
              </Card>
            </Link>

            // <Card className="relative mx-auto w-full h-full max-w-sm pt-0">
            //   <div className="absolute inset-0 z-30 aspect-video">
            //     <Image
            //       src={
            //         p.image.startsWith("http")
            //           ? p.image // Если это полная ссылка на сторонний ресурс
            //           : `http://localhost:8000${p.image}` // Если это путь от Django (например /media/...)
            //       }
            //       alt={p.name}
            //       fill
            //       className="object-contain rounded-xl"
            //     />
            //   </div>
            //   <CardHeader>
            //     <CardAction>
            //       <Badge variant="secondary">Featured</Badge>
            //     </CardAction>
            //     <CardTitle className="mx-auto">Phones</CardTitle>
            //     <CardDescription>
            //       A practical.
            //     </CardDescription>
            //   </CardHeader>
            //   <CardFooter>
            //     <Button className="w-full mx-auto text-xl p-5">Shop</Button>
            //   </CardFooter>
            // </Card>
            // <div key={p.id} className="border p-4 rounded-2xl max-w-55">
            //   <div className="h-40 relative mb-3">
            //     <Image
            //       src={
            //         p.image.startsWith("http")
            //           ? p.image // Если это полная ссылка на сторонний ресурс
            //           : `http://localhost:8000${p.image}` // Если это путь от Django (например /media/...)
            //       }
            //       alt={p.name}
            //       fill
            //       className="object-contain rounded-xl"
            //     />
            //   </div>
            //   <h2 className="text-xl">{p.name}</h2>
            //   <p className="text-lg">${p.price}</p>
            // </div>
          ))}
        </div>
      </section>

    </div>
  );
}