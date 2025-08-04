import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const { user, isLoading, error } = useSelector((state) => state.userDetail);

    return (
        <div>
            {isLoading ? 'Loading....' : 
        <>
      
            Name : {!user ? "user not Found" : user.name}
            <br />
            Email : {!user ? "Email not Found" : user.email}
        </>
        }
            
          
        </div>
    )
}

export default UserProfile
