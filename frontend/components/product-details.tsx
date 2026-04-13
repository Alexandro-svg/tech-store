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
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import { Label } from "@/components/ui/label";
import { Radio as CossRadio, RadioGroup } from "@/components/ui/radio-group";

interface ProductDetailsProps {
    p: any;
    id: number;
    color: string;
    storage: string;
    price: string;
    image: string;
    stock: number;
}

export function ProductDetails({ p }: ProductDetailsProps) {
    const [value, setValue] = React.useState<number | null>(4);

    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const controlProps = (item: string) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button',
        inputProps: { 'aria-label': item },
    });

    const [selectedColor, setSelectedColor] = React.useState(p.variants[0].color);
    const [selectedStorage, setSelectedStorage] = React.useState(p.variants[0].storage);

    const activeVariant = p.variants.find(
        (v: any) => v.color === selectedColor && v.storage === selectedStorage
    ) || p.variants[0];

    const uniqueColors = [...new Set(p.variants.map((v: any) => v.color))];
    const uniqueStorage = [...new Set(p.variants.map((v: any) => v.storage))];

    const colorHexMap: Record<string, string> = {
        "Silver": "#e6e6e6",
        "Cosmic Orange": "#f77e39",
        "Deep Blue": "#434f7b",
    };

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
                            <PhotoView src={activeVariant.image}>
                                <img src={activeVariant.image} className="rounded-xl w-full m-auto cursor-pointer" alt={p.name} />
                            </PhotoView>
                        </PhotoProvider>
                        {/* <Image alt="Product Image" fill src='/media/products/macbook_neo/macbook-neo-color-unselect-202603-gallery-1.webp' className="object-cover"></Image> */}
                    </div>
                    <div className="bg-card flex-2 rounded-2xl py-10 px-12">
                        <h1 className="text-4xl font text-primary wrap-anywhere mb-4">{p.name}</h1>
                        <Box sx={{ '& > legend': { mt: 2 } }}>
                            {/* <Typography component="legend">Controlled</Typography> */}
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                sx={{
                                    '& .MuiRating-iconEmpty': {
                                        color: 'color-mix(in srgb, var(--foreground), transparent 40%)',
                                    },
                                }}
                            />
                        </Box>
                        <div className="bg-background my-8 rounded-xl p-5">
                            <div className="flex justify-between">
                                <h2 className="text-3xl font-bold mb-4 tracking-wider">{activeVariant.price} грн</h2>
                                <p className="text-foreground/60"><b className="text-foreground/90">{activeVariant.stock}</b> in stock</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="default" className="bg-accent px-5 font-bold tracking-wide hover:bg-accent/80">Add to Cart</Button>
                                <Button variant="secondary" className="px-5 font-bold tracking-wide">Trade In</Button>
                                <Button variant="outline" className="px-5 tracking-wide">Split Pay</Button>
                            </div>
                        </div>
                        <div className="bg-background mt-8 rounded-xl p-5">
                            <div className="mb-7">
                                <h2 className="text-3xl text-primary font-semibold mb-5">Specs</h2>
                                <div className="mb-3">
                                    <h3 className="text-xl text-primary">Color: <b>{selectedColor}</b>
                                        <div className="flex items-center">
                                            {uniqueColors.map((colorName) => {
                                                const hex = colorHexMap[colorName as string] || "#ccc";
                                                return (
                                                    <Radio
                                                        key={colorName as string}
                                                        checked={selectedColor === colorName}
                                                        onChange={() => setSelectedColor(colorName as string)}
                                                        value={colorName}
                                                        name="color-radio-button"
                                                        sx={{
                                                            color: hex,
                                                            '&.Mui-checked': {
                                                                color: hex,
                                                            },
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 32,
                                                            },
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </h3>
                                </div>
                                <div className="">
                                    <h3 className="text-xl text-primary">Storage: <b>{selectedStorage.length > 1 ? `${selectedStorage}GB` : `${selectedStorage}TB`}</b>
                                        <RadioGroup
                                            value={selectedStorage}
                                            onValueChange={(val) => setSelectedStorage(val)}
                                            className="mt-3 ml-2"
                                        >
                                            {uniqueStorage.map((size) => (
                                                <Label
                                                    key={size as string}
                                                    className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 p-3 transition-all hover:bg-accent/50 ${selectedStorage === size
                                                        ? "border-accent bg-accent"
                                                        : ""
                                                        }`}
                                                >
                                                    <CossRadio value={size as string} id={`size-${size}`} />
                                                    <div className="flex flex-col gap-1">
                                                        <p className="font-medium">
                                                            {/* Logic to display GB for 256/512 and TB for 1/2 */}
                                                            {(size as string).length > 1 ? `${size}GB` : `${size}TB`}
                                                        </p>
                                                    </div>
                                                </Label>
                                            ))}
                                        </RadioGroup>
                                    </h3>
                                </div>
                            </div>
                            <div className="">
                                <h2 className="text-3xl text-primary font-semibold mb-5">Description</h2>
                                {/* <p>{product.description}</p> */}
                                <p>{p.description}</p>
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