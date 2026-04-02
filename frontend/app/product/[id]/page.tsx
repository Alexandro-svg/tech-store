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

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = params;

    const res = await fetch(`http://localhost:8000/api/products/${id}/`);
    const product = await res.json();

    if (!product) return <div>Product not found</div>;

    return (
        <div className="p-10 flex gap-10">
            <img
                src={product.image.startsWith('http') ? product.image : `http://localhost:8000${product.image}`}
                alt={product.name}
                className="w-1/2 rounded-xl"
            />
            <div>
                <h1 className="text-4xl font-bold">{product.name}</h1>
                <p className="text-2xl text-green-600 mt-4">${product.price}</p>
                <p className="mt-6 text-gray-600">{product.description}</p>
                <button className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}