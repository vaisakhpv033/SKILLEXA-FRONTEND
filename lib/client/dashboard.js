import axios from 'axios';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function getdashBoardItems() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
      return [];
    }

    const response = await axios.get(`${API_BASE_URL}/instructor/instructor-dashboard/overview/`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    return response.data; 
  } catch (error) {
    console.error("Cart fetching error:", error?.response?.data || error.message);
    return [];
  }
}
