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
import { StringToBoolean } from "class-variance-authority/types";

// 🔥 тип продукта
type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
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

// 1. Update the type to Promise
export default async function ProductPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    // const { id } = await params;

    // const res = await fetch(`http://backend:8000/api/products/${id}/`, {
    //     cache: 'no-store'
    // });

    // if (!res.ok) {
    //     return <div className="p-10 text-center">Product not found (Error {res.status})</div>;
    // }

    // const product = await res.json();
    // console.log(product)

    return (
        <div className="p-10 flex gap-10">
            hello
            {/* <img
                src={product.image?.startsWith('http')
                    ? product.image
                    : `http://localhost:8000${product.image}`
                }
                alt={product.name}
                className="w-1/2 rounded-xl"
            />
            <div>
                <h1 className="text-4xl font-bold">{product.name}</h1>
                <p className="text-2xl text-green-600 mt-4">${product.price}</p>
                <p className="mt-6 text-gray-600 leading-relaxed">{product.description}</p>
            </div> */}
        </div>
    );
}