import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import userIsAuthenticatedContext from '../../Context/userIsAuthenticatedContext';


const Navbar = () => {
    const { userIsAuthenticated, setUserIsAuthenticated } = useContext(userIsAuthenticatedContext)
    const navigate = useNavigate();

    const handleLogout = () => {
        setUserIsAuthenticated({ token: "", userType: "" });
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        navigate('/');
    }



    // let location = useLocation();
    // React.useEffect(() => {
    //     //   console.log(location.pathname)
    // }, [location]);
    return (
        <>
            <nav className="navbar navbar-expand-lg  bg-dark border-bottom border-body " data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">My App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            {userIsAuthenticated?.userType === 'developer' &&
                                <li className="nav-item">
                                    <Link className="nav-link" to="/onboarding">Onboarding Form</Link>
                                </li>
                            }


                        </ul>
                        {!userIsAuthenticated.token
                            ?
                            <>
                                <button type="button" className="btn btn-outline-light"><Link className="nav-link" to="/login">Login</Link></button>
                                <button type="button" className="btn btn-outline-warning ms-3 me-4"><Link className="nav-link" to="/signup">Sign Up</Link></button>
                            </>
                            :
                            <button type="button" className="btn btn-outline-warning ms-3 me-4" onClick={handleLogout}>Logout</button>
                        }

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
