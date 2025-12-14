'use client';

/* ==========================================================================
   Smart Privacy Shield - Prompt Input Component
   ========================================================================== */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { PromptInputProps } from '@/types';
import styles from './PromptInput.module.css';

const DEFAULT_MAX_LENGTH = 2000;
const DEFAULT_PLACEHOLDER = 'Describe what you want to do with the selected points... (e.g., "Blur the faces in these areas" or "Apply privacy mask to selected regions")';

/**
 * Prompt Input component with auto-resize and keyboard shortcuts
 */
export const PromptInput: React.FC<PromptInputProps> = ({
    onSubmit,
    disabled = false,
    placeholder = DEFAULT_PLACEHOLDER,
    maxLength = DEFAULT_MAX_LENGTH,
}) => {
    const [text, setText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
        }
    }, [text]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= maxLength) {
            setText(value);
        }
    }, [maxLength]);

    const handleSubmit = useCallback(async () => {
        if (!text.trim() || disabled || isSubmitting) return;

        setIsSubmitting(true);

        try {
            await onSubmit(text.trim());
            setText('');

            // Reset textarea height
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        } catch (error) {
            console.error('[PromptInput] Submit error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [text, disabled, isSubmitting, onSubmit]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Ctrl/Cmd + Enter to submit
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    }, [handleSubmit]);

    const characterCount = text.length;
    const characterPercentage = (characterCount / maxLength) * 100;
    const isNearLimit = characterPercentage > 80;
    const isAtLimit = characterCount >= maxLength;

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.container} ${isFocused ? styles.focused : ''} ${disabled ? styles.disabled : ''}`}>
                <div className={styles.inputArea}>
                    <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        disabled={disabled || isSubmitting}
                        className={styles.textarea}
                        rows={1}
                        aria-label="Enter your prompt"
                    />
                </div>

                <div className={styles.footer}>
                    <div className={styles.hints}>
                        <span className={styles.shortcut}>
                            <kbd>Ctrl</kbd>
                            <span>+</span>
                            <kbd>Enter</kbd>
                            to send
                        </span>
                    </div>

                    <div className={styles.actions}>
                        <span className={`${styles.charCount} ${isNearLimit ? styles.warning : ''} ${isAtLimit ? styles.error : ''}`}>
                            {characterCount}/{maxLength}
                        </span>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!text.trim() || disabled || isSubmitting}
                            className={styles.submitBtn}
                            aria-label="Submit prompt"
                        >
                            {isSubmitting ? (
                                <span className={styles.spinner} />
                            ) : (
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
                <button
                    type="button"
                    className={styles.quickAction}
                    onClick={() => setText('Blur all faces in the selected areas')}
                    disabled={disabled}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                    Blur faces
                </button>
                <button
                    type="button"
                    className={styles.quickAction}
                    onClick={() => setText('Apply privacy mask to hide sensitive information')}
                    disabled={disabled}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                    </svg>
                    Privacy mask
                </button>
                <button
                    type="button"
                    className={styles.quickAction}
                    onClick={() => setText('Pixelate the selected regions')}
                    disabled={disabled}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    Pixelate
                </button>
            </div>
        </div>
    );
};

export default PromptInput;
