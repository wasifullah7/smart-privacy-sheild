"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Hero() {
    const [mounted, setMounted] = useState(false);
    const [particles, setParticles] = useState<{ x: number; y: number; size: number; duration: number }[]>([]);

    useEffect(() => {
        setMounted(true);
        const newParticles = Array.from({ length: 20 }).map(() => ({
            x: Math.random() * 100, // Using percentage for responsiveness
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 5 + 5,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-violet-500/10 via-transparent to-transparent blur-[100px] opacity-30" />
            </div>

            {/* Floating Elements/Particles - Client Only */}
            {mounted && (
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {particles.map((p, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white rounded-full opacity-20"
                            initial={{
                                left: `${p.x}%`,
                                top: `${p.y}%`,
                                scale: 0.5,
                            }}
                            animate={{
                                y: [0, -100],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: p.duration,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            style={{
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="container relative z-10 px-4 md:px-6 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 px-4 text-sm font-medium text-white/80 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default"
                    >
                        <Sparkles className="h-4 w-4 text-violet-400" />
                        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                            New: AI Auto-Tracking 2.0
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-6">
                        Privacy in <br className="hidden md:block" />
                        <span className="relative">
                            <span className="relative z-10 bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent dark:from-white dark:via-white/90 dark:to-white/50">
                                Motion
                            </span>
                            <motion.span
                                className="absolute -inset-2 -z-10 block bg-violet-500/30 blur-[40px]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            />
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                        The professional standard for automated video reduction.
                        Protect sensitive data with frame-by-frame AI precision—all in your browser.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link href="/studio">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 text-base font-bold text-black transition-all hover:bg-white/90 dark:bg-white dark:text-black cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
                                <span>Start Protecting</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator - updated to animate without onClick since we scroll elsewhere */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="h-10 w-6 rounded-full border border-white/20 flex justify-center pt-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-white/50" />
                </div>
            </motion.div>
        </section>
    );
}
