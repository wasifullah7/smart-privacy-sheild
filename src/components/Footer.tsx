"use client";

import { motion } from "framer-motion";
import { Sparkles, Github, Twitter, Linkedin, Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-border/40 py-12 pb-8">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-lg font-bold text-foreground">Smart Privacy Shield</span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            The professional standard used by creators, journalists, and enterprises to protect privacy in video content automatically using AI.
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">API</Link></li>
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">Showcase</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">About</Link></li>
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">Legal</Link></li>
                            <li><Link href="#" className="hover:text-violet-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground text-center md:text-left">
                        © {new Date().getFullYear()} Smart Privacy Shield. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-muted-foreground/50 flex items-center justify-center gap-1">
                        Made with <Heart className="h-3 w-3 text-red-500/50 fill-red-500/20" /> by Wasif Ullah
                    </p>
                </div>
            </div>
        </footer>
    );
}
