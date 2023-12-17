import React from 'react';

const SkillsList = ({ skills }) => {
    return (
        <div>
            <h2>Skills</h2>
            <ul>
                {skills.map(skill => (
                    <li key={skill._id}>{skill.skillName}</li>
                ))}
            </ul>
        </div>
    );
};

export default SkillsList;
