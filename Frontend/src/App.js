import { useState } from 'react';
import './App.css';
import Navbar from './Components/Common/Navbar';
import DetailsForm from './Components/General/DetailsForm';
import Login from './Components/General/Login';
import SignUp from './Components/General/SignUp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import userIsAuthenticatedContext from './Context/userIsAuthenticatedContext';
import Home from './Components/General/Home';

function App() {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState({token:localStorage.getItem('token'),userType:localStorage.getItem('user-type')});
  
  return (
    <>
      <Router>
        <userIsAuthenticatedContext.Provider value={{userIsAuthenticated,setUserIsAuthenticated}}>

          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />

            <Route exact path="/onboarding" element={<DetailsForm />} />

            <Route path="*" element={<><div className="container my-5 justify-self-center  ">
              <h1 className="text-danger justify-items-center justify-self-center  ">oops that page  not found</h1></div> </>} />
          </Routes>
        </userIsAuthenticatedContext.Provider>
      </Router>
    </>
  );
}

export default App;
