"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
// import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

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
            <section className="max-w-400 mx-auto">
                <div className="flex bg-card p-2 mb-3 rounded-2xl sticky">
                    <Link href="">
                        <Button variant="link">Overview</Button>
                    </Link>
                    <Link href=''>
                        <Button variant="link">Specs</Button>
                    </Link>
                    <Link href=''>
                        <Button variant="link">Description</Button>
                    </Link>
                    <Link href=''>
                        <Button variant="link">Stock</Button>
                    </Link>
                </div>
                <div className="flex justify-between gap-7">
                    <div className="bg-card flex-1 rounded-2xl relative min-h-200 overflow-hidden">
                        <PhotoProvider>
                            <PhotoView src="/media/products/macbook_neo/macbook-neo-color-unselect-202603-gallery-1.webp">
                                <img src="/media/products/macbook_neo/macbook-neo-color-unselect-202603-gallery-1.webp" alt="Product Image" />
                            </PhotoView>
                        </PhotoProvider>
                        {/* <Image alt="Product Image" fill src='/media/products/macbook_neo/macbook-neo-color-unselect-202603-gallery-1.webp' className="object-cover"></Image> */}
                    </div>
                    <div className="bg-card flex-1 rounded-2xl py-10 px-12">
                        <h1 className="text-4xl font text-primary wrap-anywhere mb-2">MacBook Neo 13 Retina, Indigo, 256GB, 6 CPU / 5 GPU, 8GB RAM with Apple A18 Pro (2026)</h1>
                        {/* <Box sx={{ '& > legend': { mt: 2 } }}>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </Box> */}
                        <div className="bg-background mt-8 rounded-xl p-5">
                            <h2 className="text-3xl text-primary font-semibold mb-5">Options</h2>
                            <div className="">
                                <h3 className="text-xl text-primary font-medium">Color:</h3>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

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