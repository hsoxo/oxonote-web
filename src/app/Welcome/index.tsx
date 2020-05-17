import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { animated, useSpring, useTransition } from 'react-spring'
import styled from 'styled-components'

const WELCOME_TEXT = Array.from('Welcome back').map((value, index) => ({
  i: index,
  t: value
}))

function Index() {
  const history = useHistory()
  const [out, setOut] = useState(false)
  const [items, setItems] = useState<Array<{ i: number; t: string }>>([])

  const transitions = useTransition(items, item => item.i, {
    from: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-40px,0)' }
  })

  const spring = useSpring({
    transform: out ? `scale(3)` : `scale(1)`,
    opacity: out ? 0 : 1,
    config: { mass: 10, tension: 2000, friction: 200, duration: 400 }
  })

  useEffect(() => {
    WELCOME_TEXT.forEach((value, i) =>
      setTimeout(() => setItems(WELCOME_TEXT.slice(0, 1 + i)), i * 120)
    )
    setTimeout(() => setOut(true), 2000)
    setTimeout(() => history.push('/o'), 2400)
  }, [])

  return (
    <Wrapper>
      <animated.div style={spring}>
        {transitions.map(({ item, props, key }) => (
          <div style={{ display: 'inline-block', minWidth: 50 }} key={key}>
            <animated.div className="trails-text" style={props}>
              {item.t}
            </animated.div>
          </div>
        ))}
      </animated.div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  .trails-text {
    position: relative;
    width: 100%;
    height: 80px;
    line-height: 80px;
    color: palevioletred;
    font-size: 5rem;
    font-weight: 800;
    font-family: 'SwankyandMooMoo', sans-serif;
    text-align: center;
    will-change: transform, opacity;
    overflow: hidden;
  }
`

export default Index
