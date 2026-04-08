"use client";

import React from 'react';
import Link from 'next/link';

interface SoundButtonProps {
    readonly href: string;
    readonly text: string;
    readonly soundFile: string;
}

export const SoundButton: React.FC<SoundButtonProps> = ({ href, text, soundFile }) => {
    const playHoverSound = () => {
        const audio = new Audio(`/audio/${soundFile}.mp3`);
        audio.volume = 0.1;
        audio.play().catch((e) => console.log("Audio autoplay blocked by browser"));
    };

    return (
        <Link href={href} className="btn" onMouseEnter={playHoverSound}>
            {text}
        </Link>
    );
};