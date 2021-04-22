import PropTypes from "prop-types";
import React, { useState, useCallback, useRef } from 'react'
import * as Icon from 'react-feather'
import { NavLink } from 'react-router-dom'
import { useSpring, useTransition, animated } from 'react-spring'
import { useLockBodyScroll, useWindowSize } from 'react-use'
import styled, { x } from '@xstyled/styled-components'

import Brand from './Brand'
import SunMoon from './SunMoon'

import { auth } from '../utils/hbp'
import {
  SLIDE_IN,
  SLIDE_OUT,
  SLIDE_IN_MOBILE,
  SLIDE_OUT_MOBILE
} from '../utils/animations'

import { pages } from '../config/constants'

const NavWrapper = styled(animated.div)`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 4rem;
  justify-content: space-between;

  @media (min-width: md) {
    flex-direction: column;
    background-color: nav;
    height: 100%;
    justify-content: flex-start;
    min-width: 5rem;
    position: fixed;
    z-index: 999;
  }
`

const NavbarRight = styled.div`
  color: gray;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  padding: 1.5rem;
  text-align: center;
  background-color: nav;

  @media (min-width: md) {
    align-items: center;
    display: flex;
    flex-direction: column;
    order: 2;
    padding-bottom: 0;
    padding-top: 0;

    span {
      display: flex;
      flex-direction: row;
      height: 1.5rem;
      justify-content: center;
      margin-bottom: 1.5rem;
      margin-top: 1.5rem;

      &:hover {
        color: pblueMid;
      }
    }
  }
`

const ExpandWrapper = styled.div`
  background-color: nav;
  color: gray;
  display: flex;
  flex-direction: column;
  width: 100vw;
  z-index: 9999;

  & > * {
    border-bottom: 1px solid;
    border-top: 1px solid;
    border-color: grayLight;
    padding: 1.5rem;
    transition: all 0.15s ease-in-out;

    &:hover {
      background-color: pblueHover;
    }

    span {
      &.focused {
        background-color: pblueLight;
        color: pblue;
        padding: 0.25rem;
      }
    }
  }

  @media (min-width: md) {
    flex-direction: column;
    height: calc(100% - 5.5rem);
    padding-left: 0;
    padding-top: 6.65rem;
    top: 0;
    width: 15rem;

    & > * {
      border: 0;
      color: gray;
      font-weight: 600;
      height: 1.5rem;
      width: 12rem;
    }
  }
`

const ExpandBottom = styled.div`
  align-self: flex-start;
  border: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h5 {
    margin: 0;
  }

  &:hover {
    background: none;
  }
`

const WrapperRouterLink = styled(NavLink)`
  pointer-events: ${({ disable }) => (disable ? 'none' : 'auto')};

  &.active {
    span {
      background-color: pblueLight;
      color: pblue;
      padding: 0.25rem;
    }
  }
`

const WrapperRouterIconLink = styled(NavLink)`
  pointer-events: ${({ disable }) => (disable ? 'none' : 'auto')};

  &.active {
    svg {
      stroke: pblue;
    }
  }
`

function Navbar ({
  darkMode
}) {
  const [expand, setExpand] = useState(false)
  const user = auth.user()
  console.log(user)
  useLockBodyScroll(expand)
  const windowSize = useWindowSize()
  const [spring, set, stop] = useSpring(() => ({ opacity: 0 }))
  set({ opacity: 1 })
  stop()

  const transitions = useTransition(expand, null, {
    from: windowSize.width < 769 ? SLIDE_IN_MOBILE : SLIDE_IN,
    enter: windowSize.width < 769 ? SLIDE_OUT_MOBILE : SLIDE_OUT,
    leave: windowSize.width < 769 ? SLIDE_IN_MOBILE : SLIDE_IN,
    config: { mass: 1, tension: 210, friction: 26 }
  })

  const handleMouseEnter = useCallback(() => {
    if (windowSize.width > 769) {
      setExpand(true)
    }
  }, [windowSize.width])

  const logout = async () => {
    await auth.logout()
  }

  return (
    <NavWrapper style={spring}>
      {user &&
        <x.button
          order={3}
          textAlign="center"
          mb={8}
          mt="auto"
          color="gray"
          fontSize="sm"
          backgroundColor="transparent"
          onClick={logout}
        >
          Logout
      </x.button>
      }
      <Brand />
      <NavbarRight
        onMouseEnter={handleMouseEnter}
        {...(windowSize.width < 769 && {
          onClick: setExpand.bind(this, !expand)
        })}
      >
        {windowSize.width < 769 && (
          <span>{expand ? 'Close' : 'Menu'}</span>
        )}

        {windowSize.width > 769 && (
          <>
            <WrapperRouterIconLink to="/" exact>
              <span>
                <Icon.Home />
              </span>
            </WrapperRouterIconLink>
            <WrapperRouterIconLink to="/projects">
              <span>
                <Icon.Book />
              </span>
            </WrapperRouterIconLink>
            <WrapperRouterIconLink to="/about" exact>
              <span>
                <Icon.HelpCircle />
              </span>
            </WrapperRouterIconLink>
            <span>
              <SunMoon {...{ darkMode }} />
            </span>
          </>
        )}
      </NavbarRight>

      {transitions.map(({ item, key, props }) =>
        item
          ? (
            <animated.div key={key} style={props}>
              <Expand {...{ pages, setExpand, darkMode, windowSize }} />
            </animated.div>
            )
          : (
            <animated.div key={key} style={props}></animated.div>
            )
      )}
    </NavWrapper>
  )
}

Navbar.propTypes = {
  darkMode: PropTypes.any
}

function Expand ({ pages, setExpand, darkMode, windowSize }) {
  const expandElement = useRef(null)

  const handleMouseLeave = useCallback(() => {
    windowSize.width > 768 && setExpand(false)
  }, [setExpand, windowSize.width])

  return (
    <ExpandWrapper ref={expandElement} onMouseLeave={handleMouseLeave}>
      {pages.map((page, i) => {
        if (page.showInNavbar === true) {
          return (
            <WrapperRouterLink
              to={page.pageLink}
              key={i}
              exact={page.exact}
              {...(windowSize.width < 769 && {
                onClick: setExpand.bind(this, false)
              })}
            >
              <span>
                {page.displayName}
              </span>
            </WrapperRouterLink>
          )
        }
        return null
      })}

      {windowSize?.width < 768 && <SunMoon {...{ darkMode }} />}

      <ExpandBottom>
        <h5>A crowdsourced initiative.</h5>
      </ExpandBottom>
    </ExpandWrapper>
  )
}

Expand.propTypes = {
  darkMode: PropTypes.any,
  pages: PropTypes.arrayOf(PropTypes.shape()),
  setExpand: PropTypes.func,
  windowSize: PropTypes.shape({
    width: PropTypes.number
  })
}

export default Navbar
