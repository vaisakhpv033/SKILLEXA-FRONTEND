import { NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function GET(req) {
    try {
        // Retrieve session from NextAuth
        const session = await getServerSession(authOptions);
        if (!session || !session.accessToken || session?.user?.user?.role != 3) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Send authenticated request to Django backend
        const response = await axios.get(`${API_BASE_URL}/api/admin/dashboard/`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });
        console.log("response", response.data);
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error("Dashboard data fetch error:", error?.response?.data);
        let errorMessage = "Something went wrong";
        if (error?.response?.data && typeof error.response.data === "object") {
            const firstKey = Object.keys(error.response.data)[0];
            errorMessage = error.response.data[firstKey][0];
        }
        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}
