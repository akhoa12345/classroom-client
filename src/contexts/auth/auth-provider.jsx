import { useState } from 'react';
import PropTypes from 'prop-types';

import AuthContext from './auth-context';

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  return <AuthContext.Provider value={{ user, setUser, loaded, setLoaded }}>{props.children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
