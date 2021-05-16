import React, { lazy } from "react";
import { Helmet } from "react-helmet-async";
import styled, { x } from "@xstyled/styled-components";
import { useAuth } from "@nhost/react-auth";
import { Redirect } from "react-router-dom";

const Navbar = lazy(() => import("../../../components/Navbar"));
const Pricing = lazy(() => import("../../../components/Pricing"));

export default function Account(props) {
  console.log(props);
  const { signedIn } = useAuth();

  if (signedIn === null) {
    return <div>loading...</div>;
  }

  if (!signedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Account | Cool Analytics</title>
        <link rel="canonical" href="http://analytics.cool.bio" />
      </Helmet>
      <x.div
        ml={{ md: "9rem", xs: 4 }}
        mr={{ md: "3rem", xs: 4 }}
        mb={8}
        pt={{ md: "5rem", xs: "3rem" }}
      >
        <x.h1 color="gray" mb={16}>
          <div>Plans,</div>
          Add or Edit
        </x.h1>
        <Pricing currentPlan="hobby" signedIn={signedIn} />
      </x.div>
    </>
  );
}
