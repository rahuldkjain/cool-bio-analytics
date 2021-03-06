import React from "react";
import PropTypes from "prop-types";
import styled from "@xstyled/styled-components";
import { Link } from "react-router-dom";

const NavbarMiddle = styled.div`
  color: gray;
  font-size: 18px;
  font-weight: 900;
  text-transform: uppercase;
  padding-left: ${({ showRow }) => (showRow ? 0 : "10px")};

  @media (min-width: md) {
    font-size: ${({ showRow }) => (showRow ? "1rem" : "0.4rem")};
    padding-bottom: 2rem;
    padding-top: 2rem;
    padding-left: 0;
    text-align: center;
    width: auto;
  }
`;

const BrandLogo = styled.img`
  width: 30px;
`;

const Product = styled.span`
  color: blue;
  padding-left: 5px;

  @media (min-width: md) {
    padding-left: ${({ showRow }) => (showRow ? "5px" : 0)};
    padding-top: ${({ showRow }) => (showRow ? 0 : "5px")};
  }
`;

const BrandLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: md) {
    flex-direction: column;
  }
`;

// This is because React does not recognize the `showRow` prop complain in the Link component
const RowBrandLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: md) {
    flex-direction: row;
  }
`;

function Brand({ showRow }) {
  const LinkComponent = showRow ? RowBrandLink : BrandLink;
  return (
    <NavbarMiddle className="NavbarMiddle" showRow={showRow}>
      <LinkComponent to="/">
        <BrandLogo src="/slogo.svg" />
        <Product showRow={showRow}>Analytics</Product>
      </LinkComponent>
    </NavbarMiddle>
  );
}

Brand.propTypes = {
  showRow: PropTypes.bool,
};

export default Brand;
