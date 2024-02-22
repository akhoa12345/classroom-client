import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getClassroomStatus } from '../../services/classroom';

import LockedClassroom from './LockedClassroom';

const ClassroomRoute = ({ children }) => {
  const params = useParams();
  const location = useLocation();
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    const fetchStatus = async () => {
      console.log(params, location);
      if (location.pathname.includes('classroom') && params.id) {
        const { data: response } = await getClassroomStatus(params.id);
        console.log(response.active);
        setIsActive(response.active);
      }
    };
    fetchStatus();
  }, [location, params]);
  return isActive ? children : <LockedClassroom />;
};
ClassroomRoute.propTypes = {
  children: PropTypes.node,
};

export default ClassroomRoute;
