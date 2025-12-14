"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Film, X, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface VideoUploadProps {
    onFileSelect: (file: File, url: string) => void;
}

const ACCEPTED_FORMATS = ["video/mp4", "video/webm"];
const ACCEPTED_EXTENSIONS = ".mp4,.webm";

export function VideoUpload({ onFileSelect }: VideoUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadState, setUploadState] = useState<"idle" | "uploading" | "done">("idle");
    const inputRef = useRef<HTMLInputElement>(null);
    const urlRef = useRef<string | null>(null);

    const handleFile = useCallback((file: File) => {
        // Check if file type is supported
        if (!ACCEPTED_FORMATS.includes(file.type)) {
            console.error("Unsupported file type:", file.type);
            alert("Please upload a supported video format (MP4 or WebM). Other formats like AVI or MOV may not play in the browser.");
            return;
        }

        // Create the object URL immediately
        const url = URL.createObjectURL(file);
        urlRef.current = url;

        console.log("Video file selected:", file.name, file.type, url);

        setUploadState("uploading");
        setUploadProgress(0);
        setUploadedFile(file);

        let progress = 0;

        // Simulate upload progress
        const interval = setInterval(() => {
            progress += 20;
            setUploadProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                setUploadState("done");

                // Call parent callback after state is set
                setTimeout(() => {
                    if (urlRef.current) {
                        onFileSelect(file, urlRef.current);
                    }
                }, 0);
            }
        }, 100);
    }, [onFileSelect]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const handleRemove = useCallback(() => {
        // Revoke the object URL to free memory
        if (urlRef.current) {
            URL.revokeObjectURL(urlRef.current);
            urlRef.current = null;
        }
        setUploadedFile(null);
        setUploadProgress(0);
        setUploadState("idle");
        if (inputRef.current) inputRef.current.value = "";
    }, []);

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS}
                onChange={handleInputChange}
                className="hidden"
                id="video-upload"
            />

            <AnimatePresence mode="wait">
                {uploadState === "idle" ? (
                    <motion.label
                        key="upload"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        htmlFor="video-upload"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`
              flex flex-col items-center justify-center gap-3 p-6 cursor-pointer
              border-2 border-dashed rounded-xl transition-all duration-300
              ${isDragging
                                ? "border-[#8B5CF6] bg-[#8B5CF6]/10"
                                : "border-[#27272A] hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/5"
                            }
            `}
                    >
                        <motion.div
                            animate={isDragging ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#06B6D4]/20 border border-[#8B5CF6]/30"
                        >
                            <Upload className="h-5 w-5 text-[#8B5CF6]" />
                        </motion.div>

                        <div className="text-center">
                            <p className="text-sm font-medium text-white">
                                {isDragging ? "Drop here" : "Drop video or browse"}
                            </p>
                            <p className="mt-1 text-xs text-[#52525B]">
                                MP4, WebM, MOV • Max 500MB
                            </p>
                        </div>
                    </motion.label>
                ) : uploadState === "uploading" ? (
                    <motion.div
                        key="uploading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-[#27272A] rounded-xl"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#06B6D4]/20 border border-[#8B5CF6]/30"
                        >
                            <Film className="h-5 w-5 text-[#8B5CF6]" />
                        </motion.div>

                        <div className="w-full">
                            <Progress value={uploadProgress} className="h-1.5" />
                            <p className="mt-2 text-center text-xs text-[#71717A]">
                                Processing... {uploadProgress}%
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="uploaded"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 p-4 bg-[#0A0A0B] border border-[#27272A] rounded-xl"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10B981]/20 border border-[#10B981]/30">
                            <CheckCircle className="h-5 w-5 text-[#10B981]" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {uploadedFile?.name}
                            </p>
                            <p className="text-xs text-[#52525B]">
                                {((uploadedFile?.size || 0) / (1024 * 1024)).toFixed(1)} MB
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleRemove}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-[#71717A] hover:bg-[#EF4444] hover:text-white transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
