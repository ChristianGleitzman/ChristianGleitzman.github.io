import React from 'react';

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

export default async function ProjectsPage() {
    const username = 'ChristianGleitzman';
    const excludedRepos = ['ChristianGleitzman.github.io', 'portfolio-website'];
    
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
    
    if (!res.ok) {
        return <div className="content"><p>Failed to load projects.</p></div>;
    }

    const repos: GitHubRepo[] = await res.json();

    const portfolioProjects = repos.filter(repo => 
        !repo.fork && 
        !excludedRepos.includes(repo.name) && 
        repo.topics.includes('portfolio')
    );

    return (
        <div className="content projects">
            <section className="projects-intro">
                <h2 className="section-title">My Projects</h2>
                <p className="section-text">
                    A selection of projects demonstrating my proficiency in systems design, software development, and algorithmic problem-solving. These projects highlight my commitment to making useful and impactful software. You can catch a glimpse of them below or view the full source repositories on my GitHub.
                </p>
            </section>

            <section className="projects-section">
                <div className="projects-container">
                    {portfolioProjects.map((repo) => {
                        const imageUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/preview.png`;
                        
                        return (
                            <article key={repo.id} className="project-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                                <h3 className="project-title">{repo.name}</h3>
                                <div className="project-images">
                                    <img src={imageUrl} alt={`${repo.name} preview`} style={{ width: '100%', borderRadius: '5px' }} />
                                </div>
                                <p className="project-description" style={{ flexGrow: 1 }}>
                                    {repo.description ?? "No description provided."}
                                </p>
                                <div className="project-links" style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                                    <a href={repo.html_url} className="btn" target="_blank" rel="noopener noreferrer">View Code</a>
                                    {repo.homepage && (
                                        <a href={repo.homepage} className="btn" target="_blank" rel="noopener noreferrer">Live Demo</a>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}