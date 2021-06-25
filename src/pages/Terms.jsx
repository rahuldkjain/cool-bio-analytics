import React from "react";
import styled, { x } from "@xstyled/styled-components";
import { Helmet } from "react-helmet-async";

import Navbar from "../components/Navbar";

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
`;

function Terms(props) {
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
  );
}

export default Terms;
