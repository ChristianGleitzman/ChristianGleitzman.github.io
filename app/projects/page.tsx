import React from 'react';
import { ProjectsGrid } from '@/components/ProjectsCarousel';
import { ManualProjects } from '@/components/ManualProjects';

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

            <div style={{ marginBottom: '3rem' }}>
                <h3 className="section-title" style={{ marginBottom: '1.5rem' }}>Featured Work</h3>
                <ManualProjects />
            </div>

            <div>
                <h3 className="section-title" style={{ marginBottom: '1.5rem' }}>Additional Projects</h3>
                <ProjectsGrid repos={portfolioProjects} username={username} />
            </div>
        </div>
    );
}