import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export const CarouselNewProducts = () => {
    return (
        <Carousel className="border-b h-120 relative overflow-hidden">
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
    )
}