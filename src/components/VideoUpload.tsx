"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Film, X, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface VideoUploadProps {
    onFileSelect: (file: File, url: string) => void;
}

const ACCEPTED_FORMATS = ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"];

export function VideoUpload({ onFileSelect }: VideoUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback((file: File) => {
        if (!ACCEPTED_FORMATS.includes(file.type)) {
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        // Simulate upload progress
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    setUploadedFile(file);
                    const url = URL.createObjectURL(file);
                    onFileSelect(file, url);
                    return 100;
                }
                return prev + 10;
            });
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
        setUploadedFile(null);
        setUploadProgress(0);
        if (inputRef.current) inputRef.current.value = "";
    }, []);

    return (
        <Card className="relative overflow-hidden">
            <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_FORMATS.join(",")}
                onChange={handleInputChange}
                className="hidden"
                id="video-upload"
            />

            <AnimatePresence mode="wait">
                {!uploadedFile && !isUploading ? (
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
              flex flex-col items-center justify-center gap-4 p-8 cursor-pointer
              border-2 border-dashed rounded-xl transition-all duration-300
              ${isDragging
                                ? "border-[#8B5CF6] bg-[#8B5CF6]/10"
                                : "border-[#27272A] hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/5"
                            }
            `}
                    >
                        <motion.div
                            animate={isDragging ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#06B6D4]/20 border border-[#8B5CF6]/30"
                        >
                            <Upload className="h-7 w-7 text-[#8B5CF6]" />
                        </motion.div>

                        <div className="text-center">
                            <p className="text-sm font-medium text-white">
                                {isDragging ? "Drop your video here" : "Drag & drop your video"}
                            </p>
                            <p className="mt-1 text-xs text-[#71717A]">
                                or <span className="text-[#8B5CF6] hover:underline">browse files</span>
                            </p>
                        </div>

                        <p className="text-xs text-[#52525B]">
                            MP4, WebM, MOV, AVI • Max 500MB
                        </p>
                    </motion.label>
                ) : isUploading ? (
                    <motion.div
                        key="uploading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center gap-4 p-8"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#06B6D4]/20 border border-[#8B5CF6]/30"
                        >
                            <Film className="h-7 w-7 text-[#8B5CF6]" />
                        </motion.div>

                        <div className="w-full max-w-xs">
                            <Progress value={uploadProgress} className="h-2" />
                            <p className="mt-2 text-center text-xs text-[#71717A]">
                                Uploading... {uploadProgress}%
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="uploaded"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-4 p-4"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#10B981]/20 border border-[#10B981]/30">
                            <CheckCircle className="h-6 w-6 text-[#10B981]" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {uploadedFile?.name}
                            </p>
                            <p className="text-xs text-[#71717A]">
                                {((uploadedFile?.size || 0) / (1024 * 1024)).toFixed(1)} MB
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleRemove}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71717A] hover:bg-[#27272A] hover:text-white transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}
