import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../../context/AuthContext';
import { Context as UserContext } from '../../context/UserContext';


export default WaitAuthScreen = () => {
  const { tryLocalSignIn } = useContext(AuthContext);
  const { saveUser } = useContext(UserContext);

  useEffect(() => {
    tryLocalSignIn({ saveUser });
  }, []);

  return null;
}