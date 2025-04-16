import axios from "axios";

const API_BASE_URL = "/api/student/wishlist"; 

/** Update cart items */
export async function updateCartItem(courseData) {
    try {
        const response = await axios.post(API_BASE_URL, {"course": courseData}, {
            headers: { "Content-Type": "application/json" },
        });
        console.log("responded", response.data)
        return response.data;
    } catch (error) {
        console.error("Error updating cart:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.error || "Failed to update cart.");
    }
}

/**  Remove an item from the cart */
export async function removeCartItem(itemId) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/?itemId=${itemId}`);
        return response.data;
    } catch (error) {
        console.error("Error removing item:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.error || "Failed to remove item.");
    }
}
