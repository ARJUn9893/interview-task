import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const DetailsForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [professionalExperience, setProfessionalExperience] = useState([]);
  const [educationalExperience, setEducationalExperience] = useState([]);

  const [skills, setSkills] = useState([]);

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

  // Handler functions
  const handleSkillChange = (selectedSkills) => {
    setSelectedSkills(selectedSkills);
  };

  const handleProfessionalExperienceChange = (index, field, value) => {
    const updatedExperience = [...professionalExperience];
    updatedExperience[index][field] = value;
    setProfessionalExperience(updatedExperience);
  };

  const handleEducationalExperienceChange = (index, field, value) => {
    const updatedExperience = [...educationalExperience];
    updatedExperience[index][field] = value;
    setEducationalExperience(updatedExperience);
  };

  const handleAddProfessionalExperience = () => {
    setProfessionalExperience([...professionalExperience, { companyName: '', techStack: '', skillsUsed: [], timePeriod: '' }]);
  };

  const handleAddEducationalExperience = () => {
    setEducationalExperience([...educationalExperience, { degreeName: '', schoolName: '', timePeriod: '' }]);
  };

  // Remove Educational Experience
  const handleRemoveEducationalExperience = (index) => {
    const updatedExperience = [...educationalExperience];
    updatedExperience.splice(index, 1);
    setEducationalExperience(updatedExperience);
  };

  const handleSubmit = async () => {
    //form submission logic
    console.log({
      firstName,
      lastName,
      phoneNumber,
      email,
      selectedSkills,
      professionalExperience,
      educationalExperience,
    });

    if (!email || !firstName || !lastName) {
      window.alert("Please fill all feilds")
    } else {
      const response = await fetch('http://localhost:5000/api/developer', {
        method: "POST",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')

        },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          email,
          selectedSkills,
          professionalExperience,
          educationalExperience,
        })
      })

      const data = await response.json();

      if (response.status === 422 || !data) {
        console.log("Invalid data ")
        window.alert(data["message"]);
        console.log(data)

      } else {
        console.log("succes")
        window.alert("succes")

        navigate('/')
      }
    }


  };

  return (
    <div className='container mt-4 mb-4 w-50 border border-secondary'>

      <div className='d-flex justify-content-center mt-2'><h2>Onboarding Details Form</h2></div>
      <form className='m-4'>
        {/* Developer Onboarding Application Form */}
        <div className="mb-3">
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>

        <div className="mb-3">
          <label>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
        </div>
        <div className="mb-3">
          <label>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
        </div>
        <div className="mb-3">
          <label>
            Phone Number:
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </label>
        </div>

        <div className="mb-3">
          {/* Skills */}
          <label>
            Skills:
            <select multiple value={selectedSkills} onChange={(e) => handleSkillChange(Array.from(e.target.selectedOptions, (option) => option.value))}>
              {/* Populate options from a predefined skill schema from backend */}
              {skills.map((val) => <option key={val._id} value={val._id}>{val.skillName}</option>)}

            </select>
          </label>
        </div>
        <hr />

        {/* Professional Experience */}
        <div className="mb-3">
          <h3>Professional Experience</h3>

          {professionalExperience.map((experience, index) => (
            <div key={index}>
              <h4>Experience {index + 1}:</h4>
              <div className="mb-3">
                <label>
                  Company Name:
                  <input type="text" value={experience.companyName} onChange={(e) => handleProfessionalExperienceChange(index, 'companyName', e.target.value)} />
                </label>
              </div>

              <div className="mb-3">
                <label>
                  Tech Stack:
                  <input type="text" value={experience.techStack} onChange={(e) => handleProfessionalExperienceChange(index, 'techStack', e.target.value)} />
                </label>
              </div>

              <div className="mb-3">
                <label>
                  Skills:
                  <select
                    multiple
                    value={experience.skillsUsed}
                    onChange={(e) => handleProfessionalExperienceChange(index, 'skillsUsed', Array.from(e.target.selectedOptions, (option) => option.value))}
                  >
                    {/* Populate options from a predefined skills from backend */}
                    {skills.map((val) => <option key={val._id} value={val._id}>{val.skillName}</option>)}

                  </select>
                </label>
              </div>
              <div className="mb-3">
                <label>
                  Time Period:
                  <input type="text" value={experience.timePeriod} onChange={(e) => handleProfessionalExperienceChange(index, 'timePeriod', e.target.value)} />
                </label>
              </div>
            </div>
          ))}
          <button className="btn btn-secondary" type="button" onClick={handleAddProfessionalExperience}>
            Add Professional Experience
          </button>
        </div>
        <hr />
        {/* Educational Experience */}
        <div className="mb-3">
          <h3>Educational Experience</h3>
          {educationalExperience.map((experience, index) => (
            <div key={index}>
              <h4>Education {index + 1}:</h4>
              <div className='mb-3'>
                <label>
                  Degree Name:
                  <input type="text" value={experience.degreeName} onChange={(e) => handleEducationalExperienceChange(index, 'degreeName', e.target.value)} />
                </label>
              </div>
              <div className='mb-3'>
                <label>
                  School Name:
                  <input type="text" value={experience.schoolName} onChange={(e) => handleEducationalExperienceChange(index, 'schoolName', e.target.value)} />
                </label>
              </div>
              <div className='mb-3'>
                <label>
                  Time Period:
                  <input type="text" value={experience.timePeriod} onChange={(e) => handleEducationalExperienceChange(index, 'timePeriod', e.target.value)} />
                </label>
              </div>
              {/* Remove Education experience button */}
              <button className="btn btn-danger" type="button" onClick={() => handleRemoveEducationalExperience(index)}>
                Remove Educational Experience
              </button>
            </div>

          ))}
          {/* Add Education experience button */}
          <div className="mb-3 mt-2">
            <button className="btn btn-secondary" type="button" onClick={handleAddEducationalExperience}>
              Add Educational Experience
            </button>
          </div>
        </div>

        <hr />
        {/* Form Submit Button */}
        <button className="btn btn-primary " type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};


export default DetailsForm
