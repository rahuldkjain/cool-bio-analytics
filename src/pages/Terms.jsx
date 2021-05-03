import React, { useState, useEffect } from 'react'
import styled, { x } from '@xstyled/styled-components'
import { Helmet } from 'react-helmet-async'

import Navbar from '../components/Navbar'

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
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Terms | Cool Analytics</title>
        <link rel="canonical" href="http://analytics.cool.bio/terms" />
      </Helmet>
      <Navbar />
      <AppWrapper>
        <x.div>Add your site here!</x.div>
      </AppWrapper>
    </>
  )
}

export default Terms
