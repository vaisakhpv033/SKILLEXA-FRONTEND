"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalAuthHandler({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      signOut({ callbackUrl: "/login", redirect:true }); // ✅ Force logout and redirect
    }
  }, [status, router]);

  return children;
}
