import React, { useState } from 'react';
import bell from './Bell.png';
import './notification.css';
import { Notifications } from "@mui/icons-material";

const NotificationMenu = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Function to add a notification
  const addNotification = () => {
    const newNotification = {
      id: notifications.length + 1,
      message: `You have a new notification ${notifications.length + 1}`,
      timestamp: new Date().toLocaleString(),
      read: false
    };

    setNotifications([...notifications, newNotification]);
  };

  // Function to clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Function to mark a notification as read
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => {
      if (notification.id === id) {
        return { ...notification, read: true };
      }
      return notification;
    });

    setNotifications(updatedNotifications);
  };

  // Function to handle clicking on a notification message
  const handleClickNotification = (id) => {
    markAsRead(id);
  };

  return (
    <div className="notification-menu">
      <h2>  
        {/* <img 
          src={bell} 
          alt="Bell" 
          className="bell-icon"
          onClick={() => setShowNotifications(!showNotifications)}
        /> */}
        <Notifications onClick={() => setShowNotifications(!showNotifications)}/>
        {notifications.some(notification => !notification.read) && <span className="notification-count">{notifications.filter(notification => !notification.read).length}</span>}
      </h2>
      {showNotifications && (
        <ul className="notification-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {notifications.map(notification => (
            <li 
              key={notification.id} 
              className={notification.read ? 'read' : 'unread'}
              onClick={() => handleClickNotification(notification.id)}
            >
              <span className="notification-message">{notification.message}</span>
              <span className="notification-timestamp">{notification.timestamp}</span>
              {!notification.read && (
                <button className="mark-read-button" onClick={() => markAsRead(notification.id)}>Mark as Read</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationMenu;

