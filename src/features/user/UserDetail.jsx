// App.jsx or layout component
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../redux/slices/user/userDetailSlice';

const UserDetail = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("UserDetail component mounted");
    dispatch(fetchUser());
  }, []);

  return null; // ✅ Or return a loader if needed
};

export default UserDetail;
