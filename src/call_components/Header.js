import React from 'react'
import '../call_components/Header.css';
import logo from '../Pages/pictures/ustp_logo.jpg';

const Header = () => {
  return (
    <div style={{ borderBottom: "4px #FBB217 solid", backgroundColor: '#201B51', padding: '1px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' , width: '100%', position: 'fixed', top: '0', left: '0', zIndex: '100' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="USTP logo" style={{ height: "81px", width: "81px", margin: '5px', cursor: 'pointer' }}  />
        <text style={{ color: '#FBB217', fontSize: '24px', marginLeft: '10px', cursor: 'pointer' }} >
          UNIVERSITY OF SCIENCE AND TECHNOLOGY OF SOUTHERN PHILIPPINES
        </text>
      </div>    
    </div>
  )
}

export default Header;