'use client';

/* ==========================================================================
   Smart Privacy Shield - File Upload Component
   ========================================================================== */

import React, { useState, useRef, useCallback } from 'react';
import { FileUploadProps, UploadProgress } from '@/types';
import styles from './FileUpload.module.css';

const ACCEPTED_VIDEO_FORMATS = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime',
    'video/x-msvideo',
];

const MAX_FILE_SIZE_MB = 500;

/**
 * Drag & Drop File Upload component with progress tracking
 */
export const FileUpload: React.FC<FileUploadProps> = ({
    onFileSelect,
    onUploadProgress,
    acceptedFormats = ACCEPTED_VIDEO_FORMATS,
    maxSizeInMB = MAX_FILE_SIZE_MB,
    disabled = false,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = useCallback((file: File): string | null => {
        if (!acceptedFormats.includes(file.type)) {
            return 'Invalid file format. Please upload a video file (MP4, WebM, OGG, MOV, AVI).';
        }
        if (file.size > maxSizeInMB * 1024 * 1024) {
            return `File size exceeds ${maxSizeInMB}MB limit.`;
        }
        return null;
    }, [acceptedFormats, maxSizeInMB]);

    const handleFile = useCallback((file: File) => {
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        setSelectedFile(file);

        // Generate video preview thumbnail
        const videoUrl = URL.createObjectURL(file);
        setPreview(videoUrl);

        // Trigger parent callback
        onFileSelect(file);

        // Simulate upload progress (replace with actual upload)
        if (onUploadProgress) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                const uploadData: UploadProgress = {
                    loaded: (file.size * progress) / 100,
                    total: file.size,
                    percentage: progress,
                };
                setUploadProgress(uploadData);
                onUploadProgress(uploadData);

                if (progress >= 100) {
                    clearInterval(interval);
                }
            }, 200);
        }
    }, [validateFile, onFileSelect, onUploadProgress]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragging(true);
        }
    }, [disabled]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    }, [disabled, handleFile]);

    const handleClick = useCallback(() => {
        if (!disabled && fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, [disabled]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    }, [handleFile]);

    const handleRemove = useCallback(() => {
        setSelectedFile(null);
        setPreview(null);
        setUploadProgress(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <div className={styles.wrapper}>
            <input
                ref={fileInputRef}
                type="file"
                accept={acceptedFormats.join(',')}
                onChange={handleFileChange}
                className={styles.hiddenInput}
                disabled={disabled}
            />

            {!selectedFile ? (
                <div
                    className={`${styles.dropzone} ${isDragging ? styles.dragging : ''} ${disabled ? styles.disabled : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload video file"
                >
                    <div className={styles.icon}>
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                    </div>
                    <div className={styles.text}>
                        <span className={styles.primary}>
                            Drag & drop your video here
                        </span>
                        <span className={styles.secondary}>
                            or <span className={styles.highlight}>browse files</span>
                        </span>
                    </div>
                    <div className={styles.formats}>
                        MP4, WebM, OGG, MOV, AVI • Max {maxSizeInMB}MB
                    </div>
                </div>
            ) : (
                <div className={styles.preview}>
                    <div className={styles.videoPreview}>
                        {preview && (
                            <video
                                src={preview}
                                className={styles.videoThumbnail}
                                muted
                                playsInline
                            />
                        )}
                        <div className={styles.playIcon}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                        </div>
                    </div>
                    <div className={styles.fileInfo}>
                        <div className={styles.fileName}>{selectedFile.name}</div>
                        <div className={styles.fileSize}>{formatFileSize(selectedFile.size)}</div>
                        {uploadProgress && uploadProgress.percentage < 100 && (
                            <div className={styles.progressWrapper}>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progressFill}
                                        style={{ width: `${uploadProgress.percentage}%` }}
                                    />
                                </div>
                                <span className={styles.progressText}>
                                    {uploadProgress.percentage}%
                                </span>
                            </div>
                        )}
                        {uploadProgress && uploadProgress.percentage === 100 && (
                            <div className={styles.uploadComplete}>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Upload complete
                            </div>
                        )}
                    </div>
                    <button
                        className={styles.removeBtn}
                        onClick={handleRemove}
                        aria-label="Remove file"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
            )}

            {error && (
                <div className={styles.error}>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
