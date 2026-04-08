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

interface ProjectsGridProps {
    repos: GitHubRepo[];
    username: string;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ repos, username }) => {
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement;
                        const cardIndex = parseInt(target.dataset.index || '0');
                        
                        // Add a small delay for staggered animation
                        setTimeout(() => {
                            setVisibleCards(prev => new Set([...prev, cardIndex]));
                        }, cardIndex * 150); // 150ms stagger
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, [repos.length]);

    if (repos.length === 0) {
        return (
            <div className="no-projects">
                <p>No GitHub projects found. Make sure your repositories have the 'portfolio' topic tag.</p>
            </div>
        );
    }

    return (
        <section className="github-projects-grid">
            {repos.map((repo, index) => (
                <div
                    key={repo.id}
                    ref={(el) => (cardRefs.current[index] = el)}
                    className={`animated-project-card ${visibleCards.has(index) ? 'visible' : ''}`}
                    data-index={index}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <ProjectCard repo={repo} username={username} />
                </div>
            ))}
        </section>
    );
};
