import { createContext, useState } from 'react';

export const NotificationPopupContext = createContext();

export function NotificationPopupProvider({ children }) {
  const [notificationData, setNotificationData] = useState({
    title: '',
    message: '',
    visible: false,
  });

  const showNotification = ({ title, message }) => {
    setNotificationData({
      title,
      message,
      visible: true,
    });
  };

  const hideNotification = () => {
    setNotificationData({
      title: '',
      message: '',
      visible: false,
    });
  };

  const contextValue = {
    showNotification,
    hideNotification,
    notificationData,
  };

  return <NotificationPopupContext.Provider value={contextValue}>{children}</NotificationPopupContext.Provider>;
}
