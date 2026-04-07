// "use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
// import 'react-photo-view/dist/react-photo-view.css';
// import { PhotoProvider, PhotoView } from 'react-photo-view';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { ProductDetails } from "@/components/product-details";

// 🔥 тип продукта
type Product = {
    id: number;
    name: string;
    price: string;
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
    const { id } = await params;

    const res = await fetch(`http://backend:8000/api/products/${id}/`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return <div className="p-10 text-center">Product not found (Error {res.status})</div>;
    }
    const product = await res.json();

    return (
        <ProductDetails product={product} />
    );
}