import axios from 'axios';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function getAdminDashboardData() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken || session?.user?.user?.role != 3) {
      return {success: false, message:"Unauthorized"};
    }

    const response = await axios.get(`${API_BASE_URL}/api/admin/dashboard/`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    return {success: true, data: response.data, message: "success"}; 
  } catch (error) {
    console.error("Dashboard details fetching error:", error?.response?.data || error.message);
    return {success: false, message: error?.response?.data || error.message || "Dashboard details fetching error:"};
  }
}

export async function getAdminOrderRevenueData() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken || session?.user?.user?.role != 3) {
      return {success: false, message:"Unauthorized"};
    }

    const response = await axios.get(`${API_BASE_URL}/api/admin/dashboard/order-stats/`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    return {success: true, data: response.data.data, message: "success"}; 
  } catch (error) {
    console.error("Dashboard details fetching error:", error?.response?.data || error.message);
    return {success: false, message: error?.response?.data || error.message || "Dashboard details fetching error:"};
  }
}