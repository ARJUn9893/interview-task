import React, { useEffect, useState } from 'react'
import UserDetail from '../Templates/UserDetail';
import SkillsList from '../Templates/SkillsList';
import ExperienceList from '../Templates/ExperienceList';
import AddSkills from './AddSkills';

const ClientDashboard = () => {
    const [applicationDetails, setApplicationDetails] = useState([])

    const [skills, setSkills] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/client/developer', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
            .then((res) => res.json())
            .then((data) => { setApplicationDetails(data) })
            .catch((err) => console.error(err));
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/api/skills', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
            .then((res) => res.json())
            .then((result) => { setSkills(result) })
            .catch((err) => console.log(err));
    }, [])
 

    return (
        <>
            <div>
                <p>Skills: {skills.map(skill => skill.skillName).join(',  ')}</p>
                <AddSkills setSkills={setSkills} skills={skills} />
                <h3>Developer Onboarding Applications</h3>
                {applicationDetails.map((userData, index) => {
                    return (
                        <div key={index} className="border border-dark-subtle w-80 p-4 mb-4">
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

export default ClientDashboard
