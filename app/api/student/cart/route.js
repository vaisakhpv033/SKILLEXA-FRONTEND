import { NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";


export async function POST(req) {
    try {
        // Step 1: Retrieve session from NextAuth
        const session = await getServerSession(authOptions);
        if (!session || !session.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Step 2: Parse request body
        const body = await req.json();

        // Step 3: Send PATCH request to Django API
        const response = await axios.post(`${API_BASE_URL}/cart/`, body, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        // Step 4: Return Django API response
        return NextResponse.json(response.data, { status: response.status });

    } catch (error) {
        console.error("Something went wrong:", error?.response?.data || error.message);

        // Extract detailed error message
        const errorMessage =
            error?.response?.data && typeof error.response.data === "object"
                ? Object.values(error.response.data)?.[0]?.[0] || "Something went wrong."
                : error?.response?.data || "Something went wrong.";

        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}



export async function DELETE(req) {
    try {
        // Step 1: Retrieve session from NextAuth
        const session = await getServerSession(authOptions);
        if (!session || !session.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Step 2: Extract cart ID from request URL
        const { searchParams } = new URL(req.url);
        const cartId = searchParams.get("cartId");

        // Step 3: Validate cart ID
        if (!cartId) {
            return NextResponse.json({ error: "Cart ID is required for deletion." }, { status: 400 });
        }

        // Step 4: Send DELETE request to Django API
        const response = await axios.delete(`${API_BASE_URL}/cart/${cartId}/`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });

        if (response.status === 204) {
            return NextResponse.json({ message: "Course removed from cart." }, { status: 200 });
        }

        // Handle standard JSON responses
        return NextResponse.json(response.data || { message: "Course removed from cart." }, { status: response.status });

    } catch (error) {
        console.error("Something went wrong", error?.response?.data || error.message);

        // Extract detailed error message
        const errorMessage =
            error?.response?.data && typeof error.response.data === "object"
                ? Object.values(error.response.data)?.[0]?.[0] || "Something went wrong"
                : error?.response?.data || "Something went wrong";

        return NextResponse.json({ error: errorMessage }, { status: error?.response?.status || 500 });
    }
}

