import React from 'react';

interface Skill {
  name: string;
  proficiency: number; // 0-100
  category: string;
}

const skills: Skill[] = [
  // Languages
  { name: 'Java', proficiency: 95, category: 'Languages' },
  { name: 'Python', proficiency: 85, category: 'Languages' },
  { name: 'SQL', proficiency: 80, category: 'Languages' },
  // Tools
  { name: 'Git/GitHub', proficiency: 90, category: 'Tools' },
  { name: 'Linux/Unix', proficiency: 85, category: 'Tools' },
];

const categories = ['Languages', 'Tools'];

export const SkillsMatrix: React.FC = () => {
  return (
    <section className="skills-matrix">
      <h3 className="section-title">Skills & Proficiency</h3>
      <p className="skills-disclaimer">
        <em>Percentages are relative to my own experience. I'm comfortable building real projects with these technologies, not claiming expertise in every edge case.</em>
      </p>
      {categories.map((category) => (
        <div key={category} className="skill-category">
          <h4 className="category-title">{category}</h4>
          <div className="skills-grid">
            {skills
              .filter((skill) => skill.category === category)
              .map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.proficiency}%</span>
                  </div>
                  <div className="proficiency-bar">
                    <div
                      className="proficiency-fill"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
};
