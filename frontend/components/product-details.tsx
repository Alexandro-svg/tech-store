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
    product: any;
}

export function ProductDetails({ product }: ProductDetailsProps) {
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
                            <h2 className="text-3xl font-bold mb-4 tracking-wider">{product.price} грн</h2>
                            <div className="flex gap-2">
                                <Button variant="default" className="bg-accent px-5 font-bold tracking-wide">Add to Cart</Button>
                                <Button variant="secondary" className="px-5 font-bold tracking-wide">Trade In</Button>
                                <Button variant="outline" className="px-5 tracking-wide">Split Pay</Button>
                            </div>
                        </div>
                        <div className="bg-background mt-8 rounded-xl p-5">
                            <div className="mb-7">
                                <h2 className="text-3xl text-primary font-semibold mb-5">Specs</h2>
                                <div className="mb-3">
                                    <h3 className="text-xl text-primary">Color: <b>Silver</b>
                                        <div>
                                            <Radio
                                                {...controlProps('a')}
                                                sx={{
                                                    color: '#e6e6e6',
                                                    '&.Mui-checked': {
                                                        color: '#e6e6e6',
                                                    },
                                                }}
                                            />
                                            <Radio
                                                {...controlProps('b')}
                                                sx={{
                                                    color: '#f77e39',
                                                    '&.Mui-checked': {
                                                        color: '#f77e39',
                                                    },
                                                }}
                                            />
                                            <Radio
                                                {...controlProps('c')}
                                                sx={{
                                                    color: '#434f7b',
                                                    '&.Mui-checked': {
                                                        color: '#434f7b',
                                                    },
                                                }}
                                            />
                                        </div>
                                    </h3>
                                </div>
                                <div className="">
                                    <h3 className="text-xl text-primary">Storage: <b>256GB</b>
                                        <RadioGroup defaultValue="r-1" className='mt-3 ml-2'>
                                            <Label className="flex cursor-pointer items-start rounded-lg border p-3 hover:bg-accent/50 has-data-checked:border-card/48 has-data-checked:bg-accent">
                                                <CossRadio value="r-1" />
                                                <div className="flex flex-col gap-1">
                                                    <p>256GB</p>
                                                </div>
                                            </Label>
                                            <Label className="flex cursor-pointer items-start rounded-lg border p-3 hover:bg-accent/50 has-data-checked:border-card/48 has-data-checked:bg-accent">
                                                <CossRadio value="r-2" />
                                                <div className="flex flex-col gap-1">
                                                    <p>512GB</p>
                                                </div>
                                            </Label>
                                            <Label className="flex cursor-pointer items-start rounded-lg border p-3 hover:bg-accent/50 has-data-checked:border-card/48 has-data-checked:bg-accent">
                                                <CossRadio value="r-3" />
                                                <div className="flex flex-col gap-1">
                                                    <p>1TB</p>
                                                </div>
                                            </Label>
                                            <Label className="flex cursor-pointer items-start rounded-lg border p-3 hover:bg-accent/50 has-data-checked:border-card/48 has-data-checked:bg-accent">
                                                <CossRadio value="r-4" />
                                                <div className="flex flex-col gap-1">
                                                    <p>2TB</p>
                                                </div>
                                            </Label>
                                        </RadioGroup>
                                    </h3>
                                </div>
                            </div>
                            <div className="">
                                <h2 className="text-3xl text-primary font-semibold mb-5">Description</h2>
                                {/* <p>{product.description}</p> */}
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi ea, assumenda temporibus optio at cum quae quo quis repellat iusto quasi impedit rem? Culpa facere eaque libero praesentium? Laboriosam, perspiciatis!</p>
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