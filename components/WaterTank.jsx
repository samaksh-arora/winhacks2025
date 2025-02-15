"use client"
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TankGraphic = ({ fillLevel }) => {
    return (
      <div className="relative w-[200px] h-[300px] border-4 border-blue-500 rounded-lg overflow-hidden">
        {/* Water Fill */}
        <motion.div
          className="absolute bottom-0 left-0 w-full"
          style={{background: "var(--sky)"}}
          initial={{ height: "0%" }}
          animate={{ height: `${fillLevel}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
            {/* Moving Wave */}
            <motion.svg
                className="absolute w-full"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                style={{ bottom: 0 }}
                animate={{ y: `${(-fillLevel) * 3 + (fillLevel / 11.1) + 4}px` }} // Move up with fill level
                transition={{ duration: 1, ease: "easeInOut" }}
            >
            <path
                d="M 0 5 Q 25 0, 50 5 T 100 5 V 10 H 0 Z"
                style={{fill: "var(--sky)"}}
            />
            </motion.svg>
        </motion.div>
      </div>
    );
  };

export default function WaterTank() {
    const [fill, setFill] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setFill((prev) => (prev >= 100 ? 0 : prev + 10));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <TankGraphic fillLevel={fill} />
            <h2 className="text-2xl text-white">400 points</h2>
        </div>
    );
}