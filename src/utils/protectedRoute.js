import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../services/storage.service';
import { LOGIN } from '../constants/api';

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const accessToken = getAccessToken();
    if (!accessToken || accessToken === 'undefined') {
      setIsLoggedIn(false);
      return navigate(LOGIN);
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return <Fragment>{isLoggedIn ? children : null}</Fragment>;
};
