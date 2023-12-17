import React, { useEffect, useState } from 'react'
import UserDetail from '../Templates/UserDetail';
import SkillsList from '../Templates/SkillsList';
import ExperienceList from '../Templates/ExperienceList';

const DeveloperDashboard = () => {
    const [applicationDetails, setApplicationDetails] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/api/developer', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
            .then((res) => res.json())
            .then((data) => { setApplicationDetails(data) })
            .catch((err) => console.log(err));
    }, [])

    return (
        <>
            <div>
                <h3>Developer Onboarding Applications</h3>
                {applicationDetails.map((userData, index) => {
                    return (
                        <div key={index + 1} className="border border-dark-subtle w-80 p-4 mb-4">
                            <UserDetail user={userData} />
                            <SkillsList skills={userData.selectedSkills} />
                            <ExperienceList experiences={userData.professionalExperience} type="professional" />
                            <ExperienceList experiences={userData.educationalExperience} type="educational" />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default DeveloperDashboard
