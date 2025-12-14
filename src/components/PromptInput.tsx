"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Command } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface PromptInputProps {
    value: string;
    onChange: (prompt: string) => void;
    disabled?: boolean;
}

const PLACEHOLDER_EXAMPLES = [
    "Blur the license plate in the selected area",
    "Track and blur this person throughout the video",
    "Apply mosaic effect to the selected face",
    "Hide all text visible in the marked region",
];

export function PromptInput({ value, onChange, disabled }: PromptInputProps) {
    const placeholderIndexRef = useRef(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const getPlaceholder = useCallback(() => {
        const placeholder = PLACEHOLDER_EXAMPLES[placeholderIndexRef.current];
        placeholderIndexRef.current = (placeholderIndexRef.current + 1) % PLACEHOLDER_EXAMPLES.length;
        return placeholder;
    }, []);

    return (
        <div className="space-y-2">
            <Textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={PLACEHOLDER_EXAMPLES[0]}
                disabled={disabled}
                className="min-h-[80px] resize-none text-sm"
                onFocus={() => {
                    if (textareaRef.current) {
                        textareaRef.current.placeholder = getPlaceholder();
                    }
                }}
            />

            {/* Character count & hint */}
            <div className="flex items-center justify-between">
                <span className={`text-xs ${value.length > 450 ? "text-amber-400" : "text-[#52525B]"}`}>
                    {value.length}/500
                </span>
                <div className="flex items-center gap-1 text-xs text-[#52525B]">
                    <Command className="h-3 w-3" />
                    <span>Describe what to blur</span>
                </div>
            </div>
        </div>
    );
}
