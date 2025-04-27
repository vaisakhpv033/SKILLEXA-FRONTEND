import axios from "axios";

const API_BASE_URL = "/api/user/logout"; 

/** Update cart items */
export async function logoutUser() {
    try {
        const response = await axios.post(API_BASE_URL, {}, {
            headers: { "Content-Type": "application/json" },
        });
        console.log("responded", response.data)
        return response.data;
    } catch (error) {
        console.error("Error updating cart:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.error || "Failed to update cart.");
    }
}
