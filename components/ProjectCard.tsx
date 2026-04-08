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
    const [currentImageUrl, setCurrentImageUrl] = useState(
        `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/preview.png`
    );

    const handleImageError = () => {
        const pngUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/preview.png`;
        const PNGUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/preview.PNG`;
        
        // If current URL is .png, try .PNG
        if (currentImageUrl.endsWith('.png')) {
            setCurrentImageUrl(PNGUrl);
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
                        src={currentImageUrl}
                        alt={`${repo.name} preview`}
                        style={{ width: '100%', height: 'auto', borderRadius: '5px', marginBottom: '10px', display: 'block' }}
                        onError={handleImageError}
                    />
                ) : (
                    <div
                        style={{
                            width: '100%',
                            height: '200px',
                            backgroundColor: '#1a1a1a',
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '10px',
                            color: '#888',
                            fontSize: '0.9rem',
                            border: '1px solid #333',
                        }}
                    >
                        No preview image
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
