'use client';

/* ==========================================================================
   Smart Privacy Shield - Card Component
   ========================================================================== */

import React from 'react';
import { CardProps } from '@/types';
import styles from './Card.module.css';

/**
 * Reusable Card component with glassmorphism and gradient variants
 */
export const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    hover = false,
    className = '',
}) => {
    const classNames = [
        styles.card,
        styles[`card-${variant}`],
        hover ? styles.cardHover : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={classNames}>
            {children}
        </div>
    );
};

export default Card;
