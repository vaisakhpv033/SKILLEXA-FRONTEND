import { NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function GET(req) {
    try {
        // Retrieve session from NextAuth
        const session = await getServerSession(authOptions);
        if (!session || !session.accessToken || session?.user?.user?.role != 3) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // ✅ Extract the `role` parameter from the request URL
        const { searchParams } = new URL(req.url);
        const role = searchParams.get("role") || "student";

        // Send authenticated request to Django backend
        const response = await axios.get(`${API_BASE_URL}/api/admin/users/?role=${role}`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });
        console.log("response", response.data);
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        console.error("Profile fetch error:", error?.response?.data);
        let errorMessage = "Something went wrong";
        if (error?.response?.data && typeof error.response.data === "object") {
            const firstKey = Object.keys(error.response.data)[0];
            errorMessage = error.response.data[firstKey][0];
        }
        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}

export async function PATCH(req){
    try{
        const session = await getServerSession(authOptions);
        if (!session || !session.accessToken){
            return NextResponse.json({error: "unauthorized"}, {status: 401});
        }

        const body = await req.json();

        const response = await axios.patch(`${API_BASE_URL}/api/admin/users/${body.id}/block/`, {}, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });
        return NextResponse.json(response.data, {status: response.status});
    } catch (error) {
        console.error("Profile update error:", error?.response?.data);
        let errorMessage = "Something went wrong";
        if (error?.response?.data && typeof error.response.data === "object") {
            const firstKey = Object.keys(error.response.data)[0];
            errorMessage = error.response.data[firstKey][0];
        }
        console.log("error", errorMessage)
        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}