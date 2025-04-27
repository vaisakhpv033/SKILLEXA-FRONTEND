import { create } from "zustand";
import { updateCartItem, removeCartItem } from "@/lib/client/cartService";

export const useCartStore = create((set, get) => ({
    items: [],

    addItem: async (course) => {
        try {
            const updatedItem = await updateCartItem(course);
            set((state) => ({ items: [...state.items, updatedItem] }));
            return {status: true}
        }catch (error) {
            console.error("failed to add item", error.message)
            return {status: false, message: error.message || "Failed to add Item"}
        }
    },

    removeItem: async (id) =>{
        try{
            console.log("started")
            await removeCartItem(id);
            console.log("finished")
            set((state) => ({
                items: state.items.filter((item) => item.id !== id),
            }));
        } catch (error){
            console.error("Failed to remove item", error.message);
        }
    },

    clearCart: () => set({ items: [] }),

    getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + ( parseFloat(item.course_price) || 0), 0);
    },

    getItemsCount: () => {
        return get().items.length;
    },

    setState: (newState) => set(newState),
}));
