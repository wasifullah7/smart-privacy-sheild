"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, FileVideo, ScanFace, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const steps = [
    {
        number: "01",
        title: "Upload Footage",
        description: "Drag and drop your raw video files. We handle high-bitrate MP4, WebM, and MOV formats securely with instant client-side pre-processing.",
        details: ["2GB Max File Size", "End-to-end Encryption", "No Server Upload (Client-side)"],
        icon: FileVideo,
        color: "from-blue-500 to-cyan-500",
    },
    {
        number: "02",
        title: "Intelligent Selection",
        description: "Click once on any subject. Our proprietary computer vision engine automatically segments the target, handling geometric occlusions and rapid movement.",
        details: ["Frame-by-frame Accuracy", "Multi-subject Tracking", "Occlusion Handling"],
        icon: ScanFace,
        color: "from-violet-500 to-fuchsia-500",
    },
    {
        number: "03",
        title: "Automated Redaction",
        description: "Apply professional-grade blur or masking effects instantly. Export your protected footage with metadata stripping for complete anonymity.",
        details: ["Gaussian & Pixelate Blur", "Lossless Export", "Metadata Strip"],
        icon: ShieldCheck,
        color: "from-orange-500 to-red-500",
    },
];

export function HowItWorks() {
    return (
        <section className="py-32 relative overflow-hidden bg-background">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-3 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-500 text-xs font-semibold uppercase tracking-wider"
                    >
                        Workflow
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-foreground"
                    >
                        Enterprise-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">Privacy Automation</span>
                    </motion.h2>
                </div>

                <div className="space-y-24">
                    {steps.map((step, index) => (
                        <div key={index} className={cn(
                            "flex flex-col gap-12 items-center",
                            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        )}>
                            {/* Visual Card Side */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="flex-1 w-full"
                            >
                                <div className="relative group">
                                    <div className={cn(
                                        "absolute -inset-1 rounded-3xl bg-gradient-to-r opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-1000",
                                        step.color
                                    )} />
                                    <Card className="relative h-80 overflow-hidden bg-card/50 backdrop-blur-xl border-white/10 dark:border-white/5 p-8 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                                        {/* Abstract UI representation inside card */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />

                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className={cn(
                                                "w-24 h-24 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br shadow-2xl shadow-black/50 ring-1 ring-white/20",
                                                step.color
                                            )}>
                                                <step.icon className="w-10 h-10 text-white" />
                                            </div>
                                            <div className="h-2 w-24 rounded-full bg-white/10 mb-2" />
                                            <div className="h-2 w-16 rounded-full bg-white/5" />
                                        </div>

                                        {/* Decoration circles */}
                                        <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-white/20" />
                                        <div className="absolute top-4 right-8 h-2 w-2 rounded-full bg-white/10" />
                                    </Card>
                                </div>
                            </motion.div>

                            {/* Text Content Side */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                                className="flex-1 space-y-6"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <span className={cn(
                                        "text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br font-mono opacity-50",
                                        step.color
                                    )}>
                                        {step.number}
                                    </span>
                                    <div className={cn("h-px flex-1 bg-gradient-to-r from-border to-transparent", index % 2 === 1 && "order-first bg-gradient-to-l")} />
                                </div>

                                <h3 className="text-3xl font-bold text-foreground">{step.title}</h3>

                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                                    {step.details.map((detail, i) => (
                                        <div key={i} className="flex items-center text-sm text-muted-foreground">
                                            <CheckCircle2 className={cn("w-4 h-4 mr-2", step.color.split(" ")[0].replace("from-", "text-"))} />
                                            {detail}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
