import { NextResponse } from "next/server";
import { authMiddleware } from "./middleware/authMiddleware";
import { cacheControlMiddleware } from "./middleware/cacheControlMiddleware";


export async function middleware(req) {
    let res = NextResponse.next();

    // Apply cache control Middleware
    res = cacheControlMiddleware(req, res);

    // Apply authentication Middleware
    res = await authMiddleware(req);

    return res;
}

// Apply Middleware to Specific Routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
