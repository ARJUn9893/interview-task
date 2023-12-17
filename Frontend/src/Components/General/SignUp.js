import React, { useState ,useContext} from 'react'
import userIsAuthenticatedContext from '../../Context/userIsAuthenticatedContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const { setUserIsAuthenticated } = useContext(userIsAuthenticatedContext)
    const [userInfo, setUserInfo] = useState({ email: "", password: "", cpassword: "", role: "" });
    

    const handleInput = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userInfo);

        const { email, password, role } = userInfo;

        if (!email || !password || !role) {
            window.alert("Please fill all feilds")
        } else {
            const response = await fetch('http://localhost:5000/api/register', {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password, role
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

                localStorage.setItem('token', data.authtoken);
                localStorage.setItem('user-type', data.userType);
                setUserIsAuthenticated({ token: data.authtoken, userType: data.userType });

                navigate('/')
            }
        }
    }

    return (
        <div className='container mt-4 w-50 border border-secondary'>
            <div className='d-flex justify-content-center mt-2'><h2>Sign Up</h2></div>
            <form className='m-4'>
                <div className='mb-3'>
                    Role:
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="role" id="inlineRadio1" value="client" onClick={handleInput} />
                        <label class="form-check-label" for="inlineRadio1">Client</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="role" id="inlineRadio2" value="developer" onClick={handleInput} />
                        <label class="form-check-label" for="inlineRadio2">Developer</label>
                    </div>
                </div>


                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Email address</label>
                    <input type="email" name='email' value={userInfo.email} className="form-control" id="InputEmail" onChange={handleInput} />
                </div>

                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" name='password' value={userInfo.password} className="form-control" id="Password" onChange={handleInput} />
                </div>

                <div className="mb-3">
                    <label htmlFor="cPassword" className="form-label">Confirm Password</label>
                    <input type="password" name='cpassword' value={userInfo.cpassword} className="form-control" id="cPassword" onChange={handleInput} />
                </div>

                <button type="submit" className="btn btn-primary " onClick={handleSubmit}>Submit</button>
            </form>

        </div>
    )
}

export default SignUp
