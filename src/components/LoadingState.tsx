"use client";

import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface LoadingStateProps {
    status: "processing" | "success" | "idle";
    progress?: number;
    message?: string;
}

export function LoadingState({ status, progress = 0, message }: LoadingStateProps) {
    if (status === "idle") return null;

    return (
        <Card className="relative overflow-hidden">
            {status === "processing" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4 py-6"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#06B6D4]/20 border border-[#8B5CF6]/30"
                    >
                        <Sparkles className="h-7 w-7 text-[#8B5CF6]" />
                    </motion.div>

                    <div className="w-full max-w-xs">
                        <Progress value={progress} className="h-2" />
                        <p className="mt-2 text-center text-sm text-[#A1A1AA]">
                            {message || "Processing your request..."}
                        </p>
                        <p className="text-center text-xs text-[#52525B] mt-1">
                            {progress}% complete
                        </p>
                    </div>
                </motion.div>
            )}

            {status === "success" && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-6"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10B981]/20 border border-[#10B981]/30"
                    >
                        <CheckCircle2 className="h-7 w-7 text-[#10B981]" />
                    </motion.div>

                    <div className="text-center">
                        <p className="text-sm font-medium text-white">
                            Processing Complete!
                        </p>
                        <p className="mt-1 text-xs text-[#71717A]">
                            Your video has been processed successfully
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Animated gradient border when processing */}
            {status === "processing" && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)",
                        backgroundSize: "200% 100%",
                    }}
                    animate={{
                        backgroundPosition: ["200% 0", "-200% 0"],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            )}
        </Card>
    );
}
