import axios from 'axios';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function getUserProfile() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
      return {success: false, message: "Unauthorized"};
    }

    const response = await axios.get(`${API_BASE_URL}/accounts/profile/`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    return {success: true, data: response.data}; 
  } catch (error) {
    console.error("Profile details fetching error:", error?.response?.data || error.message);
    return {success: false, message:  error?.response?.data || error?.message || "Something went wrong" };
  }
}