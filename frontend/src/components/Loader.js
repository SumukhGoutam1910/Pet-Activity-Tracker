import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader-main">
        <div className="loader-dog">
          <div className="loader-dog__paws">
            <div className="loader-dog__bl-leg loader-leg">
              <div className="loader-dog__bl-paw loader-paw" />
              <div className="loader-dog__bl-top loader-top" />
            </div>
            <div className="loader-dog__fl-leg loader-leg">
              <div className="loader-dog__fl-paw loader-paw" />
              <div className="loader-dog__fl-top loader-top" />
            </div>
            <div className="loader-dog__fr-leg loader-leg">
              <div className="loader-dog__fr-paw loader-paw" />
              <div className="loader-dog__fr-top loader-top" />
            </div>
          </div>
          <div className="loader-dog__body">
            <div className="loader-dog__tail" />
          </div>
          <div className="loader-dog__head">
            <div className="loader-dog__snout">
              <div className="loader-dog__eyes">
                <div className="loader-dog__eye-l" />
                <div className="loader-dog__eye-r" />
              </div>
            </div>
          </div>
          <div className="loader-dog__head-c">
            <div className="loader-dog__ear-r" />
            <div className="loader-dog__ear-l" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader-main {
    position: relative;
    width: 23.5vmax;
    height: 10.5vmax;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loader-leg {
    position: absolute;
    bottom: 0;
    width: 2vmax;
    height: 2.125vmax;
  }

  .loader-paw {
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 1.95vmax;
    height: 1.8vmax;
    overflow: hidden;
  }

  .loader-paw::before {
    content: "";
    position: absolute;
    width: 5vmax;
    height: 3vmax;
    border-radius: 50%;
  }

  .loader-top {
    position: absolute;
    bottom: 0;
    left: 0.75vmax;
    height: 4.5vmax;
    width: 2.625vmax;
    border-top-left-radius: 1.425vmax;
    border-top-right-radius: 1.425vmax;
    transform-origin: bottom right;
    transform: rotateZ(90deg) translateX(-0.1vmax) translateY(1.5vmax);
    z-index: 1;
    background-image: linear-gradient(70deg, transparent 20%, #efad7bff 20%);
  }

  .loader-dog {
    position: relative;
    width: 20vmax;
    height: 8vmax;
  }

  .loader-dog::before {
    content: "";
    position: absolute;
    bottom: -0.75vmax;
    right: -0.15vmax;
    width: 100%;
    height: 1.5vmax;
    background-color: #b5c18e;
    border-radius: 50%;
    z-index: 0;
    animation: shadow 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
  }

  .loader-dog__head {
    position: absolute;
    left: 4.5vmax;
    bottom: 0;
    width: 8vmax;
    height: 5vmax;
    border-top-left-radius: 4.05vmax;
    border-top-right-radius: 4.05vmax;
    border-bottom-right-radius: 3.3vmax;
    border-bottom-left-radius: 3.3vmax;
    background-color: #efad7bff;
    z-index: 3;
    animation: head 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
  }

  .loader-dog__head-c {
    position: absolute;
    left: 1.5vmax;
    bottom: 0;
    width: 9.75vmax;
    height: 8.25vmax;
    animation: head 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
    z-index: 2;
  }

  .loader-dog__snout {
    position: absolute;
    left: -1.5vmax;
    bottom: 0;
    width: 7.5vmax;
    height: 3.75vmax;
    border-top-right-radius: 3vmax;
    border-bottom-right-radius: 3vmax;
    border-bottom-left-radius: 4.5vmax;
    background-color: #F5E6D3;
    z-index: 4;
    animation: snout 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
  }

  .loader-dog__snout::before {
    content: "";
    position: absolute;
    left: -0.1125vmax;
    top: -0.15vmax;
    width: 1.875vmax;
    height: 1.125vmax;
    border-top-right-radius: 3vmax;
    border-bottom-right-radius: 3vmax;
    border-bottom-left-radius: 4.5vmax;
    background-color: #6c4e31;
    animation: snout-b 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
  }

  .loader-dog__nose {
    position: absolute;
    top: -1.95vmax;
    left: 40%;
    width: 0.75vmax;
    height: 2.4vmax;
    border-radius: 0.525vmax;
    transform-origin: bottom;
    transform: rotateZ(10deg);
    background-color: #d7dbd2;
  }

  .loader-dog__eye-l,
  .loader-dog__eye-r {
    position: absolute;
    top: -0.9vmax;
    width: 0.675vmax;
    height: 0.375vmax;
    border-radius: 50%;
    background-color: #1c3130;
    animation: eye 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
  }

  .loader-dog__eye-l {
    left: 27%;
  }

  .loader-dog__eye-r {
    left: 65%;
  }

  .loader-dog__ear-l,
  .loader-dog__ear-r {
    position: absolute;
    width: 5vmax;
    height: 3.3vmax;
    border-top-left-radius: 3.3vmax;
    border-top-right-radius: 3vmax;
    border-bottom-right-radius: 5vmax;
    border-bottom-left-radius: 5vmax;
    background-color: #efad7bff;
  }

  .loader-dog__ear-l {
    top: 1.5vmax;
    left: 10vmax;
    transform-origin: bottom left;
    transform: rotateZ(-50deg);
    z-index: 2 !important;
    background-color: #efad7bff !important;
    animation: ear-l 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
  }

  .loader-dog__ear-r {
    top: 1.5vmax;
    right: 3vmax;
    transform-origin: bottom right;
    transform: rotateZ(25deg);
    z-index: 2 !important;
    background-color: #efad7bff !important;
    animation: ear-r 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
  }

  .loader-dog__body {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: absolute;
    bottom: 0.3vmax;
    left: 6vmax;
    width: 18vmax;
    height: 4vmax;
    border-top-left-radius: 3vmax;
    border-top-right-radius: 6vmax;
    border-bottom-right-radius: 1.5vmax;
    border-bottom-left-radius: 6vmax;
    background-color: #8B4513;
    z-index: 1;
    animation: body 10s cubic-bezier(0.3, 0.41, 0.18, 1.01) infinite;
  }

  .loader-dog__tail {
    position: absolute;
    top: 20px;
    right: -1.5vmax;
    height: 3vmax;
    width: 4vmax;
    background-color: #8B4513;
    border-radius: 1.5vmax;
  }

  .loader-dog__paws {
    position: absolute;
    bottom: 0;
    left: 7.5vmax;
    width: 10vmax;
    height: 3vmax;
  }

  .loader-dog__bl-leg {
    left: -3vmax;
    z-index: 2;
  }

  .loader-dog__bl-paw::before {
    background-color: #F5E6D3;
  }

  .loader-dog__bl-top {
    background-image: linear-gradient(80deg, transparent 20%, #efad7bff 20%);
  }

  .loader-dog__fl-leg {
    z-index: 3;
    left: 0;
  }

  .loader-dog__fl-paw::before {
    background-color: #F5E6D3;
  }

  .loader-dog__fr-leg {
    right: 0;
    z-index: 3;
  }

  .loader-dog__fr-paw::before {
    background-color: #F5E6D3;
  }

  /* Keyframes remain unchanged */
  @keyframes head {
    0%,
    10%,
    20%,
    26%,
    28%,
    90%,
    100% {
      height: 8.25vmax;
      bottom: 0;
      transform-origin: bottom right;
      transform: rotateZ(0);
    }
    5%,
    15%,
    22%,
    24%,
    30% {
      height: 8.1vmax;
    }
    32%,
    50% {
      height: 8.25vmax;
    }
    55%,
    60% {
      bottom: 0.75vmax;
      transform-origin: bottom right;
      transform: rotateZ(0);
    }
    70%,
    80% {
      bottom: 0.75vmax;
      transform-origin: bottom right;
      transform: rotateZ(10deg);
    }
  }

  @keyframes body {
    0%,
    10%,
    20%,
    26%,
    28%,
    32%,
    100% {
      height: 7.2vmax;
    }
    5%,
    15%,
    22%,
    24%,
    30% {
      height: 7.05vmax;
    }
  }

  @keyframes ear-l {
    0%,
    10%,
    20%,
    26%,
    28%,
    82%,
    100% {
      transform: rotateZ(-50deg);
    }
    5%,
    15%,
    22%,
    24% {
      transform: rotateZ(-48deg);
    }
    30%,
    31% {
      transform: rotateZ(-30deg);
    }
    32%,
    80% {
      transform: rotateZ(-60deg);
    }
  }

  @keyframes ear-r {
    0%,
    10%,
    20%,
    26%,
    28% {
      transform: rotateZ(20deg);
    }
    5%,
    15%,
    22%,
    24% {
      transform: rotateZ(18deg);
    }
    30%,
    31% {
      transform: rotateZ(10deg);
    }
    32% {
      transform: rotateZ(25deg);
    }
  }

  @keyframes snout {
    0%,
    10%,
    20%,
    26%,
    28%,
    82%,
    100% {
      height: 3.75vmax;
    }
    5%,
    15%,
    22%,
    24% {
      height: 3.45vmax;
    }
  }

  @keyframes snout-b {
    0%,
    10%,
    20%,
    26%,
    28%,
    98%,
    100% {
      width: 1.875vmax;
    }
    5%,
    15%,
    22%,
    24% {
      width: 1.8vmax;
    }
    34%,
    98% {
      width: 1.275vmax;
    }
  }

  @keyframes shadow {
    0%,
    10%,
    20%,
    26%,
    28%,
    30%,
    84%,
    100% {
      width: 99%;
    }
    5%,
    15%,
    22%,
    24% {
      width: 101%;
    }
    34%,
    81% {
      width: 96%;
    }
  }

  @keyframes eye {
    0%,
    30% {
      width: 0.675vmax;
      height: 0.3vmax;
    }
    32%,
    59%,
    90%,
    100% {
      width: 0.525vmax;
      height: 0.525vmax;
      transform: translateY(0);
    }
    60%,
    75% {
      transform: translateY(-0.3vmax);
    }
    80%,
    85% {
      transform: translateY(0.15vmax);
    }
  }
`;

export default Loader;
