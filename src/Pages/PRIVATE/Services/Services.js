import React from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Navbar";
import './Services.css'; // Import the CSS file

const BlackSquare = ({ title, description, children, isPatent}) => {
  const navigate = useNavigate();

  return (
    <div className={`blackSquare ${isPatent ? 'patentSquare' : ''}`}>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      {children}
    </div>
  );
};

function Services(props) {
  const navigate = useNavigate('');

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <BlackSquare
          title="Patent"
          description="Do you have an innovation that’s new, inventive, and can be used in industry? You can protect it through a patent. Learn more about patents and how to apply for the grant of a patent."
          isPatent
        >
          <button
            className="moreButton"
            onClick={() => navigate('/patent')}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0f0c36';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#D9D9D9';
              e.target.style.color = 'black';
            }}
          >
            More
          </button>
        </BlackSquare>

        <BlackSquare
          title="Utility Model"
          description="Is your innovation new and useful in industry but may not be inventive enough? This can still be protected as a utility model. Find out how to apply for patent protection of a utility model."
        >
          <button
            className="moreButton"
            onClick={() => navigate('/utilitymodel')}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0f0c36';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#D9D9D9';
              e.target.style.color = 'black';
            }}
          >
            More
          </button>
        </BlackSquare>

        <BlackSquare
          title="Industrial Design"
          description="Are you in the field of visual design and looking to protect your work? New or original designs may be protected as industrial designs. Learn how you can apply for industrial designs."
        >
          <button
            className="moreButton"
            onClick={() => navigate('/industrialdesign')}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0f0c36';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#D9D9D9';
              e.target.style.color = 'black';
            }}
          >
            More
          </button>
        </BlackSquare>

        <BlackSquare
          title="Trademark"
          description="If you’re a business, distinguishing your goods or services from others may be a competitive advantage. Learn more about trademarks, how to apply for protection, and how to manage them."
        >
          <button
            className="moreButton"
            onClick={() => navigate('/trademark')}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0f0c36';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#D9D9D9';
              e.target.style.color = 'black';
            }}
          >
            More
          </button>
        </BlackSquare>

        <BlackSquare
          title="Copyright"
          description="Protection for your literary, artistic, or scientific work is automatic from the moment you create it. Registration isn’t necessary but if you want physical proof to show a work is yours, you may want to deposit your copyrighted work with us."
        >
          <button
            className="moreButton"
            onClick={() => navigate('/copyright')}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0f0c36';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#D9D9D9';
              e.target.style.color = 'black';
            }}
          >
            More
          </button>
        </BlackSquare>
      </div>
    </div>
  );
};

export default Services;

