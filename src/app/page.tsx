"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { VideoUpload } from "@/components/VideoUpload";
import { VideoCanvas } from "@/components/VideoCanvas";
import { PromptInput } from "@/components/PromptInput";
import { ActionButton } from "@/components/ActionButton";
import { LoadingState } from "@/components/LoadingState";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Sparkles, Shield, X } from "lucide-react";

interface ClickPoint {
  id: string;
  x: number;
  y: number;
  xPercent: number;
  yPercent: number;
  frameIndex: number;
  timestamp: number;
}

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [selectedPoints, setSelectedPoints] = useState<ClickPoint[]>([]);
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
  const [progress, setProgress] = useState(0);

  const handleFileSelect = useCallback((file: File, url: string) => {
    setVideoFile(file);
    setVideoUrl(url);
    setSelectedPoints([]);
    setStatus("idle");
    setPrompt("");
  }, []);

  const handlePointSelect = useCallback((point: ClickPoint) => {
    setSelectedPoints((prev) => [...prev, point]);
  }, []);

  const handlePointRemove = useCallback((pointId: string) => {
    setSelectedPoints((prev) => prev.filter((p) => p.id !== pointId));
  }, []);

  const handleApplyTracking = useCallback(async () => {
    if (!videoFile || selectedPoints.length === 0 || !prompt) return;

    setStatus("processing");
    setProgress(0);

    // Simulate processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("success");
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  }, [videoFile, selectedPoints, prompt]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Header />

      <main className="pt-24 pb-12 px-4 md:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <Badge variant="default" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Privacy
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Protect Your Videos with{" "}
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
                Smart AI
              </span>
            </h1>
            <p className="text-[#71717A] max-w-lg mx-auto text-sm md:text-base">
              Upload a video, click to select objects or people, and let our AI
              automatically track and blur them.
            </p>
          </motion.div>

          {/* Main Workspace - Improved Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start"
          >
            {/* Left Panel - Controls */}
            <motion.div variants={itemVariants} className="space-y-4">
              {/* Step 1: Upload */}
              <Card className="!p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#8B5CF6] text-white text-xs font-bold">
                    1
                  </span>
                  <h2 className="text-sm font-semibold text-white">Upload Video</h2>
                </div>
                <VideoUpload onFileSelect={handleFileSelect} />
              </Card>

              {/* Step 2: Prompt */}
              <Card className="!p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#8B5CF6] text-white text-xs font-bold">
                    2
                  </span>
                  <h2 className="text-sm font-semibold text-white">Describe Action</h2>
                </div>
                <PromptInput
                  value={prompt}
                  onChange={setPrompt}
                  disabled={!videoUrl}
                />
              </Card>

              {/* Selected Points */}
              {selectedPoints.length > 0 && (
                <Card className="!p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-white">
                      Selected Points ({selectedPoints.length})
                    </span>
                    <button
                      onClick={() => setSelectedPoints([])}
                      className="text-xs text-[#EF4444] hover:underline"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPoints.map((point) => (
                      <motion.div
                        key={point.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="group relative"
                      >
                        <Badge variant="secondary" className="text-xs pr-6">
                          <Target className="h-2.5 w-2.5 mr-1" />
                          Frame {point.frameIndex}
                        </Badge>
                        <button
                          onClick={() => handlePointRemove(point.id)}
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-[#3F3F46] hover:bg-[#EF4444] flex items-center justify-center transition-colors"
                        >
                          <X className="h-2.5 w-2.5 text-white" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Step 3: Apply */}
              <Card className="!p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#8B5CF6] text-white text-xs font-bold">
                    3
                  </span>
                  <h2 className="text-sm font-semibold text-white">Apply Tracking</h2>
                </div>
                <ActionButton
                  onClick={handleApplyTracking}
                  loading={status === "processing"}
                  disabled={!videoUrl || selectedPoints.length === 0 || !prompt}
                />
                {videoUrl && selectedPoints.length === 0 && (
                  <p className="text-xs text-[#52525B] mt-3 text-center">
                    👆 Click on the video to select points to track
                  </p>
                )}
                {videoUrl && selectedPoints.length > 0 && !prompt && (
                  <p className="text-xs text-[#52525B] mt-3 text-center">
                    ✍️ Enter a prompt to describe the action
                  </p>
                )}
              </Card>

              {/* Loading/Success State */}
              {status !== "idle" && (
                <LoadingState
                  status={status}
                  progress={progress}
                  message="Tracking and applying effects..."
                />
              )}
            </motion.div>

            {/* Right Panel - Video Canvas */}
            <motion.div variants={itemVariants} className="lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-[#A1A1AA] flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#8B5CF6]" />
                  Video Canvas
                </h2>
                <span className="text-xs text-[#52525B]">
                  Click to select • Hover points to remove
                </span>
              </div>
              <VideoCanvas
                videoUrl={videoUrl}
                selectedPoints={selectedPoints}
                onPointSelect={handlePointSelect}
                onPointRemove={handlePointRemove}
              />
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                icon: Target,
                title: "Precise Selection",
                description: "Click anywhere on the video to mark areas for privacy protection",
              },
              {
                icon: Sparkles,
                title: "AI Tracking",
                description: "Our AI automatically tracks selected objects throughout the video",
              },
              {
                icon: Shield,
                title: "Privacy Protected",
                description: "Blur, pixelate, or mask sensitive content with a single click",
              },
            ].map((feature, i) => (
              <Card key={i} hover gradient className="!p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 mb-3">
                  <feature.icon className="h-5 w-5 text-[#8B5CF6]" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-[#71717A]">{feature.description}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
