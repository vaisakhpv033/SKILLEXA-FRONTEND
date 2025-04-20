import axios from "axios";

const API_BASE_URL = '/api/student/order';



/* Request Refund */
export async function requestRefund(orderItem) {
    try {
        const response = await axios.post(`${API_BASE_URL}/refund/`, orderItem, {
            headers: { "Content-Type": "application/json" },
        });
        console.log("responded", response.data)
        return {'status': true, result: response.data}
    } catch (error) {
        console.error("Request for refund failed:", error?.response?.data || error.message);
        return {'status': false, result:error?.response?.data?.error || error?.message || "Failed to submit request"}
    }
  }
  