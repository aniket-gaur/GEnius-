"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedSection = () => {
    const controlsLeft = useAnimation();
    const controlsRight = useAnimation();
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.3,
    });

    useEffect(() => {
        if (inView) {
            controlsLeft.start("visible");
            controlsRight.start("visible");
        } else {
            controlsLeft.start("hidden");
            controlsRight.start("hidden");
        }
    }, [inView]);

    const variantsLeft = {
        visible: { opacity: 1, x: 0, transition: { duration: 0.9 } },
        hidden: { opacity: 0, x: "-100%" },
    };

    const variantsRight = {
        visible: { opacity: 1, x: 0, transition: { duration: 0.9 } },
        hidden: { opacity: 0, x: "100%" },
    };

    return (
        <div ref={ref} className="relative overflow-hidden h-[500px] sm:h-[800px] md:h-[900px]">
            {/* Left Section - Product Info */}
            <motion.div
                variants={variantsLeft}
                initial="hidden"
                animate={controlsLeft}
                className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-black via-[#07030a] to-[#09000e] text-white p-10 flex flex-col justify-center"
            >
                <h2 className="text-4xl font-bold mb-4">Revolutionary AI Technology</h2>
                <p className="text-lg text-gray-300">
                    Our AI-powered platform enhances your digital experience with cutting-edge technology.
                    Experience seamless automation, improved efficiency, and state-of-the-art design.
                </p>
                <ul className="mt-5 text-gray-400">
                    <li>✅ AI-driven automation</li>
                    <li>✅ Real-time data processing</li>
                    <li>✅ Secure & scalable infrastructure</li>
                </ul>
                <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Learn More
                </button>
            </motion.div>

            {/* Right Section */}
            <motion.div
                variants={variantsRight}
                initial="hidden"
                animate={controlsRight}
                className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-br from-black via-[#0e0906] to-[#1f0d02] flex items-center justify-center"
            >
                <img src="/your-image.png" alt="Product Display" className="w-4/5 h-auto rounded-lg shadow-lg" />
            </motion.div>
        </div>
    );
};

export default AnimatedSection;
