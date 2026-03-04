import React, { useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { NotificationContext } from '../context/NotificationContext';

const NotificationStack = () => {
  const { notifications, closeNotification } = useContext(NotificationContext);

  return (
    <>
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={3000}
          onClose={() => closeNotification(notification.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          style={{ marginBottom: `${index * 70}px` }}
        >
          <Alert
            onClose={() => closeNotification(notification.id)}
            severity={notification.type}
            variant="filled"
            sx={{
              width: '100%',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default NotificationStack;
