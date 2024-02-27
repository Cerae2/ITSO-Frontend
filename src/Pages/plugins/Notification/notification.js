import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import bell from './Bell.png';
import {Notifications} from "@mui/icons-material";
import './notification.css';
import axios from 'axios';
import { Link } from "react-router-dom";

const NotificationMenu = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const personalInfo = useSelector(
    (state) => state.personalInfo.data 
  );

  const role = personalInfo?.user_role;

  // Function to add a notification
  const addNotification = () => {
    const newNotification = {
      id: notifications.length + 1,
      message: 'You have a new notification',
      timestamp: new Date().toLocaleString(),
      read: false
    };

    setNotifications([...notifications, newNotification]);
  };

  useEffect(() => {
    
      const authToken = localStorage.getItem('authToken')
    axios.get('notifications/fetch/', {
      headers: {
        Authorization: `Token ${authToken}`,
        "Content-Type": 'application/json'
      }
    }).then((response) =>{
      setNotifications(response.data)
      console.log("notifs", response.data)
      
    })    
  }, [])
  useEffect(() => {
    if(showNotifications) {
      setTimeout(() => {
        const authToken = localStorage.getItem('authToken')
        axios.get('notifications/update-read-status/', {
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": 'application/json'
          }
        }).then((response) =>{ 
          setNotifications(response.data)
        })
      }, 3000)
    }
  }, [showNotifications])

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
  

  function formatDateTime(dateTimeString) {
    // Create a Date object from the input string
    const date = new Date(dateTimeString);
  
   
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  
    // Format the time part to HH:MM
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true // Use  24-hour format
    });
  
    // Combine the date and time parts
    return `${formattedDate}, ${formattedTime}`;
  }

  return (
    <div className="notification-menu-container">
      <div className="notification-icon-container">
        {/* <img 
          src={bell} 
          alt="Bell" 
          className="bell-icon"
          onClick={() => setShowNotifications(!showNotifications)}
        /> */}

        <Notifications className="bell-icon"
          onClick={() => setShowNotifications(!showNotifications)}/>

        {notifications.some(notification => !notification.read_status) && 
          <span className="notification-count">{notifications.filter(notification => !notification.read_status).length}</span>
        }
      </div>
      {showNotifications && (
        <div className="notification-menu">
          <h2 style={{color:'#201b51', fontWeight:'bold'}}>Notifications</h2>
          <ul className="notification-list">
            {notifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(notification => (
              <>
             
              <Link
              to={role==="client" ? `/detailsDashPage/${notification.upload_form}` : `/dashboardadmindetail/${notification.upload_form}`}
              
            >
              <li 
                key={notification.id} 
                className={notification.read_status ? 'read' : 'unread'}
                
              >
                <span className="notification-message">{notification.subject}</span>
                <span className="notification-timestamp">{formatDateTime(notification.created_at)}</span>
              </li>
              </Link>
              </>
            ))}
          </ul>
          <div className="notification-actions">
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;
