'use client';
import { useCartStore } from "@/store/useCartStore";

export function InitializeCart({ initialCart }) {
    console.log(initialCart);
  useCartStore.setState({ items: initialCart }); 

  return null;
}
