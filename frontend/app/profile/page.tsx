"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import the router for redirection
import { HouseIcon, PanelsTopLeftIcon, SettingsIcon } from "lucide-react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditProfilePopup } from "@/components/edit-profile";

type User = {
    id: number;
    username: string;
    email: string;
    phone?: string;
    birth?: string;
    first_name?: string;
    last_name?: string;
    address?: string;
};

type Product = {
    id: number;
    name: string;
    price: string;
};

export default function SupportPage() {
    const router = useRouter(); // Initialize the router
    const [user, setUser] = useState<User | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        router.push("/login");
    };

    useEffect(() => {
        const fetchData = async () => {
            let token = localStorage.getItem("access_token");
            const refreshToken = localStorage.getItem("refresh_token");

            // REDIRECT LOGIC: If no tokens exist at all, go to login
            if (!token && !refreshToken) {
                router.push("/login");
                return;
            }

            const getHeaders = (t: string) => ({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${t}`,
            });

            try {
                // 1. Initial attempt
                let userRes = await fetch("http://localhost:8000/api/users/me/", {
                    headers: getHeaders(token || "")
                });

                // 2. REFRESH LOGIC: If access token is expired but refresh token exists
                if (userRes.status === 401 && refreshToken) {
                    const refreshRes = await fetch("http://localhost:8000/api/token/refresh/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ refresh: refreshToken }),
                    });

                    if (refreshRes.ok) {
                        const data = await refreshRes.json();
                        token = data.access;
                        localStorage.setItem("access_token", token as string);

                        // Retry original request
                        userRes = await fetch("http://localhost:8000/api/users/me/", {
                            headers: getHeaders(token as string)
                        });
                    } else {
                        // Refresh token is also dead (expired or Docker wiped the user)
                        localStorage.clear();
                        router.push("/login");
                        return;
                    }
                }

                if (userRes.ok) {
                    const userData = await userRes.json();
                    setUser(userData);

                    const prodRes = await fetch("http://localhost:8000/api/products/", {
                        headers: getHeaders(token as string)
                    });
                    if (prodRes.ok) setProducts(await prodRes.json());
                } else {
                    // Fallback if userRes is still not okay after refresh attempt
                    router.push("/login");
                }

            } catch (err) {
                console.error("Connection error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    // While checking tokens and fetching, show a clean loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg animate-pulse">Checking authentication...</p>
            </div>
        );
    }

    return (
        <div className="p-10">
            {isEditOpen && (
                <EditProfilePopup
                    currentUser={user}
                    onClose={() => setIsEditOpen(false)}
                    onUpdateSuccess={(updatedUser) => setUser(updatedUser)}
                />
            )}

            <Tabs
                className="w-full flex-row"
                defaultValue="tab-1"
                orientation="vertical"
            >
                <div className="border-s">
                    <TabsList variant="underline" className=''>
                        <TabsTab value="tab-1">
                            <HouseIcon aria-hidden="true" />
                            Overview
                        </TabsTab>
                        <TabsTab value="tab-2">
                            <PanelsTopLeftIcon aria-hidden="true" />
                            Orders
                        </TabsTab>
                        <TabsTab value="tab-3">
                            <SettingsIcon aria-hidden="true" />
                            Cart
                        </TabsTab>
                        <TabsTab value="tab-4">
                            <SettingsIcon aria-hidden="true" />
                            Wishlist
                        </TabsTab>
                        <TabsTab value="tab-5">
                            <SettingsIcon aria-hidden="true" />
                            Security
                        </TabsTab>
                        <TabsTab value="tab-6">
                            <SettingsIcon aria-hidden="true" />
                            Return Policy
                        </TabsTab>
                        <TabsTab value="tab-7">
                            <SettingsIcon aria-hidden="true" />
                            Viewed Products
                        </TabsTab>
                        <TabsTab value="tab-8">
                            <SettingsIcon aria-hidden="true" />
                            Reviews
                        </TabsTab>
                        <TabsTab value="tab-9">
                            <SettingsIcon aria-hidden="true" />
                            Tracking
                        </TabsTab>
                        <TabsTab value="tab-10">
                            <SettingsIcon aria-hidden="true" />
                            Digital Invoices
                        </TabsTab>
                    </TabsList>
                </div>
                <TabsPanel value="tab-1" className='px-20'>
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="py-6 px-8 col-span-2">
                            <div className="bg-card w-full rounded-2xl col-span-2">
                                <div className="flex justify-between items-center mb-7">
                                    <div className="flex gap-4">
                                        <div className="">
                                            <div className="bg-background aspect-square w-20 h-20 flex items-center justify-center rounded-xl px-3 overflow-hidden">
                                                <img src="/logo_icon.png" alt="Profile Picture" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h1 className="text-foreground text-4xl font-bold leading-tight">
                                                {/* If first_name has actual text, show full name. Otherwise, show username. */}
                                                {user?.first_name && user.first_name.trim() !== ""
                                                    ? `${user.first_name} ${user.last_name}`
                                                    : (user?.username || "Guest User")
                                                }
                                            </h1>
                                            <p className="text-foreground/70 text-xl">{user?.email || "No email found"}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="mb-2">
                                            <b>Delivery address</b>
                                            <p className="text-foreground/70">{user?.address || "Not provided"}</p>
                                        </div>
                                        <div className="mb-2">
                                            <b>Phone number:</b>
                                            <p className="text-foreground/70">{user?.phone || "Not provided"}</p>
                                        </div>
                                        <div className="">
                                            <b>Date of birth</b>
                                            <p className="text-foreground/70">{user?.birth || "Not provided"}</p>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="default" className="bg-accent cursor-pointer text-primary px-6 mr-6" onClick={() => setIsEditOpen(true)}>Edit Profile</Button>
                                <Button variant="link" className="cursor-pointer text-foreground/70" onClick={handleLogout}>Log Out</Button>
                            </div>
                        </Card>
                        <Card className="row-start-2 py-6 px-8">
                            <h1 className="text-3xl font-semibold mb-0">Recent Orders</h1>
                            <div className="">
                                {products.length > 0 ? (
                                    products.map((p) => (
                                        <div key={p.id} className="flex justify-between border-b py-2 pb-1">
                                            <span className="font-bold">{p.name}</span>
                                            <span className="font-bold">${p.price}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-foreground/70 mt-2 italic">No orders found.</p>
                                )}
                            </div>
                        </Card>
                        <Card className="row-start-2 py-6 px-8">
                            <h1 className="text-3xl font-semibold mb-0">Wishlist</h1>
                            <div className="">
                                <p className="text-foreground/70 mt-2">No products in your Wishlist yet</p>
                            </div>
                        </Card>
                    </div>
                </TabsPanel>
                <TabsPanel value="tab-2">
                    <p className="p-4 text-center text-muted-foreground text-xs">
                        Orders content
                    </p>
                </TabsPanel>
                <TabsPanel value="tab-3">
                    <p className="p-4 text-center text-muted-foreground text-xs">
                        Settings content
                    </p>
                </TabsPanel>
            </Tabs>
        </div>
    );
}