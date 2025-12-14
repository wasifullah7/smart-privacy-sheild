"use client";

import { motion } from "framer-motion";
import { Sparkles, Moon, Sun } from "lucide-react";
import { useState } from "react";

export function Header() {
    const [isDark, setIsDark] = useState(true);

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-[#27272A]/50 bg-[#0A0A0B]/80 backdrop-blur-xl"
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo & Tagline */}
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] shadow-lg shadow-[#8B5CF6]/25">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-semibold text-white tracking-tight">
                            Smart Privacy Shield
                        </span>
                        <span className="text-xs text-[#71717A] tracking-wide">
                            AI-Powered Privacy Protection
                        </span>
                    </div>
                </div>

                {/* Theme Toggle */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsDark(!isDark)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#27272A] bg-[#141415] text-[#A1A1AA] transition-colors hover:border-[#8B5CF6]/50 hover:text-white"
                    aria-label="Toggle theme"
                >
                    {isDark ? (
                        <Moon className="h-5 w-5" />
                    ) : (
                        <Sun className="h-5 w-5" />
                    )}
                </motion.button>
            </div>
        </motion.header>
    );
}
