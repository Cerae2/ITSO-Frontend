import React from 'react';
import Navbar from "../../../../Navbar";
import { Link } from 'react-router-dom';
import TrademarkImage from './trademark.png';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // 100% of the viewport height
};

const squareContainerStyle = {
  width: '70%',
  maxWidth: '100%',
  height: '60%',
  backgroundColor: 'white', // Set the background color to white
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '2%',
  marginTop: '-15vh',
  border: '1px solid black', // Add a border
  borderRadius: '10px', // Set the border radius
};

const leftSquareStyle = {
  width: '58%',
  height: '90%',
  backgroundColor: 'white', // Set the background color to white
  padding: '1em',
  overflow: 'auto',
};

const rightSquareStyle = {
  width: '38%',
  height: '90%',
  backgroundColor: 'white',
  padding: '1em',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
};

const left_title_style = {
  fontSize: '25px',
  textAlign: 'left',
  fontWeight: 'bold',
  marginBottom: '0.5em',
  color: 'black',
};

const left_description_style = {
  fontSize: '20px',
  textAlign: 'left',
  color: 'black',
};

const additionalTextStyle = {
  fontSize: '20px',
  textAlign: 'left',
  color: 'black',
  marginTop: '2em',
};

const linkStyle = {
  color: 'blue',  // Set the color of the link text to blue
  textDecoration: 'underline',  // Add underline style to indicate it's a link
  cursor: 'pointer',
};

const rightSquareContent = (
  <>
    <img
      src={TrademarkImage}
      alt="Trademark"
      style={{ width: '100%', height: 'auto', marginTop: '1em' }}
    />
  </>
);

const Trademark = () => {

  const onButtonClick = (pdfFileName) => {
    fetch(pdfFileName).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.href = fileURL;
        link.download = pdfFileName;
        link.click();
      });
    });
  };

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <div style={squareContainerStyle}>
          <div style={leftSquareStyle}>
            <div style={left_title_style}>Industrial Design</div>
            <div style={left_description_style}>
            A trademark is a word, a group of words, sign, symbol, logo or a combination thereof that identifies and differentiates the source of the goods or services of one entity from those of others.

            If you’re a business, distinguishing your goods or services from others gives you a competitive edge. Learn more about trademarks, how to apply for protection, and how to manage them.

            </div>

            <div style={additionalTextStyle}>
              You can see the application forms if you click{' '}
              {/* Wrap the word "here" with the Link component */}
              <Link to="/download" style={linkStyle}>
                here
              </Link>
              . Application forms will be available and can download the file you desire.
            </div>

          </div>
          <div style={rightSquareStyle}>
            <div>{rightSquareContent}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trademark;

