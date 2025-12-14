'use client';

/* ==========================================================================
   Smart Privacy Shield - Header Component
   ========================================================================== */

import React from 'react';
import styles from './Header.module.css';

/**
 * Application Header with branding and navigation
 */
export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Logo and Brand */}
                <div className={styles.brand}>
                    <div className={styles.logoWrapper}>
                        <svg
                            className={styles.logo}
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#7C3AED" />
                                    <stop offset="100%" stopColor="#06B6D4" />
                                </linearGradient>
                            </defs>
                            <circle cx="20" cy="20" r="18" stroke="url(#logoGradient)" strokeWidth="2" fill="none" />
                            <path
                                d="M20 8C13.373 8 8 13.373 8 20s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10z"
                                fill="url(#logoGradient)"
                                opacity="0.3"
                            />
                            <path
                                d="M20 14a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 110 8 4 4 0 010-8z"
                                fill="url(#logoGradient)"
                            />
                            <circle cx="20" cy="20" r="2" fill="url(#logoGradient)" />
                        </svg>
                    </div>
                    <div className={styles.brandText}>
                        <span className={styles.brandName}>Smart Privacy</span>
                        <span className={styles.brandHighlight}>Shield</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className={styles.nav}>
                    <a href="#features" className={styles.navLink}>Features</a>
                    <a href="#how-it-works" className={styles.navLink}>How it Works</a>
                    <a href="#pricing" className={styles.navLink}>Pricing</a>
                </nav>

                {/* Actions */}
                <div className={styles.actions}>
                    <button className={styles.btnGhost}>Sign In</button>
                    <button className={styles.btnPrimary}>Get Started</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
