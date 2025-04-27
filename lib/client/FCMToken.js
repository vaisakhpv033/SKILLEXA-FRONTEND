import axios from "axios";

const API_BASE_URL = "/api/user/token"; 

/** Add FCM token to the server */
export async function addFCMToken(token) {
    try {
        const response = await axios.post(API_BASE_URL, {"token": token}, {
            headers: { "Content-Type": "application/json" },
        });
        console.log("responded", response.data)
        return response.data;
    } catch (error) {
        console.error("Error adding fcm token:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.error || "Failed to add token.");
    }
}
