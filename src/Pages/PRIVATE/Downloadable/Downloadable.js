import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../Navbar';
import styled from 'styled-components';

const BlackSquareContainer = styled.div`
  max-width: 230px;
  width: 100%;
  height: auto;
  min-height: 300px;
  background-color: white;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  padding: 20px;
  border: 1px solid black;
  border-radius: 5px;

  &.patent-square {
    margin-top: 10px;
    height: 350px;
  }

  @media (max-width: 600px) {
    &.patent-square {
      margin: 140px 10px 10px 10px;
    }
  }
`;

const TitleContainer = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  color: rgb(255, 196, 0);
`;

const DescriptionText = styled.div`
  font-size: 12px;
  margin-bottom: 10px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

const StyledButton = styled.button`
  margin-top: 5px;
  padding: 10px;
  width: 150px;
  background-color: #D9D9D9;
  color: black;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #0f0c36;
    color: white;
  }
`;


const BlackSquare = ({ title, description, files, onButtonClick }) => {
  return (
    <BlackSquareContainer className={title === 'Patent' ? 'patent-square' : ''}>
      <TitleContainer>
        <TitleText>{title}</TitleText>
      </TitleContainer>
      <DescriptionText>{description}</DescriptionText>
      <ButtonContainer>
        {files.map(({ fileName, buttonLabel }, index) => (
          <StyledButton key={index} onClick={() => onButtonClick(fileName)}>
            {buttonLabel}
          </StyledButton>
        ))}
      </ButtonContainer>
    </BlackSquareContainer>
  );
};

const Downloadable = () => {
  const navigate = useNavigate();

  const onButtonClick = (pdfFileName) => {
    fetch(pdfFileName).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.href = fileURL;
        link.download = pdfFileName;
        link.click();
      });
    });
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <BlackSquare
          title="Patent"
          files={[
            { fileName: 'patent1.pdf', buttonLabel: 'Application Form 1' },
            { fileName: 'patent2.pdf', buttonLabel: 'Application Form 2' },
            { fileName: 'patent3.pdf', buttonLabel: 'Application Form 3' },
            { fileName: 'patent4.pdf', buttonLabel: 'Application Form 4' },
            { fileName: 'patent5.pdf', buttonLabel: 'Application Form 5' },
          ]}
          onButtonClick={onButtonClick}
        >
          {/* Additional content for the Patent square if needed */}
        </BlackSquare>

        <BlackSquare
          title="Utility Model"
          files={[
            { fileName: 'utility_model1.pdf', buttonLabel: 'Application Form 1' },
            { fileName: 'utility_model2.pdf', buttonLabel: 'Application Form 2' },
            { fileName: 'utility_model3.pdf', buttonLabel: 'Application Form 3' },
            { fileName: 'utility_model4.pdf', buttonLabel: 'Application Form 4' },
          ]}
          onButtonClick={onButtonClick}
        >
        </BlackSquare>

        <BlackSquare
          title="Industrial Design"
          files={[
            { fileName: 'industrial_design1.pdf', buttonLabel: 'Application Form 1' },
            { fileName: 'industrial_design2.pdf', buttonLabel: 'Application Form 2' },
            { fileName: 'industrial_design3.pdf', buttonLabel: 'Application Form 3' },
            { fileName: 'industrial_design4.pdf', buttonLabel: 'Application Form 4' },
          ]}
          onButtonClick={onButtonClick}
        >
        </BlackSquare>

        <BlackSquare
          title="Trademark"
          files={[
            { fileName: 'trademark1.pdf', buttonLabel: 'Application Form 1' },
            { fileName: 'trademark2.pdf', buttonLabel: 'Application Form 2' },
            { fileName: 'trademark3.pdf', buttonLabel: 'Application Form 3' },
            { fileName: 'trademark4.pdf', buttonLabel: 'Application Form 4' },
            { fileName: 'trademark5.pdf', buttonLabel: 'Application Form 5' },
          ]}
          onButtonClick={onButtonClick}
        >
        </BlackSquare>
        
        <BlackSquare
          title="Copyright"
          files={[
            { fileName: 'copyright1.pdf', buttonLabel: 'Application Form 1' },
            { fileName: 'copyright2.pdf', buttonLabel: 'Application Form 2' },
            { fileName: 'copyright3.pdf', buttonLabel: 'Application Form 3' },
            { fileName: 'copyright4.pdf', buttonLabel: 'Application Form 4' },
          ]}
          onButtonClick={onButtonClick}
        >
        </BlackSquare>
      </div>
    </div>
  );
};

export default Downloadable;

