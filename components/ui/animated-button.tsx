
"use client";

import React from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps & {
    children?: React.ReactNode;
    as?: "button" | "a";
    href?: string;
  };

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children = "Browse Projects",
  className = "",
  as = "button",
  ...rest
}) => {
  const Component = motion[as] as any;

  return (
    <Component
      {...rest}
      whileHover={{
        scale: 1.035,
        y: -3,
        boxShadow: "0 8px 32px rgba(234, 88, 12, 0.35)",
      }}
      whileTap={{
        scale: 0.96,
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 22,
        mass: 0.6,
      }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2",
        "overflow-hidden rounded-xl px-2 py-1",
        "border border-[#F97316]/50",
        "bg-linear-to-r from-[#C2410C] via-[#EA580C] to-[#F97316]",
        "bg-size-[200%_100%]",
        "text-[15px] font-semibold tracking-wide text-white",
        "shadow-[0_4px_20px_rgba(234,88,12,0.20)]",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[#F97316] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-black",
        "disabled:pointer-events-none disabled:opacity-50",
        "no-underline",
        className
      )}
    >
      {/* Animated gradient shine */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.08) 40%, rgba(255,210,170,0.30) 50%, transparent 75%)",
          backgroundSize: "200% 100%",
        }}
        initial={{ backgroundPosition: "200% 0" }}
        animate={{
          backgroundPosition: ["200% 0", "-200% 0"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1,
        }}
      />

      {/* Visible button content */}
      <motion.span
        className="relative z-20 flex items-center justify-center gap-2 font-semibold text-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        {children}
      </motion.span>

      {/* Animated glowing border */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] p-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #FDBA74, #FFFFFF, #F97316, transparent)",
          backgroundSize: "200% 100%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
        initial={{
          backgroundPosition: "100% 0",
          opacity: 0.3,
        }}
        animate={{
          backgroundPosition: ["100% 0", "0% 0"],
          opacity: [0.3, 0.9, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </Component>
  );
};

export default AnimatedButton;
