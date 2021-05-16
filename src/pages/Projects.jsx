import React, { useState, lazy } from "react";
import styled, { x } from "@xstyled/styled-components";
import { Helmet } from "react-helmet-async";

import PrivateRoute from "../components/PrivateRoute";

const AddedProjects = lazy(() => import("../components/AddedProjects"));
const Navbar = lazy(() => import("../components/Navbar"));
const CreateProject = lazy(() => import("../components/CreateProject"));

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-left: 0;
  margin-right: 0;
  padding: 0.7rem;
  padding-top: 3rem;
  padding-bottom: 3rem;

  @media (min-width: md) {
    margin-left: 9rem;
    margin-right: 3rem;
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
`;

function Projects(props) {
  const [billingInterval, setBillingInterval] = useState("month");

  const onBillingIntervalChange = (val) => () => {
    setBillingInterval(val);
  };

  return (
    <PrivateRoute>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Projects | Cool Analytics</title>
        <link rel="canonical" href="http://analytics.cool.bio/projects" />
      </Helmet>
      <Navbar />
      <AppWrapper>
        <x.h1 fontSize={{ md: "4xl", xs: "2xl" }} fontWeight="500" color="gray">
          <div>Projects,</div>
          Add or Edit
        </x.h1>
        <x.div
          my={{ md: 8, xs: 4 }}
          p={2}
          borderRadius=".5rem"
          border="1px solid"
          borderColor="dropdownBorder"
          backgroundColor="grayLight"
          w="max-content"
        >
          <x.button
            fontSize="sm"
            px={8}
            py={4}
            borderRadius=".375rem"
            backgroundColor={
              billingInterval === "month" ? "greenLight" : "transparent"
            }
            color="green"
            onClick={onBillingIntervalChange("month")}
          >
            Ascending
          </x.button>
          <x.button
            fontSize="sm"
            px={8}
            py={4}
            borderRadius=".375rem"
            backgroundColor={
              billingInterval === "year" ? "greenLight" : "transparent"
            }
            color="green"
            onClick={onBillingIntervalChange("year")}
          >
            Descending
          </x.button>
        </x.div>
        <AddedProjects />
        <CreateProject />
      </AppWrapper>
    </PrivateRoute>
  );
}

export default Projects;
