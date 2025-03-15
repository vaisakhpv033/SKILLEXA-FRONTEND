import { NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function PATCH(req, { params }) {
    try {
        // Get session & check authorization
        const session = await getServerSession(authOptions);
        if (!session || !session.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Extract user ID from dynamic params
        const { id } = params;
        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Send block request to Django backend
        const response = await axios.patch(
            `${API_BASE_URL}/api/admin/users/${id}/block/`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log(`✅ User ${id} blocked successfully`);
        return NextResponse.json(response.data, { status: response.status });

    } catch (error) {
        console.error("Block user error:", error?.response?.data || error.message);
        let errorMessage = "Something went wrong";

        if (error?.response?.data && typeof error.response.data === "object") {
            const firstKey = Object.keys(error.response.data)[0];
            errorMessage = error.response.data[firstKey][0] || errorMessage;
        }

        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}
