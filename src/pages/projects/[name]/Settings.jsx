import React, { lazy } from "react";
import { useParams } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import styled, { x } from "@xstyled/styled-components";

import PrivateRoute from "../../../components/PrivateRoute";
import SettingsDetails from "../../../components/SettingsDetails";

const Navbar = lazy(() => import("../../../components/Navbar"));

const H1 = styled.h1`
  color: gray;
`;

function Details() {
  const { name } = useParams();

  return (
    <PrivateRoute>
      <Navbar />
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Details | Cool Analytics</title>
        <link rel="canonical" href="http://analytics.cool.bio/about" />
      </Helmet>
      <x.div
        ml={{ md: "9rem", xs: 4 }}
        mr={{ md: "3rem", xs: 4 }}
        mb={8}
        pt={{ md: "5rem", xs: "3rem" }}
      >
        <H1>
          <div>Details,</div>
          cool.bio Analytics
        </H1>
        <SettingsDetails projectId={name} />
      </x.div>
    </PrivateRoute>
  );
}
Details.propTypes = {};

export default Details;
