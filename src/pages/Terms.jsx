import React, { useState, useEffect } from 'react'
import styled, { x } from '@xstyled/styled-components'

import Navbar from '../components/Navbar'
import PrivateRoute from '../components/PrivateRoute'

const pages = [
  {
    pageLink: '/',
    displayName: 'Home',
    showInNavbar: true
  },
  {
    pageLink: '/list',
    displayName: 'List',
    showInNavbar: true
  },
  {
    pageLink: '/about',
    displayName: 'About',
    showInNavbar: true
  },
  {
    pageLink: '/state/:stateCode',
    displayName: 'State',
    showInNavbar: false
  }
]

const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 0;
  margin-right: 0;
  padding-top: 1rem;

  @media (min-width: md) {
    margin-left: 9rem;
    margin-right: 3rem;
    padding-top: 5rem;
  }
`

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 34rem;

  @media (max-width: md) {
    width: 100%;
  }
`

const HomeLeft = styled(HomeWrapper)`
  margin-right: 2.5rem;
  min-height: 60rem;

  @media (max-width: md) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`

const HomeRight = styled(HomeWrapper)`
  margin-left: 2.5rem;
  min-height: 10rem;

  @media (max-width: md) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`

function Terms (props) {
  return (
    <PrivateRoute>
      <Navbar pages={pages} />
      <AppWrapper>
        <x.div>Add your site here!</x.div>
      </AppWrapper>
    </PrivateRoute>
  )
}

export default Terms
