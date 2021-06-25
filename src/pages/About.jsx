import PropTypes from "prop-types";
import React, { lazy } from "react";
import { Helmet } from "react-helmet-async";
import styled, { x } from "@xstyled/styled-components";

import Blob from "../components/icon/Blob";

const LottieAnimations = lazy(() => import("../components/LottieAnimations"));
const Navbar = lazy(() => import("../components/Navbar"));

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 34rem;
  width: 50%;

  @media (max-width: md) {
    width: 100%;
  }
`;

const H1 = styled.h1`
  color: gray;
`;

const HomeLeft = styled(HomeWrapper)`
  margin-right: 2.5rem;

  @media (max-width: md) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const HomeRight = styled(HomeWrapper)`
  margin-left: 2.5rem;

  @media (max-width: md) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const CopyRight = styled.div`
  background-color: pinkLight;
  color: pink;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 0.7rem;
  max-width: 600px;
  display: inline;

  @media (min-width: md) {
    font-size: 1rem;
  }
`;

function About({ heading1, heading2 }) {
  return (
    <>
      <Navbar />
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>About | Cool Analytics</title>
        <link rel="canonical" href="http://analytics.cool.bio/about" />
      </Helmet>
      <x.div
        ml={{ md: "9rem", xs: 4 }}
        mr={{ md: "3rem", xs: 4 }}
        mb={8}
        pt={{ md: "5rem", xs: "3rem" }}
      >
        <H1>
          <div>About,</div>
          cool.bio Analytics
        </H1>
        <x.div>
          <x.div
            display="flex"
            flexDirection={{ md: "row", xs: "column" }}
            alignItems="center"
            justifyContent="center"
            mb={32}
            mt={{ md: 0, xs: 32 }}
          >
            <HomeLeft>
              <x.span color="silver" pb={16}>
                {heading1}
              </x.span>
            </HomeLeft>
            <HomeRight>
              <x.div position="relative">
                <Blob fill="redLight" />
                <x.div
                  position="absolute"
                  w="100%"
                  top="50%"
                  right="50%"
                  transform="translate(50%,-50%)"
                >
                  <LottieAnimations animationName="analytics" />
                </x.div>
              </x.div>
            </HomeRight>
          </x.div>
          <x.div
            display="flex"
            flexDirection={{ md: "row", xs: "column-reverse" }}
            alignItems="center"
            justifyContent="center"
            mb={32}
          >
            <HomeLeft>
              <x.div position="relative">
                <Blob fill="redLight" />
                <x.div
                  position="absolute"
                  w="100%"
                  top="50%"
                  right="50%"
                  transform="translate(50%,-50%)"
                  borderRadius={10}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <LottieAnimations animationName="award" width={300} />
                </x.div>
              </x.div>
            </HomeLeft>
            <HomeRight>
              <x.span color="silver" pb={16}>
                {heading2}
              </x.span>
            </HomeRight>
          </x.div>
        </x.div>
        <CopyRight>©2021 cool.bio Analytics. All rights reserved.</CopyRight>
      </x.div>
    </>
  );
}

export default About;

About.propTypes = {
  heading1: PropTypes.string,
  heading2: PropTypes.string,
};
