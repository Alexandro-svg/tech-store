import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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

      {/* КАРУСЕЛЬ */}
      <section>
        <Carousel className="border-b border-t h-120 relative overflow-hidden">
          <CarouselContent className="relative w-full h-120">
            <CarouselItem className="flex justify-evenly items-center py-2 ">
              <div>
                <h1 className="text-8xl text-primary">MacBook Neo</h1>
                <p className="text-4xl mb-5 text-primary">
                  Amazing Mac. Surprising price.
                </p>
                <p className="text-xl mb-3.5 text-primary">
                  Now available. Starting from $599 or $49.91/mo. per month for 12 mo.
                </p>
                <Button variant='default' size='lg' className="text-2xl p-5 px-10">Buy</Button>
              </div>

              <div className="h-110 relative aspect-video overflow-hidden rounded-4xl">
                <Image
                  alt="Front"
                  fill
                  className="object-cover"
                  src="/media/products/macbook_neo/macbook-neo-color-unselect-202603-gallery-1.webp"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="ml-25 text-white" />
          <CarouselNext className="mr-25 text-white" />
        </Carousel>
      </section>

      {/* 🔥 PRODUCTS */}
      <section className="p-10">
        <h1 className="text-3xl mb-5">Products</h1>

        <div className="grid grid-cols-4 gap-5">
          {products.map((p) => (
            <div key={p.id} className="border p-4 rounded-2xl">

              <div className="h-40 relative mb-3">
                <Image
                  src={
                    p.image.startsWith("http")
                      ? p.image // Если это полная ссылка на сторонний ресурс
                      : `http://localhost:8000${p.image}` // Если это путь от Django (например /media/...)
                  }
                  alt={p.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              <h2 className="text-xl">{p.name}</h2>
              <p className="text-lg">${p.price}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}