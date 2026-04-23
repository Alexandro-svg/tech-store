"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardAction, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-md shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Log In</CardTitle>
                </CardHeader>

                <Form onSubmit={handleLogin} className="w-full">
                    <CardContent className="space-y-4 mb-10">
                        <Field name="username" className='col-span-2'>
                            <FieldLabel>
                                Username <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input value={formData.username} placeholder="john _doe" required type="text" onChange={handleChange} />
                        </Field>

                        <Field name="password" className='row-start-3'>
                            <FieldLabel>
                                Password <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input placeholder="Create a password" required type="password" value={formData.password} onChange={handleChange} />
                            {/* <FieldError>Please enter a valid email.</FieldError> */}
                        </Field>

                        {error && (
                            <div className="p-3 rounded-md text-sm bg-red-100 text-red-700">
                                {error}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3">
                        <Button
                            type="submit"
                            className="w-full bg-accent hover:bg-foreground/30"
                            disabled={isLoading}
                        >
                            {isLoading ? "Authenticating..." : "Login"}
                        </Button>
                        <p className="text-center text-slate-500">
                            Don't have an account? <a href="/registration" className="text-primary hover:underline">Sign Up</a>
                        </p>
                    </CardFooter>
                </Form>
            </Card>
        </div>
    );
}