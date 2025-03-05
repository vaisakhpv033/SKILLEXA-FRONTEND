"use client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import OtpTimer from "./otpTimer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

function OtpValidation({email}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data) {
    console.log("submitting otp", data.pin);
    const otp = data.pin;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/otp-validation/", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ otp: otp, email:email }),
      });

      const data = await res.json();
      console.log("server response", data);
      if (!res.ok) throw new Error(data.error || "failed to verify otp");
      toast.success("Otp verified successfully. Login Now")
      router.push("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResendOtp(){
    try {
      const res = await fetch("/api/resend-otp/", {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify({email, purpose:"registration"})
      });

      const data = await res.json();
      console.log("Resend Otp response", data);
      if (!res.ok) throw new Error(data.error || "Failed to resend OTP")
      toast.success("Otp Resended Successfully")
    } catch(err){
      console.log(err);
      toast.error(err.message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center p-8 pt-16 space-y-6"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-center">
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="mr-2 h-4 w-full animate-spin" /> : "Submit"}
        </Button>

        {/* Resend OTP Button with Timer */}
        <div className="flex flex-col items-center mt-4">
          <OtpTimer initialTime={180} onResend={handleResendOtp} />
        </div>
      </form>
    </Form>
  );
}

export default OtpValidation;
