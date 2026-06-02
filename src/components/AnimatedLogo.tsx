import { motion } from "framer-motion";
import logo from "@/assets/gb-logo-transparent.png.asset.json";

interface AnimatedLogoProps {
  className?: string;
}

export function AnimatedLogo({ className }: AnimatedLogoProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <img
        src={logo.url}
        alt="GB Browser"
        className="h-32 w-32 md:h-40 md:w-40 lg:h-52 lg:w-52 mx-auto"
      />
      <h1 className="mt-4 text-center text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
        GB Browser
      </h1>
    </motion.div>
  );
}