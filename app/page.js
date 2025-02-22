"use client";
import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex items-center justify-center h-screen">
      <Button>Click me</Button>
      <ModeToggle />
    </section>
  );
}
