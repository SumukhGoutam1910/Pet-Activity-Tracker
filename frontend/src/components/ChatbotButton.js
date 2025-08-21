import React, { useState } from 'react';
import styled from 'styled-components';

const FloatingButton = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  border: none;
  cursor: pointer;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  min-width: 320px;
  max-width: 90vw;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
`;

// Simple dog SVG for the button
const DogSVG = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#F9D77E"/>
    <ellipse cx="20" cy="26" rx="10" ry="8" fill="#fff"/>
    <ellipse cx="15" cy="18" rx="3" ry="4" fill="#fff"/>
    <ellipse cx="25" cy="18" rx="3" ry="4" fill="#fff"/>
    <circle cx="17" cy="20" r="1.2" fill="#333"/>
    <circle cx="23" cy="20" r="1.2" fill="#333"/>
    <ellipse cx="20" cy="24" rx="2" ry="1.2" fill="#333"/>
    <ellipse cx="12" cy="14" rx="2" ry="1.2" fill="#F9D77E"/>
    <ellipse cx="28" cy="14" rx="2" ry="1.2" fill="#F9D77E"/>
  </svg>
);

const ChatbotButton = ({ onClick }) => {
  return (
    <FloatingButton onClick={onClick} aria-label="Open Pet Care Chatbot">
      <DogSVG />
    </FloatingButton>
  );
};

export default ChatbotButton;
