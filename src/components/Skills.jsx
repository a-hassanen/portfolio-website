import React, { useState } from 'react';
import portfolioData from '../data/portfolioData.json';
import '../styles/Skills.css';

const Skills = () => {
  const { skills, badges } = portfolioData;
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSkill, setExpandedSkill] = useState(null);

  const toggleSkill = (skill) => {
    setExpandedSkill(expandedSkill === skill ? null : skill);
  };

  // Function to get badges linked to a skill
  const getBadgesForSkill = (skill) => {
    return badges.filter((badge) => badge.skills?.includes(skill));
  };

  return (
    <section id="skills" className="skills-section">
      <div className="skills-header">
        <h2>Skills</h2>
        <div className="skills-search">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      </div>

      {Object.entries(skills).map(([category, skillList], catIndex) => {
        const filteredSkills = skillList.filter((skill) =>
          skill.toLowerCase().includes(searchTerm)
        );
        if (filteredSkills.length === 0) return null;

        return (
          <div key={category} className="skills-category">
            <h3>{category}</h3>
            <ul>
              {filteredSkills.map((skill, skillIndex) => {
                const skillBadges = getBadgesForSkill(skill);
                const isExpanded = expandedSkill === skill;
                const skillId = `skill-${catIndex}-${skillIndex}`;

                return (
                  <li
                    key={skillId}
                    className={`skill-item ${skillBadges.length > 0 ? 'expandable' : ''}`}
                    id={skillId}
                  >
                    <div
                      className="skill-header"
                      onClick={() => skillBadges.length > 0 && toggleSkill(skill)}
                    >
                      <span>{skill}</span>
                      {skillBadges.length > 0 && (
                        <span className={`chevron ${isExpanded ? 'expanded' : ''}`}>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M239 401c9.4 9.4 24.6 9.4 33.9 0L465 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-175 175L81 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9L239 401z"/>
                          </svg>
                        </span>
                      )}
                    </div>

                    {skillBadges.length > 0 && (
                      <div>
                        <span className="badge-count">
                          {skillBadges.length} source(s) of skill evidence
                        </span>
                      </div>
                    )}

                    {isExpanded && skillBadges.length > 0 && (
                      <div className="skill-badges">
                        {skillBadges.map((badge) => {
                          const badgeId = `badge-${badge.name.replace(/\s+/g, '-')}`;
                          return (
                            <span
                              key={badge.name}
                              className="badge"
                              onClick={() => {
                                const element = document.getElementById(badgeId);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                  element.classList.add('highlight');
                                  setTimeout(() => element.classList.remove('highlight'), 2000);
                                }
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              {badge.name}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      {Object.values(skills).every((skillList) =>
        skillList.filter((skill) => skill.toLowerCase().includes(searchTerm))
          .length === 0
      ) && searchTerm && <p>No skills match your search.</p>}
    </section>
  );
};

export default Skills;
