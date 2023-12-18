import React from 'react';
import { useNavigate } from "react-router-dom";
// import '../styles/user_pages_style.css'
import Navbar from "../../../Navbar";



const BlackSquare = ({ title, description, children }) => {
  const blackSquareStyle = {
    width: '200px',
    height: '200px',
    backgroundColor: 'black',
    marginRight: '10px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: 'white',
    padding: '20px',
  };

  const textStyles = {
    fontSize: '18px',
    marginBottom: '10px',
    textAlign: 'left',
  };

  const descriptionStyles = {
    fontSize: '12px',
    marginBottom: '10px',
    textAlign: 'left',
  };

 

  return (
    <div style={blackSquareStyle}>
      <div style={textStyles}>{title}</div>
      <div style={descriptionStyles}>{description}</div>
      {children} {/* Render any additional content passed as children */}
    </div>
  );
};



function Services(props) {
  const navigate = useNavigate('');
  return (
    
    <div>
      <Navbar/>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <BlackSquare
          title="Patent"
          description="Do you have an innovation that’s new, inventive, and can be used in industry? You can protect it through a patent. Learn more about patents and how to apply for the grant of a patent."
        >
          {/* Place the "More" button inside the BlackSquare component */}
          <button
            style={{
              padding: '10px',
              backgroundColor: 'white',
              color: 'black',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '5px',
            }}

            onClick={() => navigate('/patent')}
          >
            More
          </button>
        </BlackSquare>
        
        <BlackSquare
          title="Utility Model"
          description="Is your innovation new and useful in industry but may not be inventive enough? This can still be protected as a utility model. Find out how to apply for patent protection of a utility model."
        >
          {/* Place the "More" button inside the BlackSquare component */}
          <button
            style={{
              padding: '10px',
              backgroundColor: 'white',
              color: 'black',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '5px',
            }}

            onClick={() => navigate('/utilitymodel')}
          >
            More
          </button>
        </BlackSquare>

        <BlackSquare
          title="Industrial Design"
          description="Are you in the field of visual design and looking to protect your work? New or original designs may be protected as industrial designs. Learn how you can apply for industrial designs."
        >
          {/* Place the "More" button inside the BlackSquare component */}
          <button
            style={{
              padding: '10px',
              backgroundColor: 'white',
              color: 'black',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '5px',
            }}

            onClick={() => navigate('/industraildesign')}
          >
            More
          </button>
        </BlackSquare>

      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <BlackSquare
          title="Trademark"
          description="If you’re a business, distinguishing your goods or services from others may be a competitive advantage. Learn more about trademarks, how to apply for protection, and how to manage them."
        >
          {/* Place the "More" button inside the BlackSquare component */}
          <button
            style={{
              padding: '10px',
              backgroundColor: 'white',
              color: 'black',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '5px',
            }}

            onClick={() => navigate('/trademark')}
          >
            More
          </button>
        </BlackSquare>

        <BlackSquare
          title="Copyright"
          description="Protection for your literary, artistic, or scientific work is automatic from the moment you create it. Registration isn’t necessary but if you want physical proof to show a work is yours, you may want to deposit your copyrighted work with us."
        >
          {/* Place the "More" button inside the BlackSquare component */}
          <button
            style={{
              padding: '10px',
              backgroundColor: 'white',
              color: 'black',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '5px',
            }}

            onClick={() => navigate('/copyright')}
          >
            More
          </button>
        </BlackSquare>
      </div>
    </div>
  );
};

export default Services;

