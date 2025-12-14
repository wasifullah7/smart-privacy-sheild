"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, MousePointer2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ClickPoint {
    id: string;
    x: number;
    y: number;
    xPercent: number;
    yPercent: number;
    frameIndex: number;
    timestamp: number;
}

interface VideoCanvasProps {
    videoUrl: string | null;
    onPointSelect: (point: ClickPoint) => void;
}

export function VideoCanvas({ videoUrl, onPointSelect }: VideoCanvasProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [clickPoints, setClickPoints] = useState<ClickPoint[]>([]);
    const [showRipple, setShowRipple] = useState<{ x: number; y: number } | null>(null);
    const [currentFrame, setCurrentFrame] = useState(0);

    const FPS = 30;

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => {
            setCurrentTime(video.currentTime);
            setCurrentFrame(Math.floor(video.currentTime * FPS));
        };

        video.addEventListener("timeupdate", updateTime);
        video.addEventListener("loadedmetadata", () => setDuration(video.duration));

        return () => {
            video.removeEventListener("timeupdate", updateTime);
        };
    }, [videoUrl]);

    const togglePlay = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const handleVideoClick = useCallback((e: React.MouseEvent<HTMLVideoElement>) => {
        const video = videoRef.current;
        if (!video || !videoUrl) return;

        const rect = video.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const point: ClickPoint = {
            id: `point-${Date.now()}`,
            x,
            y,
            xPercent: (x / rect.width) * 100,
            yPercent: (y / rect.height) * 100,
            frameIndex: Math.floor(video.currentTime * FPS),
            timestamp: video.currentTime,
        };

        setClickPoints((prev) => [...prev, point]);
        onPointSelect(point);

        // Show ripple effect
        setShowRipple({ x: point.xPercent, y: point.yPercent });
        setTimeout(() => setShowRipple(null), 600);
    }, [videoUrl, onPointSelect]);

    const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = parseFloat(e.target.value);
    }, []);

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    if (!videoUrl) {
        return (
            <Card className="relative aspect-video flex flex-col items-center justify-center gap-4 bg-[#0A0A0B] border-[#27272A]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#141415] border border-[#27272A]">
                        <MousePointer2 className="h-8 w-8 text-[#52525B]" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-[#71717A]">
                            Upload a video to get started
                        </p>
                        <p className="mt-1 text-xs text-[#52525B]">
                            Click on the video to select objects for tracking
                        </p>
                    </div>
                </motion.div>
            </Card>
        );
    }

    return (
        <Card className="relative overflow-hidden bg-[#0A0A0B] p-0 border-[#27272A]">
            {/* Video Container */}
            <div ref={containerRef} className="relative aspect-video bg-black">
                <video
                    ref={videoRef}
                    src={videoUrl}
                    className="h-full w-full object-contain cursor-crosshair"
                    onClick={handleVideoClick}
                    muted={isMuted}
                    playsInline
                />

                {/* Click Points Overlay */}
                <AnimatePresence>
                    {clickPoints.map((point) => (
                        <motion.div
                            key={point.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute pointer-events-none"
                            style={{
                                left: `${point.xPercent}%`,
                                top: `${point.yPercent}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <div className="h-6 w-6 rounded-full border-2 border-[#8B5CF6] bg-[#8B5CF6]/30 shadow-lg shadow-[#8B5CF6]/50" />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Ripple Effect */}
                <AnimatePresence>
                    {showRipple && (
                        <motion.div
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 3, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute pointer-events-none"
                            style={{
                                left: `${showRipple.x}%`,
                                top: `${showRipple.y}%`,
                                transform: "translate(-50%, -50%)",
                            }}
                        >
                            <div className="h-8 w-8 rounded-full border-2 border-[#06B6D4]" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Center Play Button */}
                <AnimatePresence>
                    {!isPlaying && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={togglePlay}
                            className="absolute inset-0 m-auto h-16 w-16 flex items-center justify-center rounded-full bg-[#8B5CF6] text-white shadow-xl shadow-[#8B5CF6]/30"
                        >
                            <Play className="h-7 w-7 ml-1" fill="currentColor" />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Frame Counter */}
                <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="font-mono text-xs">
                        Frame: {currentFrame}
                    </Badge>
                </div>

                {/* Points Counter */}
                {clickPoints.length > 0 && (
                    <div className="absolute top-4 left-4">
                        <Badge variant="default" className="text-xs">
                            {clickPoints.length} point{clickPoints.length !== 1 ? "s" : ""} selected
                        </Badge>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="border-t border-[#27272A] bg-[#141415] p-4">
                {/* Progress Bar */}
                <div className="mb-3">
                    <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-[#27272A] rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-3.5
              [&::-webkit-slider-thumb]:h-3.5
              [&::-webkit-slider-thumb]:bg-[#8B5CF6]
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:shadow-[#8B5CF6]/50
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:hover:scale-125
            "
                        style={{
                            background: `linear-gradient(to right, #8B5CF6 ${(currentTime / duration) * 100}%, #27272A ${(currentTime / duration) * 100}%)`,
                        }}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={togglePlay}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#27272A] text-white hover:bg-[#3F3F46] transition-colors"
                        >
                            {isPlaying ? (
                                <Pause className="h-4 w-4" fill="currentColor" />
                            ) : (
                                <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
                            )}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMuted(!isMuted)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#71717A] hover:bg-[#27272A] hover:text-white transition-colors"
                        >
                            {isMuted ? (
                                <VolumeX className="h-4 w-4" />
                            ) : (
                                <Volume2 className="h-4 w-4" />
                            )}
                        </motion.button>

                        <span className="text-xs text-[#71717A] font-mono ml-2">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#71717A] hover:bg-[#27272A] hover:text-white transition-colors"
                    >
                        <Maximize className="h-4 w-4" />
                    </motion.button>
                </div>
            </div>
        </Card>
    );
}
