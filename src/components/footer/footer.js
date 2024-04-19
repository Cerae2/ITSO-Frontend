import React from 'react';
import './footer.css'; // Make sure to create a CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faGoogle, faYoutube,} from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
     <footer className="footer">
       <p>© 2024 TPCO. All rights reserved.</p>
       <div className="contact-section">
         <p className='contact-us'>Contact/follow us:</p>
         <div className="social-icons">
         <a href="https://www.facebook.com/ustpcdo.tpco" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.instagram.com/ustp_official.ig" target="_blank" rel="noopener noreferrer">
           <FontAwesomeIcon icon={faInstagram} />
           </a>
           <a href="https://twitter.com/OfficialUstp" target="_blank" rel="noopener noreferrer">
           <FontAwesomeIcon icon={faTwitter} /></a>
           <a href="https://www.ustp.edu.ph/tpco/" target="_blank" rel="noopener noreferrer">
           <FontAwesomeIcon icon={faGoogle}/></a>
           <a href="https://www.youtube.com/c/OfficialUSTPChannel" target="_blank" rel="noopener noreferrer">
           <FontAwesomeIcon icon={faYoutube}/></a>
          
         </div>
       </div>
     </footer>
  );
 };
 
 export default Footer;