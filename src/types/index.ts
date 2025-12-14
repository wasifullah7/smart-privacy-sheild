/* ==========================================================================
   Smart Privacy Shield - Type Definitions
   ========================================================================== */

/**
 * Represents a click interaction on the video player
 */
export interface ClickPosition {
    x: number;
    y: number;
    /** Percentage position relative to video dimensions */
    xPercent: number;
    yPercent: number;
}

/**
 * Represents a single video interaction event
 */
export interface VideoInteraction {
    id: string;
    frameIndex: number;
    timestamp: number;
    clickPosition: ClickPosition;
    createdAt: Date;
}

/**
 * Data structure for prompt submission
 */
export interface PromptData {
    text: string;
    videoId: string | null;
    interactions: VideoInteraction[];
}

/**
 * Video upload response from backend
 */
export interface UploadResponse {
    id: string;
    filename: string;
    status: 'uploaded' | 'processing' | 'completed' | 'error';
    url?: string;
    error?: string;
}

/**
 * Video metadata
 */
export interface VideoMetadata {
    id: string;
    filename: string;
    duration: number;
    width: number;
    height: number;
    fps: number;
    frameCount: number;
}

/**
 * Processing result from backend
 */
export interface ProcessingResult {
    id: string;
    videoId: string;
    status: 'pending' | 'processing' | 'completed' | 'error';
    outputUrl?: string;
    error?: string;
    progress?: number;
}

/**
 * API Error response
 */
export interface ApiError {
    message: string;
    code: string;
    details?: Record<string, unknown>;
}

/**
 * Upload progress event
 */
export interface UploadProgress {
    loaded: number;
    total: number;
    percentage: number;
}

/**
 * Button component props
 */
export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
}

/**
 * Card component props
 */
export interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'glass' | 'gradient';
    hover?: boolean;
    className?: string;
}

/**
 * File upload component props
 */
export interface FileUploadProps {
    onFileSelect: (file: File) => void;
    onUploadProgress?: (progress: UploadProgress) => void;
    acceptedFormats?: string[];
    maxSizeInMB?: number;
    disabled?: boolean;
}

/**
 * Video player component props
 */
export interface VideoPlayerProps {
    src: string | null;
    onInteraction: (interaction: VideoInteraction) => void;
    fps?: number;
}

/**
 * Prompt input component props
 */
export interface PromptInputProps {
    onSubmit: (text: string) => void;
    disabled?: boolean;
    placeholder?: string;
    maxLength?: number;
}
