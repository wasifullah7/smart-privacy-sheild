'use client';

/* ==========================================================================
   Smart Privacy Shield - Main Page
   ========================================================================== */

import React, { useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FileUpload } from '@/components/upload/FileUpload';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { PromptInput } from '@/components/prompt/PromptInput';
import { Card } from '@/components/common/Card';
import { VideoInteraction, UploadProgress } from '@/types';
import styles from './page.module.css';

export default function Home() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [interactions, setInteractions] = useState<VideoInteraction[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    setInteractions([]); // Reset interactions for new video
    console.log('[App] Video file selected:', file.name);
  }, []);

  // Handle upload progress
  const handleUploadProgress = useCallback((progress: UploadProgress) => {
    console.log('[App] Upload progress:', progress.percentage + '%');
  }, []);

  // Handle video interaction
  const handleInteraction = useCallback((interaction: VideoInteraction) => {
    setInteractions(prev => [...prev, interaction]);
    console.log('[App] New interaction:', interaction);
  }, []);

  // Handle prompt submission
  const handlePromptSubmit = useCallback(async (text: string) => {
    if (!videoFile) {
      alert('Please upload a video first');
      return;
    }

    setIsProcessing(true);

    console.log('[App] Submitting prompt:', {
      text,
      videoFile: videoFile.name,
      interactions: interactions.length,
    });

    // Simulate API call - replace with actual backend call
    try {
      // In production, you would call:
      // await videoService.submitPrompt({ text, videoId, interactions });

      await new Promise(resolve => setTimeout(resolve, 2000));

      alert(`Prompt submitted successfully!\n\nText: ${text}\nInteractions: ${interactions.length} points marked`);
    } catch (error) {
      console.error('[App] Submit error:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [videoFile, interactions]);

  // Clear interaction
  const clearInteraction = useCallback((id: string) => {
    setInteractions(prev => prev.filter(i => i.id !== id));
  }, []);

  // Clear all interactions
  const clearAllInteractions = useCallback(() => {
    setInteractions([]);
  }, []);

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              AI-Powered Privacy Protection
            </div>
            <h1 className={styles.title}>
              Protect Your Videos with
              <span className={styles.titleGradient}> Smart Privacy</span>
            </h1>
            <p className={styles.subtitle}>
              Upload your video, mark sensitive areas, and let our AI handle the rest.
              Blur faces, mask data, and secure your content in seconds.
            </p>
          </div>
        </section>

        {/* Main Dashboard */}
        <section className={styles.dashboard}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {/* Left Panel - Upload */}
              <div className={styles.panel}>
                <Card variant="glass" className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <h3 className={styles.cardTitle}>Upload Video</h3>
                  </div>
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    onUploadProgress={handleUploadProgress}
                  />
                </Card>

                {/* Interactions List */}
                {interactions.length > 0 && (
                  <Card variant="default" className={styles.interactionsCard}>
                    <div className={styles.cardHeader}>
                      <h4 className={styles.cardSubtitle}>
                        Marked Points ({interactions.length})
                      </h4>
                      <button
                        className={styles.clearBtn}
                        onClick={clearAllInteractions}
                      >
                        Clear All
                      </button>
                    </div>
                    <ul className={styles.interactionsList}>
                      {interactions.map((interaction, index) => (
                        <li key={interaction.id} className={styles.interactionItem}>
                          <div className={styles.interactionInfo}>
                            <span className={styles.interactionIndex}>#{index + 1}</span>
                            <span className={styles.interactionDetails}>
                              Frame {interaction.frameIndex} •
                              ({interaction.clickPosition.xPercent.toFixed(1)}%, {interaction.clickPosition.yPercent.toFixed(1)}%)
                            </span>
                          </div>
                          <button
                            className={styles.removeBtn}
                            onClick={() => clearInteraction(interaction.id)}
                            aria-label="Remove point"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>

              {/* Center Panel - Video Player */}
              <div className={styles.videoPanel}>
                <Card variant="glass" className={styles.videoCard}>
                  <VideoPlayer
                    src={videoSrc}
                    onInteraction={handleInteraction}
                  />
                </Card>
              </div>

              {/* Right Panel - Prompt */}
              <div className={styles.panel}>
                <Card variant="glass" className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <h3 className={styles.cardTitle}>AI Prompt</h3>
                  </div>
                  <p className={styles.cardDescription}>
                    Tell our AI what to do with the marked areas in your video.
                  </p>
                  <PromptInput
                    onSubmit={handlePromptSubmit}
                    disabled={isProcessing || !videoFile}
                  />
                </Card>

                {/* Features Preview */}
                <Card variant="gradient" hover className={styles.featuresCard}>
                  <h4 className={styles.featuresTitle}>What you can do</h4>
                  <ul className={styles.featuresList}>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIcon}>🎭</span>
                      <span>Blur or pixelate faces</span>
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIcon}>🔒</span>
                      <span>Mask sensitive data</span>
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIcon}>✨</span>
                      <span>Apply custom effects</span>
                    </li>
                    <li className={styles.featureItem}>
                      <span className={styles.featureIcon}>⚡</span>
                      <span>Real-time processing</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.stats}>
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>99.9%</span>
                <span className={styles.statLabel}>Detection Accuracy</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>&lt;5s</span>
                <span className={styles.statLabel}>Processing Time</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>100%</span>
                <span className={styles.statLabel}>Data Privacy</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>24/7</span>
                <span className={styles.statLabel}>Availability</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
