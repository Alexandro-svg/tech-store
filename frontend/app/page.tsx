import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="">
        <Carousel className="border-b border-t h-120 relative overflow-hidden">
          <CarouselContent className="relative w-full h-120">
            <CarouselItem className="flex justify-evenly items-center py-2 ">
              <div className="">
                <h1 className="text-8xl text-primary">MacBook Neo</h1>
                <p className="text-4xl mb-5 text-primary">Amazing Mac. Surprising price.</p>
                <p className="text-xl mb-3.5 text-primary">Now available. Starting from $599 or $49.91/mo. per month for 12 mo.</p>
                <Button variant='default' size='lg' className="text-accent text-2xl p-5">Buy</Button>
              </div>
              <div className="h-110 max-h-110 relative aspect-video overflow-hidden rounded-4xl">
                <Image alt="Front Carousel Image"
                  fill
                  className="object-cover"
                  src='/media/products/macbook_neo/macbook-neo-color-unselect-202603-gallery-1.webp'
                ></Image>
              </div>
            </CarouselItem>
            <CarouselItem>...</CarouselItem>
            <CarouselItem>...</CarouselItem>
          </CarouselContent>
          <CarouselPrevious size='lg' className="ml-25 text-white" />
          <CarouselNext size='lg' className="mr-25 text-white" />
        </Carousel>
      </section>
      <section>
        <Carousel className="h-80 relative overflow-hidden">
          <CarouselContent className="relative w-full h-80 [&_*]:basis-1/6 px-40 py-5 flex gap-5">
            <CarouselItem className="bg-primary flex justify-between flex-col border p-4 rounded-3xl">
              <div className="h-50 max-h-110 relative aspect-video overflow-hidden rounded-xl flex-1">
                <Image alt="Categorie Carousel Image"
                  fill
                  className="object-cover"
                  src='/media/products/macbook_neo/macbook-neo-color-unselect-202603-gallery-1.webp'
                ></Image>
              </div>
              <div className="flex flex-col justify-evenly gap-3">
                <h1 className="text-4xl text-accent font-semibold">Apple</h1>
                <Button variant='default' size='lg' className="border-accent border-2 text-accent text-2xl p-5">Shop</Button>
              </div>
            </CarouselItem>
            <CarouselItem className="bg-primary flex justify-between flex-col border p-4 rounded-3xl">
              <div className="h-50 max-h-110 relative aspect-video overflow-hidden rounded-xl flex-1">
                <Image alt="Categorie Carousel Image"
                  fill
                  className="object-cover"
                  src='/media/products/macbook_neo/macbook-neo-color-unselect-202603-gallery-1.webp'
                ></Image>
              </div>
              <div className="flex flex-col justify-evenly gap-3">
                <h1 className="text-4xl text-accent font-semibold">Phones</h1>
                <Button variant='default' size='lg' className="border-accent border-2 text-accent text-2xl p-5">Shop</Button>
              </div>
            </CarouselItem>            <CarouselItem className="bg-primary flex justify-between flex-col border p-4 rounded-3xl">
              <div className="h-50 max-h-110 relative aspect-video overflow-hidden rounded-xl flex-1">
                <Image alt="Categorie Carousel Image"
                  fill
                  className="object-cover"
                  src='/media/products/macbook_neo/macbook-neo-color-unselect-202603-gallery-1.webp'
                ></Image>
              </div>
              <div className="flex flex-col justify-evenly gap-3">
                <h1 className="text-4xl text-accent font-semibold">Laptops</h1>
                <Button variant='default' size='lg' className="border-accent border-2 text-accent text-2xl p-5">Shop</Button>
              </div>
            </CarouselItem>            <CarouselItem className="bg-primary flex justify-between flex-col border p-4 rounded-3xl">
              <div className="h-50 max-h-110 relative aspect-video overflow-hidden rounded-xl flex-1">
                <Image alt="Categorie Carousel Image"
                  fill
                  className="object-cover"
                  src='/media/products/macbook_neo/macbook-neo-color-unselect-202603-gallery-1.webp'
                ></Image>
              </div>
              <div className="flex flex-col justify-evenly gap-3">
                <h1 className="text-4xl text-accent font-semibold">PC</h1>
                <Button variant='default' size='lg' className="border-accent border-2 text-accent text-2xl p-5">Shop</Button>
              </div>
            </CarouselItem>            <CarouselItem className="bg-primary flex justify-between flex-col border p-4 rounded-3xl">
              <div className="h-50 max-h-110 relative aspect-video overflow-hidden rounded-xl flex-1">
                <Image alt="Categorie Carousel Image"
                  fill
                  className="object-cover"
                  src='/media/products/macbook_neo/macbook-neo-color-unselect-202603-gallery-1.webp'
                ></Image>
              </div>
              <div className="flex flex-col justify-evenly gap-3">
                <h1 className="text-4xl text-accent font-semibold">Tablets</h1>
                <Button variant='default' size='lg' className="border-accent border-2 text-accent text-2xl p-5">Shop</Button>
              </div>
            </CarouselItem>            <CarouselItem className="bg-primary flex justify-between flex-col border p-4 rounded-3xl">
              <div className="h-50 max-h-110 relative aspect-video overflow-hidden rounded-xl flex-1">
                <Image alt="Categorie Carousel Image"
                  fill
                  className="object-cover"
                  src='/media/products/macbook_neo/macbook-neo-color-unselect-202603-gallery-1.webp'
                ></Image>
              </div>
              <div className="flex flex-col justify-evenly gap-3">
                <h1 className="text-4xl text-accent font-semibold">VR</h1>
                <Button variant='default' size='lg' className="border-accent border-2 text-accent text-2xl p-5">Shop</Button>
              </div>
            </CarouselItem>            <CarouselItem className="bg-primary flex justify-between flex-col border p-4 rounded-3xl">
              <div className="h-50 max-h-110 relative aspect-video overflow-hidden rounded-xl flex-1">
                <Image alt="Categorie Carousel Image"
                  fill
                  className="object-cover"
                  src='/media/products/macbook_neo/macbook-neo-color-unselect-202603-gallery-1.webp'
                ></Image>
              </div>
              <div className="flex flex-col justify-evenly gap-3">
                <h1 className="text-4xl text-accent font-semibold">Peripherals</h1>
                <Button variant='default' size='lg' className="border-accent border-2 text-accent text-2xl p-5">Shop</Button>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious size='lg' className="ml-25 text-white" />
          <CarouselNext size='lg' className="mr-25 text-white" />
        </Carousel>
      </section>
    </div>
  );
}
