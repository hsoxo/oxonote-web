import React, {useState} from 'react';
import styled from "styled-components";
import LoginFrom from "@/app/Login/LoginFrom";
import {animated, useSpring} from "react-spring";
import RegistrationForm from "@/app/Login/RegistrationForm";

export default function SignIn() {
  const [open, toggleOpen] = useState(false)
  const [ isSignIn, toggleCard] = useState(true)

  const { transform, opacity, visibility } = useSpring({
    opacity: isSignIn ? 1 : 0,
    visibility: isSignIn ? 'unset' : 'hidden',
    transform: `perspective(600px) rotateX(${isSignIn ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 60 }
  })

  const CloseButton = (
    <button
      className="close-button"
      onClick={() => toggleOpen(!open)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path
          d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
      </svg>
    </button>
  )

  return (
    <div>
      <BackgroundBox />
      <Modal open={open}>
        <div className="modal-container">
          <animated.div
            style={{
              // @ts-ignore
              opacity: opacity.interpolate(o => 1 - o),
              // @ts-ignore
              visibility: visibility.interpolate(o => o === 'hidden' ? 'unset' : 'hidden' ),
              transform,
              position: 'fixed',
            }}
          >
            <div className="modal-left">
              <RegistrationForm
                toggle={() => toggleCard(!isSignIn)}
              />
              {CloseButton}
            </div>
          </animated.div>
          <animated.div
            style={{
              opacity,
              visibility,
              transform: transform.interpolate(t => `${t} rotateX(180deg)`)
            }}
          >
            <div className="modal-left">
              <LoginFrom
                toggle={() => toggleCard(!isSignIn)}
              />
              {CloseButton}
            </div>
          </animated.div>
        </div>
        <button
          className="modal-button"
          onClick={() => {toggleOpen(!open)}}
        >
          Click here to login
        </button>
      </Modal>
    </div>
  );
}

const BackgroundBox = styled.div`
  height: 100vh;
  background-image: url(https://images.unsplash.com/photo-1538137524007-21e48fa42f3f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ac9fa0975bd2ebad7afd906c5a3a15ab&auto=format&fit=crop&w=1834&q=80);
  background-size: cover;
  background-position: 50% 70%;
  background-repeat: no-repeat;
`

const Modal = styled.div<{open: boolean}>`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  background: rgba(255,255,255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: height ease 0.6s;

  .modal-container {
    display: flex;
    max-width: 720px;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    transition-duration: 0.3s;
    transform: translateY(100px) scale(0.4);

    .modal-left {
      text-align: center;
      transform: scale(1.5);
      transition: transform ease 0.3s;
      transition-duration: 1.2s;
      overflow: hidden;
      border-radius: 10px;
      background-color: rgba(255,255,255,0.8);
      box-shadow: 0px 0px 40px 16px rgba(0,0,0,0.22);
      min-height: 500px;
    }
    
    .close-button {
      outline: 0;
      position: absolute;
      right: 10px;
      top: 12px;
      width: 32px;
      height: 32px;
      border: 0;
      background: 0;
      padding: 0;
      cursor: pointer;
    }
  }

  .modal-button {
    color: darken(#8c7569, 5%); 
    font-family: "SwankyandMooMoo", sans-serif;
    font-size: 22px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    outline: 0;
    padding: 5px 40px;
    border-radius: 30px;
    background: rgb(255, 255, 255, 0.8);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.16);
    transition: 0.3s;

    &:hover {
      background: rgb(255, 255, 255);
    }
  }

  ${p => p.open ? `
    height: 100%;

    .modal-button {
      opacity: 0;
      visibility: hidden;
    }

    .modal-container {
      opacity: 1;
      transition-duration: 0.6s;
      pointer-events: auto;
      transform: translateY(0) scale(1);
      
      .modal-left {
        transform: scale(1);
        opacity: 1;
        transition-delay: 0.1s;
      }
      
    }
  ` : ''}
`
