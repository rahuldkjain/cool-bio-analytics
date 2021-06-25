import React from "react";
import { x, useUp } from "@xstyled/styled-components";
import { Helmet } from "react-helmet-async";

import LottieAnimations from "../components/LottieAnimations";

export default function NotFound() {
  const upMd = useUp("md");
  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Not Found | Cool Analytics</title>
        <link rel="canonical" href="http://analytics.cool.bio/about" />
      </Helmet>
      <x.div
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <LottieAnimations animationName="not-found" width={upMd ? 600 : 300} />
      </x.div>
    </>
  );
}
