"use client";

import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
}

export function ActionButton({ onClick, loading, disabled }: ActionButtonProps) {
    return (
        <motion.div
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className="w-full"
        >
            <Button
                onClick={onClick}
                loading={loading}
                disabled={disabled || loading}
                variant="gradient"
                size="xl"
                className="w-full group"
            >
                <Wand2 className={`h-5 w-5 ${loading ? '' : 'group-hover:rotate-12'} transition-transform`} />
                {loading ? "Processing..." : "Apply AI Tracking"}
            </Button>
        </motion.div>
    );
}
