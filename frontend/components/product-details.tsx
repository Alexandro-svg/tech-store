"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
interface ProductDetailsProps {
    product: any;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const [value, setValue] = React.useState<number | null>(4);

    return (
        <div className="p-10">
            <section className="mx-auto">
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
                    <div className="bg-card rounded-2xl relative p-4 min-h-200 max-w-150 w-full overflow-hidden">
                        <PhotoProvider className="flex">
                            <PhotoView src={product.image}>
                                <img src={product.image} className="rounded-xl w-full m-auto cursor-pointer" alt={product.name} />
                            </PhotoView>
                        </PhotoProvider>
                        {/* <Image alt="Product Image" fill src='/media/products/macbook_neo/macbook-neo-color-unselect-202603-gallery-1.webp' className="object-cover"></Image> */}
                    </div>
                    <div className="bg-card flex-2 rounded-2xl py-10 px-12">
                        <h1 className="text-4xl font text-primary wrap-anywhere mb-4">{product.name}</h1>
                        <Box sx={{ '& > legend': { mt: 2 } }}>
                            {/* <Typography component="legend">Controlled</Typography> */}
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </Box>
                        <div className="bg-background my-8 rounded-xl p-5">
                            <h2 className="text-3xl font-bold mb-4">{product.price} грн</h2>
                            <div className="flex gap-2">
                                <Button variant="default" className="bg-accent px-5 font-bold tracking-wide">Add to Cart</Button>
                                <Button variant="outline" className="px-5 tracking-wide">Split Pay</Button>
                            </div>
                        </div>
                        <p>{product.description}</p>
                        <div className="bg-background mt-8 rounded-xl p-5">
                            <h2 className="text-3xl text-primary font-semibold mb-5">Specs</h2>
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
    )
}