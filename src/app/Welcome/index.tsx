import React, {useEffect, useState} from 'react';
import {Transition} from "react-spring/renderprops-universal";
import styled from "styled-components";
import {CircularProgress} from "@material-ui/core";
import ClapSpinner from "@/components/Spiner";
import {useHistory} from "react-router-dom";

const WELCOME_BACK = Array.from("Welcome Back").map((x, i) => ({key: i, text: x}))


const Index = () => {
  const history = useHistory()

  const [showWelcome, toggleWelcome] = useState(false)
  const [showLoading, toggleLoading] = useState(false)
  const [trail, setTrail] = useState(150)
  const [words, setWords] = useState(WELCOME_BACK)


  useEffect(() => {
    setTimeout(() => toggleWelcome(true), 600)
    setTimeout(() => setTrail(0), 3600)
    setTimeout(() => setWords([]), 3600)
    setTimeout(() => toggleWelcome(false), 4500)
    setTimeout(() => toggleLoading(true), 4900)
    setTimeout(() => history.push('/o'), 4900)
  }, [])

  return (
    <div>
      {showWelcome ?
        <StyledWrapper>
          <div style={{display: 'flex', margin: '0 auto'}}>
            <Transition
              items={words} keys={i => i.key}
              from={{ transform: 'translate3d(0,-40px,0)', opacity: 0 }}
              enter={{ transform: 'translate3d(0,0px,0)', opacity: 1 }}
              leave={{ transform: 'translate3d(0,-40px,0)', opacity: 0 }}
              trail={trail}>
              {item => props => <div style={{...props}}>{item.text}</div>}
            </Transition>
          </div>
        </StyledWrapper>
        : null}
      {showLoading ?
        <StyledWrapper style={{transform: "translateX(50%)"}}>
          <ClapSpinner size={60}/>
        </StyledWrapper>
        : null}
    </div>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-items: center;
  font-size: 60px;
  margin-top: 30%;
  text-align: center;
`

export default Index;