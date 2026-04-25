"use client";

import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogPopup,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerPanel,
    DrawerPopup,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Field, FieldLabel } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FORM_TITLE = "Edit profile";
const FORM_DESCRIPTION =
    "Make changes to your profile here. Click save when you're done.";
// const TRIGGER_LABEL = "Open";
const CANCEL_LABEL = "Cancel";
const SAVE_LABEL = "Save";

export const EditProfilePopup = ({
    onClose,
    currentUser,
    onUpdateSuccess
}: {
    onClose: () => void;
    currentUser?: any;
    onUpdateSuccess?: (updatedUser: any) => void
}) => {
    const isMobile = useMediaQuery("max-md");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [formData, setFormData] = useState({
        first_name: currentUser?.first_name || "",
        last_name: currentUser?.last_name || "",
        username: currentUser?.username || "",
        password: "",
        email: currentUser?.email || "",
        phone: currentUser?.phone || "",
        address: currentUser?.address || "",
    });

    // This function handles the UI library's internal close signal
    const handleOpenChange = (open: boolean) => {
        if (!open) onClose();
    };

    const isPasswordMismatch = formData.password !== "" && formData.password !== passwordConfirm;

    const formFields = (
        <>
            <Field>
                <FieldLabel>First Name</FieldLabel>
                <Input
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    type="text"
                />
            </Field>
            <Field>
                <FieldLabel>Last Name</FieldLabel>
                <Input
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    type="text"
                />
            </Field>
            <Field>
                <FieldLabel>Username</FieldLabel>
                <Input
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    type="text"
                />
            </Field>
            <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    type="text"
                />
            </Field>
            <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    type="password"
                />
            </Field>
            <Field>
                <FieldLabel className={isPasswordMismatch ? "text-destructive" : ""}>
                    Confirm Password
                </FieldLabel>
                <Input
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    type="password"
                    className={isPasswordMismatch ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {isPasswordMismatch && (
                    <p className="text-xs text-destructive mt-1">Passwords do not match.</p>
                )}
            </Field>
            <Field>
                <FieldLabel>Phone</FieldLabel>
                <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    type="text"
                />
            </Field>
            <Field>
                <FieldLabel>Address</FieldLabel>
                <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    type="text"
                />
            </Field>
        </>
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isPasswordMismatch) {
            alert("Please ensure your passwords match.");
            return;
        }
        const { password: currentPasswordInput, ...otherData } = formData;
        const finalData = currentPasswordInput.trim() !== ""
            ? formData
            : otherData;

        const token = localStorage.getItem("access_token");

        try {
            const response = await fetch("http://localhost:8000/api/users/me/", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(finalData),
            });

            if (response.ok) {
                const data = await response.json();
                if (onUpdateSuccess) onUpdateSuccess(data); // Refresh the UI in SupportPage
                onClose();
            } else {
                const errorData = await response.json();
                alert(`Update failed: ${JSON.stringify(errorData)}`);
            }
        } catch (err) {
            console.error("Connection error:", err);
        }
    };

    if (isMobile) {
        return (
            <Drawer defaultOpen={true} onOpenChange={handleOpenChange}>
                <DrawerPopup showBar>
                    <DrawerHeader>
                        <DrawerTitle>{FORM_TITLE}</DrawerTitle>
                        <DrawerDescription>{FORM_DESCRIPTION}</DrawerDescription>
                    </DrawerHeader>
                    <Form className="contents">
                        <DrawerPanel className="grid gap-4" scrollable={false}>
                            {formFields}
                        </DrawerPanel>
                        <DrawerFooter>
                            <DrawerClose render={<Button variant="ghost" />}>
                                {CANCEL_LABEL}
                            </DrawerClose>
                            <Button type="submit">{SAVE_LABEL}</Button>
                        </DrawerFooter>
                    </Form>
                </DrawerPopup>
            </Drawer>
        );
    }

    return (
        <Dialog defaultOpen={true} onOpenChange={handleOpenChange}>
            <DialogPopup className="sm:max-w-sm bg-card text-foreground">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <Form className="contents">
                    <DialogPanel className="grid gap-4">{formFields}</DialogPanel>
                    <DialogFooter>
                        <DialogClose render={<Button variant="ghost" />}>
                            {CANCEL_LABEL}
                        </DialogClose>
                        <Button type="submit">{SAVE_LABEL}</Button>
                    </DialogFooter>
                </Form>
            </DialogPopup>
        </Dialog>
    );
};