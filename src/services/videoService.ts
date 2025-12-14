/* ==========================================================================
   Smart Privacy Shield - Video Service
   ========================================================================== */

import { api } from './api';
import {
    UploadResponse,
    VideoInteraction,
    PromptData,
    ProcessingResult,
    UploadProgress,
    VideoMetadata
} from '@/types';

/**
 * Video service for handling all video-related API calls
 */
export const videoService = {
    /**
     * Upload a video file to the server
     * @param file - The video file to upload
     * @param onProgress - Optional callback for upload progress
     * @returns Promise with upload response
     */
    async uploadVideo(
        file: File,
        onProgress?: (progress: UploadProgress) => void
    ): Promise<UploadResponse> {
        const formData = new FormData();
        formData.append('video', file);

        const response = await api.post<UploadResponse>('/videos/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress && progressEvent.total) {
                    const progress: UploadProgress = {
                        loaded: progressEvent.loaded,
                        total: progressEvent.total,
                        percentage: Math.round((progressEvent.loaded * 100) / progressEvent.total),
                    };
                    onProgress(progress);
                }
            },
        });

        return response.data;
    },

    /**
     * Get video metadata
     * @param videoId - The video ID
     * @returns Promise with video metadata
     */
    async getVideoMetadata(videoId: string): Promise<VideoMetadata> {
        const response = await api.get<VideoMetadata>(`/videos/${videoId}/metadata`);
        return response.data;
    },

    /**
     * Send user interaction data to the backend
     * @param videoId - The video ID
     * @param interaction - The interaction data
     * @returns Promise with confirmation
     */
    async sendInteraction(
        videoId: string,
        interaction: VideoInteraction
    ): Promise<{ success: boolean }> {
        const response = await api.post(`/videos/${videoId}/interactions`, {
            frameIndex: interaction.frameIndex,
            timestamp: interaction.timestamp,
            clickPosition: interaction.clickPosition,
        });
        return response.data;
    },

    /**
     * Submit prompt with interactions for processing
     * @param promptData - The prompt data including text and interactions
     * @returns Promise with processing result
     */
    async submitPrompt(promptData: PromptData): Promise<ProcessingResult> {
        const response = await api.post<ProcessingResult>('/process', {
            text: promptData.text,
            videoId: promptData.videoId,
            interactions: promptData.interactions.map((i) => ({
                frameIndex: i.frameIndex,
                timestamp: i.timestamp,
                clickPosition: i.clickPosition,
            })),
        });
        return response.data;
    },

    /**
     * Get processing status
     * @param processId - The process ID
     * @returns Promise with processing result
     */
    async getProcessingStatus(processId: string): Promise<ProcessingResult> {
        const response = await api.get<ProcessingResult>(`/process/${processId}/status`);
        return response.data;
    },

    /**
     * Get processed video result
     * @param processId - The process ID
     * @returns Promise with processing result including output URL
     */
    async getProcessedVideo(processId: string): Promise<ProcessingResult> {
        const response = await api.get<ProcessingResult>(`/process/${processId}/result`);
        return response.data;
    },

    /**
     * Delete a video
     * @param videoId - The video ID
     * @returns Promise with confirmation
     */
    async deleteVideo(videoId: string): Promise<{ success: boolean }> {
        const response = await api.delete(`/videos/${videoId}`);
        return response.data;
    },
};

export default videoService;
