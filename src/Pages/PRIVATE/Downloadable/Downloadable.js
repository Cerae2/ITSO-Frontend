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
        {files.map(({ link, buttonLabel }, index) => (
          <StyledButton key={index} onClick={() => onButtonClick(link)}>
            {buttonLabel}
          </StyledButton>
        ))}
      </ButtonContainer>
    </BlackSquareContainer>
  );
};

const Downloadable = () => {
  const navigate = useNavigate();

  const onButtonClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <BlackSquare
          title="Patent"
          files={[
            { link: 'https://drive.google.com/file/d/1fGZyB1lOo9r3q0EoNBHzfuqvvmZD-HFj/view', buttonLabel: 'Request Form' },
            { link: 'https://drive.google.com/file/d/1WQ5AYbUtOiwSvqz-H42CfK1fRQuJz800/view', buttonLabel: 'Supplemental Sheet' },
          ]}
          onButtonClick={onButtonClick}
        >
          {/* Additional content for the Patent square if needed */}
        </BlackSquare>

        <BlackSquare
          title="Utility Model"
          files={[
            { link: 'https://drive.google.com/file/d/1JDQn53IgQ9gOTyfmF3r4FWThcDEmjZNE/view', buttonLabel: 'Registration Form' },
            { link: 'https://drive.google.com/file/d/1yau2FXxO8tHm5xE3RfWMIP0h7Uxi2gh-/view', buttonLabel: 'Assignmen of Application for Letters Patent' },
          ]}
          onButtonClick={onButtonClick}
        >
        </BlackSquare>

        <BlackSquare
          title="Industrial Design"
          files={[
            { link: 'https://drive.google.com/file/d/1f4MnnItVb5kKrCNuocQ4d4U0eszEpzuc/view', buttonLabel: 'Registration Form' },
            { link: 'https://drive.google.com/file/d/1IZk-z2Q-XFzdZWnRq4wQi3m44ShibNzH/view', buttonLabel: 'Assignmen of Application for Letters Patent' },
          ]}
          onButtonClick={onButtonClick}
        >
        </BlackSquare>

        <BlackSquare
          title="Trademark"
          files={[
            { link: 'https://drive.google.com/file/d/1ZSq6q_iOMzp40dfaaBGcwNRiwFCJQqtL/view', buttonLabel: 'Registration Form' },
            { link: 'https://drive.google.com/file/d/1IVF-3-l6zkjHGQiPLA6ng8umnemBMEpq/view', buttonLabel: 'Declaration of Actual Use' },
          ]}
          onButtonClick={onButtonClick}
        >
        </BlackSquare>
        
        <BlackSquare
          title="Copyright"
          files={[
            { link: 'https://drive.google.com/file/d/1HL2yMBNfa2ATmf9Py1QVgUwItb4p60_u/view', buttonLabel: 'Registration Form' },
            { link: 'https://drive.google.com/file/d/1oBPqRoKfCXzSlrDazeeYXzWbSCdGuwsX/view', buttonLabel: 'Supplemental Sheet' },
          ]}
          onButtonClick={onButtonClick}
        >
        </BlackSquare>
      </div>
    </div>
  );
};

export default Downloadable;

