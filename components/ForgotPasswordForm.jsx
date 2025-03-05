"use client";
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
import { useRouter } from "next/navigation";

// Email validation schema
const emailSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
});

// OTP password validation schema
const otpPasswordSchema = z.object({
    otp: z.string().length(6, { message: "OTP must be 6 digits" }),
    password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[A-Z]/, {
                message: "Password must contain at least one uppercase letter",
            })
            .regex(/[a-z]/, {
                message: "Password must contain at least one lowercase letter",
            })
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
            .regex(/[^A-Za-z0-9]/, {
                message: "Password must contain at least one special character",
            }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export default function ForgotPasswordForm() {
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Email form
    const emailForm = useForm({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    });

    // OTP form
    const otpPasswordForm = useForm({
        resolver: zodResolver(otpPasswordSchema),
        defaultValues: { otp: "", password: "", confirmPassword: "" },
    });

    // Handle email submission
    const onEmailSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/forgot-password/otp", {
                method:"POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify({email: values.email})
            })
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again later.")
            setEmail(values.email);
            setStep("otp-password");
            toast.success("Verification code sent to your email");
        } catch (err) {
            toast.error(err.message || "Failed to send Verification code. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle OTP and password submission
    const onOtpPasswordSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            const payload = {email, otp: values.otp, new_password:values.password, confirm_password:values.confirmPassword}
            const res = await fetch("/api/forgot-password", {
                method: "POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify(payload)
            })
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again later.")
            setStep("success");
            toast.success("Password reset successfully");
        } catch (err) {
            toast.error(err.message || "Something went wrong. Please try again later");
        } finally {
            setIsSubmitting(false);
        }
    };


    // Go back to previous step
    const goBack = () => setStep("email");

    return (
        <Card className="w-full max-w-xl mx-auto shadow-sm p-4">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    {step === "email" && "Forgot Password"}
                    {step === "otp-password" && "Verify & Reset Password"}
                    {step === "success" && "Password Reset Complete"}
                </CardTitle>
                <CardDescription>
                    {step === "email" &&
                        "Enter your email address to receive a verification code"}
                    {step === "otp-password" && `We've sent a verification code to ${email}. Enter the code and set a new password.`}
                    {step === "success" && "Your password has been reset successfully"}
                </CardDescription>
            </CardHeader>

            <CardContent>
                {step === "email" && (
                    <Form {...emailForm}>
                        <form
                            onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={emailForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your email address"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    "Send verification code"
                                )}
                            </Button>
                        </form>
                    </Form>
                )}

                {step === "otp-password" && (
                    <Form {...otpPasswordForm}>
                        <form
                            onSubmit={otpPasswordForm.handleSubmit(onOtpPasswordSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={otpPasswordForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={otpPasswordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={otpPasswordForm.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Verification Code</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    {[...Array(6)].map((_, i) => (
                                                        <InputOTPSlot key={i} index={i} />
                                                    ))}
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify & Reset Password"}
                            </Button>
                            <Button variant="ghost" className="ml-2" type="button" onClick={goBack}>Back to email</Button>
                        </form>
                    </Form>
                )}

                {step === "success" && (
                    <Button onClick={() => (router.push("/login"))}>
                        Back to Login
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
