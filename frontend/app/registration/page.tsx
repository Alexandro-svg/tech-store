"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error when user starts typing again
        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const validate = () => {
        const errors: Record<string, string> = {};

        if (formData.username.length < 3) errors.username = "Username must be at least 3 characters long.";
        if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Please enter a valid email.";
        if (formData.password.length < 6) errors.password = "Password must be at least 6 characters.";
        if (formData.password !== passwordConfirm) errors.password_confirm = "Passwords do not match.";

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const passwordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(e.target.value);
        if (validationErrors.password_confirm) {
            setValidationErrors(prev => {
                const next = { ...prev };
                delete next.password_confirm;
                return next;
            });
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // --- FIX 1: Run validation before submitting ---
        if (!validate()) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:8000/api/users/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                router.push("/login");
            } else {
                // --- Logic to catch "User already exists" ---
                const serverMsg = data.detail || data.username?.[0] || data.message || "";

                if (serverMsg.toLowerCase().includes("username") || response.status === 409) {
                    setValidationErrors(prev => ({
                        ...prev,
                        username: "This username is already taken. Please choose a different one."
                    }));
                } else {
                    setError(serverMsg || "Registration failed. Please check your data.");
                }
            }
        } catch (err) {
            setError("Connection failed. Ensure the backend is running at localhost:8000.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-lg shadow-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form onSubmit={handleRegister} className="w-full grid grid-cols-2 grid-rows-7 gap-2 text-orange-50">

                        <Field name="username" className='col-span-2' invalid={!!validationErrors.username}>
                            <FieldLabel>
                                Username <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                placeholder="john_doe"
                                required
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            {validationErrors.username && (
                                <span className="text-sm text-destructive mt-1">
                                    {validationErrors.username}
                                </span>
                            )}
                        </Field>

                        <Field name="email" className='col-span-2 row-start-2' invalid={!!validationErrors.email}>
                            <FieldLabel>
                                Email <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                placeholder="john@example.com"
                                required
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <FieldError>Please enter a valid email.</FieldError>
                            {validationErrors.email && (
                                <span className="text-sm text-destructive mt-1">
                                    {validationErrors.email}
                                </span>
                            )}
                        </Field>

                        <Field name="password" className='row-start-3' invalid={!!validationErrors.password}>
                            <FieldLabel>
                                Password <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                placeholder="Create a password"
                                required
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {validationErrors.password && (
                                <span className="text-sm text-destructive mt-1">
                                    {validationErrors.password}
                                </span>
                            )}
                        </Field>

                        <Field name="password_confirm" className='row-start-3' invalid={!!validationErrors.password_confirm}>
                            <FieldLabel>
                                Confirm Password <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input
                                placeholder="Confirm your password"
                                required
                                type="password"
                                value={passwordConfirm || ""}
                                onChange={passwordConfirmation}
                            />
                            {validationErrors.password_confirm && (
                                <span className="text-sm text-destructive mt-1">
                                    {validationErrors.password_confirm}
                                </span>
                            )}
                        </Field>

                        <Field name="first_name" className='row-start-4'>
                            <FieldLabel>
                                First Name <span className="text-foreground/70">(Optional)</span>
                            </FieldLabel>
                            <Input placeholder="John" type="text" value={formData.first_name} onChange={handleChange} />
                        </Field>

                        <Field name="last_name" className='row-start-4'>
                            <FieldLabel>
                                Last Name <span className="text-foreground/70">(Optional)</span>
                            </FieldLabel>
                            <Input placeholder="Doe" type="text" value={formData.last_name} onChange={handleChange} />
                        </Field>

                        <Field name="phone" className='col-span-2'>
                            <FieldLabel>
                                Phone <span className="text-foreground/70">(Optional)</span>
                            </FieldLabel>
                            <Input placeholder="+1 (555) 123-4567" type='tel' value={formData.phone} onChange={handleChange} />
                        </Field>

                        <Field name="address" className='col-span-2 row-start-6'>
                            <FieldLabel>
                                Address <span className="text-foreground/70">(Optional)</span>
                            </FieldLabel>
                            <Input placeholder="123 Main St" type='text' value={formData.address} onChange={handleChange} />
                        </Field>

                        <Button type="submit" className="w-full col-span-2 row-start-7 bg-accent hover:bg-foreground/30" variant='default' disabled={isLoading}>
                            {isLoading ? "Creating Account..." : "Register"}
                        </Button>

                        {error && <div className="col-span-2 p-3 rounded-md text-sm bg-red-100 text-red-700">{error}</div>}
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <p className="text-center text-slate-500">
                        Already have an account? <a href="/login" className="text-primary hover:underline">Log In</a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}