import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout: React.FC = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_API_URL}/users/logout-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    });

  return <div>UserLogout</div>;
};

export default UserLogout;