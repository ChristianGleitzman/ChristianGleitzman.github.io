import React from 'react';

interface Skill {
  name: string;
  icon: string;
  category: string;
}

const skillsData: Skill[] = [
  // Languages
  { name: 'Java', icon: '{}', category: 'Languages' },
  { name: 'Python', icon: '◇', category: 'Languages' },
  { name: 'SQL', icon: '◆', category: 'Languages' },
  
  // Tools & Frameworks
  { name: 'Git/GitHub', icon: '◎', category: 'Tools & Frameworks' },
  { name: 'Linux/Unix', icon: '▢', category: 'Tools & Frameworks' },
  { name: 'Docker', icon: '⬢', category: 'Tools & Frameworks' },
];

const categories = ['Languages', 'Tools & Frameworks'];

export const SkillsGrid: React.FC = () => {
  return (
    <section className="skills-section">
      <h3 className="section-title">Technical Skills</h3>
      <div className="skills-container">
        {categories.map((category) => (
          <div key={category} className="skill-category-group">
            <h4 className="category-label">{category}</h4>
            <div className="skills-badge-grid">
              {skillsData
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <div key={skill.name} className="skill-badge">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-tag">{skill.name}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
