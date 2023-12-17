// ExperienceList.js
import React from 'react';

const ExperienceList = ({ experiences, type }) => {
    return (
        <div>
            <h2>{type === 'professional' ? 'Professional Experience' : 'Educational Experience'}</h2>
            <ul>
                {experiences.map(experience => (
                    <li style={{listStyleType: "number"}} key={experience._id}>
                        {type === 'professional' ? (
                            <div>
                                <p>Company: {experience.companyName}</p>
                                <p>Skills Used: {experience.skillsUsed.map(skill => skill.skillName).join(', ')}</p>
                                <p>Time Period: {experience.timePeriod} years</p>
                            </div>
                        ) : (
                            <div>
                                <p>School: {experience.schoolName}</p>
                                <p>Time Period: {experience.timePeriod} years</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExperienceList;
