'use client';

/* ==========================================================================
   Smart Privacy Shield - Video Player Component
   ========================================================================== */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { VideoPlayerProps, VideoInteraction, ClickPosition } from '@/types';
import styles from './VideoPlayer.module.css';

const DEFAULT_FPS = 30;

/**
 * Interactive Video Player with click capture and custom controls
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
    src,
    onInteraction,
    fps = DEFAULT_FPS,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [clickMarker, setClickMarker] = useState<{ x: number; y: number } | null>(null);
    const [showControls, setShowControls] = useState(true);
    const [interactions, setInteractions] = useState<VideoInteraction[]>([]);

    // Hide controls after inactivity
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const handleActivity = () => {
            setShowControls(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (isPlaying) setShowControls(false);
            }, 3000);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleActivity);
            container.addEventListener('click', handleActivity);
        }

        return () => {
            clearTimeout(timeout);
            if (container) {
                container.removeEventListener('mousemove', handleActivity);
                container.removeEventListener('click', handleActivity);
            }
        };
    }, [isPlaying]);

    // Handle video click for interaction capture
    const handleVideoClick = useCallback((e: React.MouseEvent<HTMLVideoElement>) => {
        const video = videoRef.current;
        if (!video || !src) return;

        const rect = video.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const clickPosition: ClickPosition = {
            x: Math.round(x),
            y: Math.round(y),
            xPercent: (x / rect.width) * 100,
            yPercent: (y / rect.height) * 100,
        };

        const frameIndex = Math.floor(video.currentTime * fps);

        const interaction: VideoInteraction = {
            id: `interaction-${Date.now()}`,
            frameIndex,
            timestamp: video.currentTime,
            clickPosition,
            createdAt: new Date(),
        };

        // Show click marker
        setClickMarker({ x: clickPosition.xPercent, y: clickPosition.yPercent });
        setTimeout(() => setClickMarker(null), 1000);

        // Update local state
        setInteractions(prev => [...prev, interaction]);

        // Notify parent
        onInteraction(interaction);

        console.log('[VideoPlayer] Interaction captured:', {
            frameIndex,
            timestamp: video.currentTime,
            position: clickPosition,
        });
    }, [src, fps, onInteraction]);

    // Play/Pause toggle
    const togglePlay = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
    }, [isPlaying]);

    // Seek to position
    const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;

        const time = parseFloat(e.target.value);
        video.currentTime = time;
        setCurrentTime(time);
    }, []);

    // Volume control
    const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoRef.current;
        if (!video) return;

        const vol = parseFloat(e.target.value);
        video.volume = vol;
        setVolume(vol);
        setIsMuted(vol === 0);
    }, []);

    // Toggle mute
    const toggleMute = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !isMuted;
        setIsMuted(!isMuted);
    }, [isMuted]);

    // Toggle fullscreen
    const toggleFullscreen = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        if (!isFullscreen) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }, [isFullscreen]);

    // Video event handlers
    const handleLoadedMetadata = useCallback(() => {
        const video = videoRef.current;
        if (video) {
            setDuration(video.duration);
        }
    }, []);

    const handleTimeUpdate = useCallback(() => {
        const video = videoRef.current;
        if (video) {
            setCurrentTime(video.currentTime);
        }
    }, []);

    const handlePlay = useCallback(() => setIsPlaying(true), []);
    const handlePause = useCallback(() => setIsPlaying(false), []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Format time as mm:ss
    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Skip forward/backward
    const skip = useCallback((seconds: number) => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
        }
    }, []);

    if (!src) {
        return (
            <div className={styles.placeholder}>
                <div className={styles.placeholderIcon}>
                    <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                </div>
                <div className={styles.placeholderText}>
                    Upload a video to get started
                </div>
                <div className={styles.placeholderHint}>
                    Click anywhere on the video to mark points of interest
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`${styles.container} ${isFullscreen ? styles.fullscreen : ''}`}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                src={src}
                className={styles.video}
                onClick={handleVideoClick}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onPlay={handlePlay}
                onPause={handlePause}
                playsInline
            />

            {/* Click Marker */}
            {clickMarker && (
                <div
                    className={styles.clickMarker}
                    style={{
                        left: `${clickMarker.x}%`,
                        top: `${clickMarker.y}%`,
                    }}
                >
                    <div className={styles.clickRing} />
                    <div className={styles.clickDot} />
                </div>
            )}

            {/* Center Play Button */}
            {!isPlaying && (
                <button
                    className={styles.centerPlay}
                    onClick={togglePlay}
                    aria-label="Play video"
                >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                </button>
            )}

            {/* Controls */}
            <div className={`${styles.controls} ${showControls ? styles.visible : ''}`}>
                {/* Progress Bar */}
                <div className={styles.progressContainer}>
                    <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className={styles.progressSlider}
                        style={{
                            background: `linear-gradient(to right, var(--accent) ${(currentTime / duration) * 100}%, var(--bg-tertiary) ${(currentTime / duration) * 100}%)`,
                        }}
                    />
                </div>

                <div className={styles.controlsRow}>
                    {/* Left Controls */}
                    <div className={styles.leftControls}>
                        <button
                            className={styles.controlBtn}
                            onClick={togglePlay}
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="6" y="4" width="4" height="16" />
                                    <rect x="14" y="4" width="4" height="16" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                            )}
                        </button>

                        <button
                            className={styles.controlBtn}
                            onClick={() => skip(-10)}
                            aria-label="Rewind 10 seconds"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 17l-5-5 5-5" />
                                <path d="M18 17l-5-5 5-5" />
                            </svg>
                        </button>

                        <button
                            className={styles.controlBtn}
                            onClick={() => skip(10)}
                            aria-label="Forward 10 seconds"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M13 17l5-5-5-5" />
                                <path d="M6 17l5-5-5-5" />
                            </svg>
                        </button>

                        <div className={styles.volumeControl}>
                            <button
                                className={styles.controlBtn}
                                onClick={toggleMute}
                                aria-label={isMuted ? 'Unmute' : 'Mute'}
                            >
                                {isMuted || volume === 0 ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <line x1="23" y1="9" x2="17" y2="15" />
                                        <line x1="17" y1="9" x2="23" y2="15" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    </svg>
                                )}
                            </button>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.1}
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className={styles.volumeSlider}
                            />
                        </div>

                        <span className={styles.time}>
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    {/* Right Controls */}
                    <div className={styles.rightControls}>
                        <div className={styles.interactionCount}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            <span>{interactions.length} point{interactions.length !== 1 ? 's' : ''}</span>
                        </div>

                        <button
                            className={styles.controlBtn}
                            onClick={toggleFullscreen}
                            aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                        >
                            {isFullscreen ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Click Instruction Overlay */}
            {currentTime === 0 && !isPlaying && (
                <div className={styles.instructionOverlay}>
                    <div className={styles.instruction}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Click on video to mark points
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;
