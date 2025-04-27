import axios from 'axios';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function CreateOrder(payment_method="razorpay") {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
      return false;
    }

    const response = await axios.post(`${API_BASE_URL}/order/`, {"payment_method": payment_method}, {
      headers: { Authorization: `Bearer ${session.accessToken}`, "Content-Type": "application/json" },
      
    });
    console.log("responded", response.data);
    return response.data; 
  } catch (error) {
    console.error("Cart fetching error:", error?.response?.data || error.message);
    return false;
  }
}