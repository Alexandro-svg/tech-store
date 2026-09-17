// "use client";

import { ProductDetails } from "@/components/product-details";
import { backendApiUrl } from "@/lib/api";

export default async function ProductPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const res = await fetch(`${backendApiUrl}/api/products/${id}/`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return <div className="p-10 text-center">Product not found (Error {res.status})</div>;
    }
    const p = await res.json();

    return (
        <ProductDetails p={p} />
    );
}
