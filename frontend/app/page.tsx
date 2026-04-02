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
import { Badge } from "@/components/ui/badge";

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

        <div className="flex justify-start gap-5">
          {products.map((p) => (
            <a href="/" className="relative w-full max-w-60">
              <Card className="w-full pt-0 hover:border">
                <div className="absolute inset-0 z-30" />
                <img
                  src={
                    p.image.startsWith("http")
                      ? p.image // Если это полная ссылка на сторонний ресурс
                      : `http://localhost:8000${p.image}` // Если это путь от Django (например /media/...)
                  }
                  alt={p.name}
                  className="relative z-20 w-full object-cover"
                />
                <CardHeader>
                  {/* <CardAction>
                  <Badge variant="secondary">Featured</Badge>
                </CardAction> */}
                  <CardTitle>{p.name}</CardTitle>
                  {/* <CardDescription>
                  A practical talk on component APIs, accessibility, and shipping
                  faster.
                </CardDescription> */}
                </CardHeader>
              </Card>
            </a>
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