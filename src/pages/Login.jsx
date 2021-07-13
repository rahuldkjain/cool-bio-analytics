import React from "react";
import styled, { useColorMode } from "@xstyled/styled-components";
import { Redirect } from "react-router-dom";

import Brand from "../components/Brand";
import SunMoon from "../components/SunMoon";
import Github from "../components/icon/Github";
import Google from "../components/icon/Google";
import MetaData from "../components/MetaData";
import { useAuth } from "../providers/AuthProvider";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 34rem;
  align-items: flex-start;
  justify-content: space-around;
  flex: 1;

  @media (max-width: md) {
    width: 100%;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  flex: 1;
`;

const BrandWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const H1 = styled.h1`
  color: gray;
`;

const LoginLogo = styled.a`
  margin-right: 40px;
`;

const LogoinLogoWrapper = styled.div`
  display: flex;
  margin-top: 30px;

  @media (min-width: md) {
    margin-top: 50px;
  }
`;

const CopyRight = styled.div`
  background-color: pinkLight;
  color: pink;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 0.7rem;

  @media (min-width: md) {
    font-size: 1rem;
  }
`;

export default function Login(props) {
  const [mode] = useColorMode(false);
  const { token } = useAuth();

  if (token === null) {
    return <div>loading...</div>;
  }

  if (token) {
    return <Redirect to="/projects" />;
  }

  return (
    <>
      <MetaData title="Login | Cool Analytics" />
      <LoginContainer>
        <LoginWrapper>
          <BrandWrapper>
            <Brand showRow />
            <SunMoon />
          </BrandWrapper>
          <div>
            <H1>
              <div>Welcome,</div>
              Singup or Login
            </H1>
            <LogoinLogoWrapper>
              <LoginLogo href="/api/v1/auth/google/redirect">
                <Google />
              </LoginLogo>
              <LoginLogo href="/api/v1/auth/github/redirect">
                <Github fill={mode === "dark" ? "#fff" : "#000"} />
              </LoginLogo>
            </LogoinLogoWrapper>
          </div>
          <CopyRight>©2021 cool.bio Analytics. All rights reserved.</CopyRight>
        </LoginWrapper>
      </LoginContainer>
    </>
  );
}
