"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        name: "Alex Rivera",
        username: "@arivera",
        role: "Content Creator",
        content: "The privacy features are mind-blowing. I integrated this into my workflow in less than 10 minutes. The auto-tracking is crazy accurate.",
        initials: "AR",
        image: "https://i.pravatar.cc/150?img=11",
    },
    {
        name: "Sarah Chen",
        username: "@sarahc_dev",
        role: "Digital Marketer",
        content: "Finally, a browser-based solution that doesn't upload my footage. This is exactly what our compliance team needed. 10/10.",
        initials: "SC",
        image: "https://i.pravatar.cc/150?img=5",
    },
    {
        name: "Marcus Johnson",
        username: "@mj_journo",
        role: "Journalist",
        content: "The UI is so clean, it feels like a premium app. Love the attention to detail in the animations. Fast, secure, and beautiful.",
        initials: "MJ",
        image: "https://i.pravatar.cc/150?img=3",
    },
    {
        name: "Emily Davis",
        username: "@ux_emily",
        role: "Product Designer",
        content: "As a designer, I appreciate the craftsmanship. It's rare to see tools that look this good and function this smoothly.",
        initials: "ED",
        image: "https://i.pravatar.cc/150?img=9",
    },
    {
        name: "David Kim",
        username: "@dkim_sec",
        role: "Privacy Advocate",
        content: "Client-side processing is a game changer. Zero trust architecture by default. Highly recommended for sensitive work.",
        initials: "DK",
        image: "https://i.pravatar.cc/150?img=13",
    },
    {
        name: "Jessica Wu",
        username: "@jess_vlogs",
        role: "Vlogger",
        content: "Blurred faces in seconds. Saved me hours of editing time on my latest vlog. Super easy to use!",
        initials: "JW",
        image: "https://i.pravatar.cc/150?img=32",
    },
    {
        name: "Tom Harris",
        username: "@teach_tom",
        role: "Educator",
        content: "Great for hiding student identities in classroom recordings. Simple, effective, and free.",
        initials: "TH",
        image: "https://i.pravatar.cc/150?img=53",
    },
    {
        name: "Linda Martinez",
        username: "@linda_hr",
        role: "HR Manager",
        content: "We use this for training videos. Protecting employee privacy has never been easier.",
        initials: "LM",
        image: "https://i.pravatar.cc/150?img=44",
    },
    {
        name: "Ryan Park",
        username: "@rpark_social",
        role: "Social Media Mgr",
        content: "This tool is a lifesaver for quick edits before posting. The AI tracking is surprisingly good.",
        initials: "RP",
        image: "https://i.pravatar.cc/150?img=59",
    },
];

const firstRow = testimonials.slice(0, 3);
const secondRow = testimonials.slice(3, 6);
const thirdRow = testimonials.slice(6, 9);

const MarqueeCard = ({ item }: { item: typeof testimonials[0] }) => (
    <Card className="w-[450px] flex-shrink-0 p-8 bg-transparent border-white/5 hover:bg-white/5 transition-all duration-300 mx-6 rounded-3xl group cursor-default">
        <div className="flex flex-col h-full justify-between gap-8">
            <p className="text-[17px] text-gray-200 leading-relaxed font-normal tracking-wide whitespace-normal text-left">
                {item.content}
            </p>

            <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 overflow-hidden rounded-full border border-white/10">
                    <AvatarImage src={item.image} alt={item.name} />
                    <AvatarFallback className="bg-gradient-to-br from-[#333] to-[#111] text-white font-medium text-xs">
                        {item.initials}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                    <span className="text-sm font-medium text-white/90">{item.username}</span>
                    <span className="text-xs text-white/50">{item.name}</span>
                </div>
            </div>
        </div>
    </Card>
);

export function Testimonials() {
    return (
        <section className="py-32 bg-[#0A0A0B] overflow-hidden relative">
            <div className="container px-4 md:px-6 mx-auto mb-24 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground"
                >
                    Loved by people <span className="text-violet-500">worldwide</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-lg"
                >
                    See what users are saying about Smart Privacy Shield
                </motion.p>
            </div>

            <div className="flex flex-col gap-10 mask-linear-fade">
                {/* Row 1: Left */}
                <div className="relative flex overflow-hidden w-full">
                    <motion.div
                        className="flex whitespace-nowrap min-w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
                    >
                        {[...firstRow, ...firstRow].map((t, i) => (
                            <MarqueeCard key={i} item={t} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 2: Right */}
                <div className="relative flex overflow-hidden w-full">
                    <motion.div
                        className="flex whitespace-nowrap min-w-max"
                        initial={{ x: "-50%" }}
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
                    >
                        {[...secondRow, ...secondRow].map((t, i) => (
                            <MarqueeCard key={i} item={t} />
                        ))}
                    </motion.div>
                </div>

                {/* Row 3: Left */}
                <div className="relative flex overflow-hidden w-full">
                    <motion.div
                        className="flex whitespace-nowrap min-w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 70 }}
                    >
                        {[...thirdRow, ...thirdRow].map((t, i) => (
                            <MarqueeCard key={i} item={t} />
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Gradient Masks */}
            <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
        </section>
    );
}
