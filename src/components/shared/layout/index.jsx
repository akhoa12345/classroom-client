import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthContext from '../../../contexts/auth/auth-context';
import HeaderLogin from '../header/HeaderLogin';
import HeaderNotLogin from '../header/HeaderNotLogin';

const Page_Layout = () => {
  const { user } = useContext(AuthContext);
  console.log('user:', user);
  return (
    <div>
      {user ? (
        <HeaderLogin />
      ) : (
        <>
          <HeaderNotLogin />
          <Outlet />
        </>
      )}
    </div>
  );
};

Page_Layout.propTypes = {
  children: PropTypes.node,
};

export default Page_Layout;
