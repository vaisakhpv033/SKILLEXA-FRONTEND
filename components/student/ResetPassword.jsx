'use client';
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Password validation schema
const passwordSchema = z.object({
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Must contain at least one number" })
        .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export default function ResetPasswordForm({TabsTrigger}) {
    const [step, setStep] = useState("password");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [password, setPassword] = useState({});

    // Password form
    const passwordForm = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    });

    // OTP form
    const otpForm = useForm({
        resolver: zodResolver(z.object({ otp: z.string().length(6, { message: "OTP must be 6 digits" }) })),
        defaultValues: { otp: "" },
    });

    // Handle OTP request
    const requestOTP = async (values) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/student/reset-password/otp", { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to send OTP");
            setPassword({new_password:values.password, confirm_password:values.confirmPassword})
            setStep("otp");
            toast.success("OTP sent successfully");
        } catch (err) {
            toast.error(err.message || "Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle password submission
    const onPasswordSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/student/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({otp:values.otp, new_password: password.new_password, confirm_password: password.confirm_password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to reset password");
            setPassword({});
            setStep("success");
            toast.success("Password reset successfully");
        } catch (err) {
            toast.error(err.message || "Something went wrong. Please try again later");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full bg-transparent border-none max-w-6xl mx-auto shadow-sm">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    {step === "password" && "Reset Password"}
                    {step === "otp" && "Verify OTP"}
                    {step === "success" && "Password Reset Successful"}
                </CardTitle>
                <CardDescription>
                    {step === "password" && "Enter your new password"}
                    {step === "otp" && "Enter the OTP sent to your email to confirm the reset."}
                    {step === "success" && "Your password has been reset successfully."}
                </CardDescription>
            </CardHeader>

            <CardContent>
                {step === "password" && (
                    <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(requestOTP)} className="space-y-4">
                            <FormField control={passwordForm.control} name="password" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl><Input type="password" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={passwordForm.control} name="confirmPassword" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl><Input type="password" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send OTP"}</Button>
                        </form>
                    </Form>
                )}

                {step === "otp" && (
                    <Form {...otpForm}>
                        <form onSubmit={otpForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                            <FormField control={otpForm.control} name="otp" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>OTP</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                {[...Array(6)].map((_, i) => (<InputOTPSlot key={i} index={i} />))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify & Reset Password"}</Button>
                        </form>
                    </Form>
                )}

                
            </CardContent>
        </Card>
    );
}
