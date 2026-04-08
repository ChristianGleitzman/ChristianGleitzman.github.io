'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ProjectCard } from './ProjectCard';

interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    topics: string[];
    default_branch: string;
    fork: boolean;
}

interface ProjectsCarouselProps {
    repos: GitHubRepo[];
    username: string;
}

export const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ repos, username }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollAmount, setScrollAmount] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Calculate scroll amount based on first card width
        const calculateScroll = () => {
            const firstCard = container.querySelector('.project-card');
            if (firstCard) {
                const cardWidth = firstCard.clientWidth;
                const gap = 20; // from CSS
                setScrollAmount(cardWidth + gap);
            }
        };

        // Initial calculation
        calculateScroll();

        // Recalculate on window resize
        window.addEventListener('resize', calculateScroll);
        return () => window.removeEventListener('resize', calculateScroll);
    }, []);

    const handleScroll = (direction: 'left' | 'right') => {
        const container = containerRef.current;
        if (!container) return;

        const scrollValue = direction === 'right' ? scrollAmount : -scrollAmount;
        container.scrollBy({
            left: scrollValue,
            behavior: 'smooth',
        });
    };

    return (
        <section className="projects-section">
            <div className="scroll-buttons-container">
                <button
                    className="scroll-button left"
                    onClick={() => handleScroll('left')}
                    aria-label="Scroll projects left"
                >
                    &#9664;
                </button>
                <button
                    className="scroll-button right"
                    onClick={() => handleScroll('right')}
                    aria-label="Scroll projects right"
                >
                    &#9654;
                </button>
            </div>
            <div className="projects-container" ref={containerRef}>
                {repos.map((repo) => (
                    <ProjectCard key={repo.id} repo={repo} username={username} />
                ))}
            </div>
        </section>
    );
};
