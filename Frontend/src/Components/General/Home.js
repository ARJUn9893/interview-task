import React, { useContext } from 'react'
import userIsAuthenticatedContext from '../../Context/userIsAuthenticatedContext'
import DeveloperDashboard from '../DeveloperPages/DeveloperDashboard';
import ClientDashboard from '../ClientPages/ClientDashboard';

const Home = () => {
    const { userIsAuthenticated } = useContext(userIsAuthenticatedContext);

    return (
        <>
            <div className="container mt-4 ">
                {userIsAuthenticated.userType === "developer" ?
                    <>
                        <h1>Developer Home Page</h1>
                        <DeveloperDashboard />
                    </>
                    :
                    userIsAuthenticated.userType === "client" ?
                        <>
                            <h1>Client Home Page</h1>
                            <ClientDashboard />
                        </>
                        :
                        <>
                            <div>
                                <h2>Welcome in My App</h2>
                            </div>
                            <div>
                                <h4>Please login or signup</h4>
                            </div>
                        </>
                }

            </div>

        </>
    )
}

export default Home
