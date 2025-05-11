import React from "react";
import Link from "next/link";
import { CircleArrowLeft } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 px-6 text-center">
      {/* Main Heading */}
      <h1 className="text-6xl font-extrabold tracking-tight sm:text-8xl">
        403
      </h1>
      <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
        Unauthorized Access
      </h2>

      {/* Subtext */}
      <p className="mt-4 text-lg text-gray-400 sm:text-xl">
        You do not have permission to view this page.
      </p>

      {/* Back to Home Button */}
      <Link href="/" className="mt-8">
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition-all">
          <CircleArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default Unauthorized;
