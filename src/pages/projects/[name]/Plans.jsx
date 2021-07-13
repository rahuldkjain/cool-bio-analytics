import PropTypes from "prop-types";
import React, { lazy } from "react";
import { x } from "@xstyled/styled-components";
import { Redirect, useParams } from "react-router-dom";
import MetaData from "../../../components/MetaData";
import { useAuth } from "../../../providers/AuthProvider";

const Navbar = lazy(() => import("../../../components/Navbar"));
const Pricing = lazy(() => import("../../../components/Pricing"));

function Plans({ products }) {
  const { token } = useAuth();
  const { name } = useParams();

  if (token === null) {
    return <div>loading...</div>;
  }

  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Navbar />
      <MetaData title="Plans | Cool Analytics" />
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
        <Pricing token={token} products={products} projectId={name} />
      </x.div>
    </>
  );
}

Plans.propTypes = {
  products: PropTypes.any,
};

export default Plans;
