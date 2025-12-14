import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default:
                    "bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/30",
                secondary:
                    "bg-[#27272A] text-[#A1A1AA] border border-[#3F3F46]",
                success:
                    "bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/30",
                destructive:
                    "bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/30",
                outline:
                    "border border-[#27272A] text-[#A1A1AA]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
