import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

function MetaData({ title }) {
  return (
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link rel="canonical" href="http://analytics.cool.bio" />
      <link rel="canonical" href="http://analytics.cool.bio" />
      <meta charset="utf-8" />
      <meta name="title" content={title} />
      <meta
        name="description"
        content="Open Source Analytics service for web analytics without the need of tracking cookies."
      />
      <meta name="keywords" content="analytics, open-source" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://analytics.cool.bio" />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content="Open Source Analytics service for web analytics without the need of tracking cookies. "
      />
      <meta
        property="og:image"
        content="https://analytics.cool.bio/cool-bio-analytics-demo-dark.png"
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="http://analytics.cool.bio" />
      <meta property="twitter:title" content={title} />
      <meta
        property="twitter:description"
        content="Open Source Analytics service for web analytics without the need of tracking cookies. "
      />
      <meta
        property="twitter:image"
        content="https://analytics.cool.bio/cool-bio-analytics-demo-dark.png"
      />
      <script
        async="true"
        defer="true"
        src="https://analytics.cool.bio/tracking.js"
      ></script>
      <script>
        {`if(typeof require === 'undefined') var require = {};
        if (typeof exports === 'undefined') var exports = {};`}
      </script>
    </Helmet>
  );
}

MetaData.propTypes = {
  title: PropTypes.string,
};

export default MetaData;
