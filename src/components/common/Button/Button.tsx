'use client';

/* ==========================================================================
   Smart Privacy Shield - Button Component
   ========================================================================== */

import React from 'react';
import { ButtonProps } from '@/types';
import styles from './Button.module.css';

/**
 * Reusable Button component with multiple variants and states
 */
export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    type = 'button',
    onClick,
    className = '',
}) => {
    const classNames = [
        styles.btn,
        styles[`btn-${variant}`],
        styles[`btn-${size}`],
        fullWidth ? styles.fullWidth : '',
        loading ? styles.loading : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={classNames}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading && (
                <span className={styles.spinner} aria-hidden="true" />
            )}
            <span className={loading ? styles.textHidden : ''}>
                {children}
            </span>
        </button>
    );
};

export default Button;
