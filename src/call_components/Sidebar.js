import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import logo from '../Pages/pictures/ustp_logo.jpg'
import '../call_components/Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ borderBottom: "4px #FBB217 solid", backgroundColor: '#201B51', padding: '1px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' , width: '100%', position: 'fixed', top: '0', left: '0', zIndex: '100' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="USTP logo" style={{ height: "81px", width: "81px", margin: '5px', cursor: 'pointer' }}  />
                <text style={{ color: '#FBB217', fontSize: '24px', marginLeft: '10px', cursor: 'pointer' }} >
                    UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES
                </text>
            </div>  
        </div>

        <div className='sidebar'>
            <div className={`sidebar2 ${isOpen ? 'open' : ''}`}>
                <div className="toggle-button" onClick={toggleSidebar}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        {!isOpen ? ( 
          <ul>
            <li onClick={() => navigate('/login')}>LOGIN</li>
            <li onClick={() => navigate('/Learnmore')}>LEARN MORE</li>
          </ul>
        ) : null}
      </div>
  </div>   
   
    </div>
  );
}

export default Sidebar;
