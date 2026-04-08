'use client';

import React, { useState } from 'react';

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

interface ProjectCardProps {
    repo: GitHubRepo;
    username: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ repo, username }) => {
    const [imageError, setImageError] = useState(false);
    const [triedFallback, setTriedFallback] = useState(false);

    // Try .PNG first (uppercase), then png (lowercase)
    const currentImageUrl = triedFallback
        ? `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/preview.png`
        : `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/preview.PNG`;

    const handleImageError = () => {
        if (!triedFallback) {
            // Try the lowercase .png next time
            setTriedFallback(true);
        } else {
            // Both failed, show placeholder
            setImageError(true);
        }
    };

    return (
        <article className="project-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <h3 className="project-title">{repo.name}</h3>
            <div className="project-images">
                {!imageError ? (
                    <img
                        key={currentImageUrl}
                        src={currentImageUrl}
                        alt={`${repo.name} preview`}
                        style={{ width: '70%', height: 'auto', borderRadius: '8px', marginBottom: '10px', display: 'block', margin: '0 auto 10px auto' }}
                        onError={handleImageError}
                    />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '200px',
                        backgroundColor: 'rgba(162, 255, 220, 0.05)',
                        border: '2px dashed rgba(162, 255, 220, 0.2)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(162, 255, 220, 0.4)',
                        fontSize: '0.9rem',
                        fontStyle: 'italic'
                    }}>
                        Add preview image to repo
                    </div>
                )}
            </div>
            <p className="project-description" style={{ flexGrow: 1 }}>
                {repo.description ?? "No description provided."}
            </p>
            <div className="project-links" style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                <a href={repo.html_url} className="btn" target="_blank" rel="noopener noreferrer">
                    View Code
                </a>
                {repo.homepage && (
                    <a href={repo.homepage} className="btn" target="_blank" rel="noopener noreferrer">
                        Live Demo
                    </a>
                )}
            </div>
        </article>
    );
};
