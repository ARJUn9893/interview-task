import React, { useState } from 'react'

const AddSkills = ({setSkills,skills}) => {
    const [newSkill, setNewSkill] = useState("");

    const handleInputChange = (e) => {
        setNewSkill(e.target.value);
    };

    const handleAddSkill = (e) => {
        e.preventDefault();

        if (!newSkill) {
            window.alert("Invalid Data");
        } else {

            fetch('http://localhost:5000/api/skills', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ skill:newSkill})
            })
                .then((res) => res.json())
                .then((data) => window.alert(data.message))
                .catch((err) => console.log(err));
                setSkills([...skills, {skillName:newSkill}]);
                setNewSkill("");
        }
    }

    return (
        <div>
            <form className="border border-primary p-3">
                <div className="mb-3">
                    <label htmlFor="skill" className="form-label">Add Skill:</label>
                    <input type="text" name='skillName' value={newSkill} className="form-control" id="skill" onChange={handleInputChange} />

                    <button className="btn btn-primary mt-2" type="button" onClick={handleAddSkill}> Add </button>
                </div>

            </form>
        </div>
    )
}

export default AddSkills
