import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import userIsAuthenticatedContext from '../../Context/userIsAuthenticatedContext';

const Login = () => {
    const navigate = useNavigate();
    const {setUserIsAuthenticated} = useContext(userIsAuthenticatedContext)

    const [loginInfo,setLoginInfo] =useState({email:"",password:""});

    const handleInput =(e)=>{
        setLoginInfo({...loginInfo,[e.target.name]:e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(loginInfo);

        const { email, password } = loginInfo;
        const res = await fetch('http://localhost:5000/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await res.json();

        if (res.status === 422 || !data) {

            window.alert("invalid data")
        } else {
            console.log("login successfully")
            window.alert(data.message)
            console.log(data); 

            localStorage.setItem('token', data.authtoken);
            localStorage.setItem('user-type', data.userType);
            setUserIsAuthenticated({token:data.authtoken,userType:data.userType})
           
            navigate('/')
        }
    }
    return (
        <div className='container mt-4 w-50 border border-secondary'>
             <div className='d-flex justify-content-center mt-2'><h2>Login Form</h2></div>
            <form className='m-4'>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">Email address</label>
                    <input type="email" name='email' value={loginInfo.email} className="form-control" id="InputEmail" onChange={handleInput} />
                </div>

                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">Password</label>
                    <input type="password" name='password' value={loginInfo.password} className="form-control" id="InputPassword" onChange={handleInput} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>

        </div>
    )
}

export default Login
