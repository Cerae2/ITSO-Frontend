// services.js
import React from "react";
import Navbar from "../../../Navbar";
import MultiActionAreaCard from "../../../components/mui/card";
import patent from '../../../assets/patent.jpg'
import utility from '../../../assets/utility.jpg'
import industry from '../../../assets/industry.png'
import trademark from '../../../assets/trademark.png'
import Copyright from '../../../assets/copyright.png'

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const cardContainerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',

};

function Services(props) {
  return (
    <div style={containerStyles}>
      <Navbar />

      <div style={cardContainerStyles}>
        {/* Pass values as props to MultiActionAreaCard */}
        <MultiActionAreaCard
          image={patent}
          title="Patent"
          description="Do you have an innovation that's new, inventive, and can be used in industry? You can protect it through a patent. Learn more about patents and how to apply for the grant of a patent."
        />
        <MultiActionAreaCard
          image={utility}
          title="Utility Model"
          description="Is your innovation new and useful in industry but may not be inventive enough? This can still be protected as a utility model. Find out how to apply for patent protection of a utility model."
        />
        <MultiActionAreaCard
          image={industry}
          title="Industrial Design"
          description="Are you in the field of visual design and looking to protect your work? New or original designs may be protected as industrial designs. Learn how you can apply for industrial designs."
        />
        <MultiActionAreaCard
          image={trademark}
          title="Trademark"
          description="If you’re a business, distinguishing your goods or services from others may be a competitive advantage. Learn more about trademarks, how to apply for protection, and how to manage them."
        />
        <MultiActionAreaCard
          image={Copyright}
          title="Copyright"
          description="Protection for your literary, artistic, or scientific work is automatic from the moment you create it. Registration isn’t necessary but if you want physical proof to show a work is yours, you ..."
        />                                
      </div>
    </div>
  );
}

export default Services;
