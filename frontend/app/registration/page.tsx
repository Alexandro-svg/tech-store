"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardAction, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
    let [passwordConfirm, setPasswordConfirm] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const passwordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(e.target.value)
        passwordConfirm === formData.password ? console.log('Passwords match') : console.log('Passwords dont match')
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // STEP 1: Регистрация (Sign Up)
            const response = await fetch("http://localhost:8000/api/users/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // After successful registration, send user to login
                console.log('sent')
                router.push("/login");
            } else {
                const data = await response.json();
                setError(data.detail || "Registration failed. Please check your data.");
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
                    {/* <CardAction>
                        <Button variant="link" className="text-foreground/70">Log In</Button>
                    </CardAction> */}
                </CardHeader>
                {/* <form onSubmit={handleRegister}> */}
                <CardContent className="">
                    <Form onSubmit={handleRegister} className="w-full grid grid-cols-2 grid-rows-7 gap-2">
                        <Field name="username" className='col-span-2'>
                            <FieldLabel>
                                Username <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input placeholder="john_doe" required type="text" value={formData.username} onChange={handleChange} />
                            <FieldError>Please enter a valid name.</FieldError>
                        </Field>

                        <Field name="email" className='col-span-2 row-start-2'>
                            <FieldLabel>
                                Email <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input placeholder="john@example.com" required type="email" value={formData.email} onChange={handleChange} />
                            <FieldError>Please enter a valid email.</FieldError>
                        </Field>

                        <Field name="password" className='row-start-3'>
                            <FieldLabel>
                                Password <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input placeholder="Create a password" required type="password" value={formData.password} onChange={handleChange} />
                            {/* <FieldError>Please enter a valid email.</FieldError> */}
                        </Field>


                        <Field name="password_confirm" className='row-start-3'>
                            <FieldLabel>
                                Confirm Password <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input placeholder="Create a password" required type="password" onChange={passwordConfirmation} />
                            {/* <FieldError>Please enter a valid email.</FieldError> */}
                        </Field>

                        <Field name="first_name" className='row-start-4'>
                            <FieldLabel>
                                First Name <span className="text-foreground/70">(Optional)</span>
                            </FieldLabel>
                            <Input placeholder="John" type="text" value={formData.first_name} onChange={handleChange} />
                            {/* <FieldError>Please enter a valid email.</FieldError> */}
                        </Field>

                        <Field name="last_name" className='row-start-4'>
                            <FieldLabel>
                                Last Name <span className="text-foreground/70">(Optional)</span>
                            </FieldLabel>
                            <Input placeholder="Doe" type="text" value={formData.last_name} onChange={handleChange} />
                            {/* <FieldError>Please enter a valid email.</FieldError> */}
                        </Field>

                        <Field name="phone" className='col-span-2'>
                            <FieldLabel>
                                Phone <span className="text-foreground/70">(Optional)</span>
                            </FieldLabel>
                            <Input placeholder="+1 (555) 123-4567" type='tel' value={formData.phone} onChange={handleChange} />
                            {/* <FieldError>Please enter a valid email.</FieldError> */}
                        </Field>

                        <Field name="address" className='col-span-2 row-start-6'>
                            <FieldLabel>
                                Address <span className="text-foreground/70">(Optional)</span>
                            </FieldLabel>
                            <Input placeholder="123 Main St" type='text' value={formData.address} onChange={handleChange} />
                            {/* <FieldError>Please enter a valid email.</FieldError> */}
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
                {/* </form> */}
            </Card>
        </div>
    );
}