import { notification } from 'antd';
import PropTypes from 'prop-types';

import NotificationContext from './notificationContext';

const NotificationProvider = (props) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (notification) => {
    api[notification.type]({
      message: notification.title,
      description: notification.description,
      placement: 'bottomLeft',
    });
  };

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {contextHolder}
      {props.children}
    </NotificationContext.Provider>
  );
};
NotificationProvider.propTypes = {
  children: PropTypes.node,
};

export default NotificationProvider;
