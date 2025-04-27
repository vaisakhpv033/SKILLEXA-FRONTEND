import axios from 'axios';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function getWishlistItems() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
      return [];
    }

    const response = await axios.get(`${API_BASE_URL}/wishlist/`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    return response.data.results; 
  } catch (error) {
    console.error("Course fetching error:", error?.response?.data || error.message);
    return [];
  }
}