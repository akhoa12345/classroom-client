import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { setJwt } from '../../libs/utils/localStorage';

const LoginSuccess = () => {
  const { token } = useParams();

  useEffect(() => {
    setJwt(token);
    window.location.href = '/';
  });

  return <div>LoginSuccess</div>;
};

export default LoginSuccess;
