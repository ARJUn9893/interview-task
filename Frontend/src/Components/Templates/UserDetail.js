import React from 'react';

const UserDetail = ({ user }) => {

    
  return (
    <div>
      <h2>Onboarding Details of {`${user.firstName} ${user.lastName}`} </h2>
      <p>Name: {`${user.firstName} ${user.lastName}`}</p>
      <p>Email: {user.email}</p>
      <p>Phone Number: {user.phoneNumber}</p>
    </div>
  );
};

export default UserDetail;
