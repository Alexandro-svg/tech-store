"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // STEP 2: Получение токена (Get Token)
            const response = await fetch("http://localhost:8000/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Action: Сохрани полученный access в localStorage
                localStorage.setItem("access_token", data.access);

                // Optional: Store refresh token if you plan to use the refresh logic later
                localStorage.setItem("refresh_token", data.refresh);

                // Redirect to the profile page (SupportPage)
                router.push("/profile");
            } else {
                setError(data.detail || "Invalid username or password.");
            }
        } catch (err) {
            setError("Connection failed. Ensure the backend is running at localhost:8000.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Username</label>
                            <input
                                name="username"
                                type="text"
                                required
                                value={formData.username}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                                onChange={handleChange}
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-md text-sm bg-red-100 text-red-700">
                                {error}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Authenticating..." : "Login"}
                        </Button>
                        <p className="text-xs text-center text-slate-500">
                            Don't have an account? <a href="/register" className="text-primary hover:underline">Sign Up</a>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}