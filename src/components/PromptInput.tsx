"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, Command } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface PromptInputProps {
    onSubmit: (prompt: string) => void;
    disabled?: boolean;
}

const PLACEHOLDER_EXAMPLES = [
    "Blur the license plate in frame 120",
    "Track and blur this person throughout the video",
    "Apply mosaic effect to the selected face",
    "Hide all text visible in the marked region",
];

export function PromptInput({ onSubmit, disabled }: PromptInputProps) {
    const [prompt, setPrompt] = useState("");
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const handleSubmit = useCallback(() => {
        if (!prompt.trim() || disabled) return;
        onSubmit(prompt.trim());
        setPrompt("");
    }, [prompt, disabled, onSubmit]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    }, [handleSubmit]);

    return (
        <Card className="relative">
            <div className="mb-3">
                <label className="text-sm font-medium text-white">
                    AI Prompt
                </label>
                <p className="text-xs text-[#52525B] mt-0.5">
                    Describe what you want to do with the selected points
                </p>
            </div>

            <div className="relative">
                <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={PLACEHOLDER_EXAMPLES[placeholderIndex]}
                    disabled={disabled}
                    className="min-h-[100px] pr-12 resize-none"
                    onFocus={() => {
                        setPlaceholderIndex((prev) =>
                            (prev + 1) % PLACEHOLDER_EXAMPLES.length
                        );
                    }}
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    disabled={!prompt.trim() || disabled}
                    className={`
            absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg
            transition-all duration-200
            ${prompt.trim() && !disabled
                            ? "bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/30"
                            : "bg-[#27272A] text-[#52525B] cursor-not-allowed"
                        }
          `}
                >
                    <Send className="h-4 w-4" />
                </motion.button>
            </div>

            {/* Character count & shortcut hint */}
            <div className="mt-2 flex items-center justify-between">
                <span className={`text-xs ${prompt.length > 450 ? "text-amber-400" : "text-[#52525B]"}`}>
                    {prompt.length}/500
                </span>
                <div className="flex items-center gap-1 text-xs text-[#52525B]">
                    <Command className="h-3 w-3" />
                    <span>+ Enter to send</span>
                </div>
            </div>
        </Card>
    );
}
