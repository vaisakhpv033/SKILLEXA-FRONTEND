import FuzzyText from "@/components/react-bits/FuzzyTest";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GlassIcons from "@/components/react-bits/GlassIcons";
import { CircleArrowLeft } from "lucide-react";
const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden">
      {/* Main Heading */}
      <FuzzyText
        baseIntensity={0.1}
        hoverIntensity={0.6}
        enableHover={true}
        fontWeight={600} // Bold for visibility
        fontSize="clamp(1.5rem, 8vw, 3rem)" // Scales better
        className="max-w-full break-words"
      >
        403 - Unauthorized
      </FuzzyText>

      {/* Subtext */}
      <div className="mt-4">
        <FuzzyText
          baseIntensity={0.1}
          hoverIntensity={0.3}
          enableHover={true}
          fontWeight={300}
          fontSize="clamp(1rem, 5vw, 1.3rem)" // Proper scaling
          className="max-w-full break-words"
        >You do not have permission to view this page.
        </FuzzyText>
      </div>
      <Link href="/" className="items-center mt-8">
      <GlassIcons items={[{icon: <CircleArrowLeft/>, color:'purple', label:"back"}]}/>
      </Link>
    </div>
  );
};

export default Unauthorized;
