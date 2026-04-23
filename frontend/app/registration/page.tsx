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
        console.log(formData)
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
                    <CardAction>
                        <Button variant="link">Log In</Button>
                    </CardAction>
                </CardHeader>
                {/* <form onSubmit={handleRegister}> */}
                <CardContent className="">
                    <Form onSubmit={handleRegister} className="w-full grid grid-cols-2 grid-rows-6 gap-3">
                        <Field name="username" className='col-span-2'>
                            <FieldLabel>
                                Username <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input placeholder="john _doe" required type="text" onChange={handleChange} />
                            <FieldError>Please enter a valid name.</FieldError>
                        </Field>

                        <Field name="email" className='col-span-2 row-start-2'>
                            <FieldLabel>
                                Email <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input placeholder="john@example.com" required type="email" onChange={handleChange} />
                            <FieldError>Please enter a valid email.</FieldError>
                        </Field>

                        <Field name="password" className='row-start-3'>
                            <FieldLabel>
                                Password <span className="text-destructive">*</span>
                            </FieldLabel>
                            <Input placeholder="Create a password" required type="password" onChange={handleChange} />
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
                            <Input placeholder="John" type="text" onChange={handleChange} />
                            {/* <FieldError>Please enter a valid email.</FieldError> */}
                        </Field>

                        <Field name="last_name" className='row-start-4'>
                            <FieldLabel>
                                Last Name <span className="text-foreground/70">(Optional)</span>
                            </FieldLabel>
                            <Input placeholder="Doe" type="text" onChange={handleChange} />
                            {/* <FieldError>Please enter a valid email.</FieldError> */}
                        </Field>

                        <Field name="phone" className='col-span-2'>
                            <FieldLabel>
                                Phone <span className="text-foreground/70">(Optional)</span>
                            </FieldLabel>
                            <Input placeholder="+1 (555) 123-4567" type='tel' onChange={handleChange} />
                            {/* <FieldError>Please enter a valid email.</FieldError> */}
                        </Field>

                        <Field name="address" className='col-span-2 row-start-6'>
                            <FieldLabel>
                                Address <span className="text-foreground/70">(Optional)</span>
                            </FieldLabel>
                            <Input placeholder="123 Main St" type='text' onChange={handleChange} />
                            {/* <FieldError>Please enter a valid email.</FieldError> */}
                        </Field>
                    </Form>
                    {error && <div className="col-span-2 p-3 rounded-md text-sm bg-red-100 text-red-700">{error}</div>}
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button type="submit" className="w-full bg-accent hover:bg-foreground/30" variant='default' disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Register"}
                    </Button>
                    <p className="text-center text-slate-500">
                        Already have an account? <a href="/login" className="text-primary hover:underline">Log In</a>
                    </p>
                </CardFooter>
                {/* </form> */}
            </Card>
        </div>
    );
}