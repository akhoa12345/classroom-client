import { Tag } from 'antd';
import PropTypes from 'prop-types';

const Status = ({ status }) => {
  let color;
  let statusText;
  switch (status) {
    case 'INREVIEW':
      color = 'blue';
      statusText = 'Chờ xét duyệt';
      break;
    case 'DENIED':
      color = 'volcano';
      statusText = 'Bị từ chối';
      break;
    case 'ACCEPTED':
      color = 'green';
      statusText = 'Được chấp thuận';
      break;

    default:
      break;
  }

  return <Tag color={color}>{statusText}</Tag>;
};

Status.propTypes = {
  status: PropTypes.string,
};

export default Status;
