"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function GlobalAuthHandler({ children }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signOut({ callbackUrl: "/login", redirect:true }); // Force logout and redirect
    }
  }, [status]);

  return children;
}
