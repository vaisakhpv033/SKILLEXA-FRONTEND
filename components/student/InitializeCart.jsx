'use client';
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export function InitializeCart({ initialCart, initialWishlist }) {
    console.log("cart",initialCart);
    console.log('wishlist', initialWishlist);
  useCartStore.setState({ items: initialCart }); 
  useWishlistStore.setState({items: initialWishlist});

  return null;
}
