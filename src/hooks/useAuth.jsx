import React from 'react';

import AuthContext from '../contexts/auth/auth-context';

const useAuth = () => {
  const { user, loaded: userLoaded } = React.useContext(AuthContext);
  const isTeacher = !!user && user.role === 'teacher';
  return { user, userLoaded, isTeacher };
};

export default useAuth;
