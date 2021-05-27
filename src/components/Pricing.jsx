import PropTypes from "prop-types";
import React, { useState } from "react";
import styled, { x, useTheme } from "@xstyled/styled-components";
import { Link, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import Loading from "./Loading";

import { getClient } from "../utils/hbp";
import { pricesData } from "../config/constants";
import { postData } from "../utils/helpers";
import { getStripe } from "../utils/stripe";
import { GET_PROJECT_CURRENT_PLAN } from "../graphql/queries";

const Button = styled.button`
  appearance: none;
  background-color: dropdown;
  background-position-x: calc(100% - 0.4rem);
  background-position-y: 50%;
  background-repeat: no-repeat;
  background-size: 0.6rem;
  border: 2px solid;
  border-color: dropdownBorder;
  border-radius: 4px;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  padding: 1rem;
  padding-right: 1.4rem;
  width: 120px;
  text-align: center;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: dorpdownHover;
  }
`;

function getBackGround(index) {
  switch (index) {
    case 0:
      return "cherryLight";
    case 1:
      return "blueLight";
    case 2:
      return "greenLight";
    case 3:
      return "grayLight";
    default:
      return "";
  }
}

function getColor(index) {
  switch (index) {
    case 0:
      return "cherry";
    case 1:
      return "blue";
    case 2:
      return "green";
    case 3:
      return "gray";
    default:
      return "";
  }
}

function Pricing({ signedIn, products = [], projectId }) {
  const [billingInterval, setBillingInterval] = useState("month");
  const [checkoutPortalLoading, setcheckoutPortalLoading] = useState(false);
  const { auth } = getClient();
  const token = auth.getJWTToken();
  const history = useHistory();
  const {
    loading,
    error,
    data = {},
  } = useQuery(GET_PROJECT_CURRENT_PLAN, {
    variables: {
      projectId,
    },
  });
  const currentPlan = data?.project?.subscriptions?.[0]?.price?.product?.id;
  const onBillingIntervalChange = (val) => async () => {
    setBillingInterval(val);
  };

  const redirectToCustomerPortal = async () => {
    setcheckoutPortalLoading(true);
    try {
      const portalData = await postData({
        url: "/api/v1/payment/create-portal-link",
        data: {},
        token,
      });

      if (portalData) {
        window.location.assign(portalData?.url);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setcheckoutPortalLoading(false);
    }
  };

  const handleCheckout = (price) => async () => {
    setcheckoutPortalLoading(true);
    if (!signedIn) {
      return history.push("/login");
    }

    try {
      const projectData = await postData({
        url: "/api/v1/payment/checkout",
        data: {
          price,
          metadata: {
            projectId,
          },
        },
        token,
      });

      console.log(projectData);
      if (projectData) {
        const stripe = await getStripe();
        stripe.redirectToCheckout({ sessionId: projectData.sessionId });
      }
    } catch (error) {
      return console.log(error.message);
    } finally {
      setcheckoutPortalLoading(false);
    }
  };

  if (signedIn === null) {
    return <div>loading...</div>;
  }

  if (error) {
    <x.div color="red">{error.toString()}</x.div>;
  }

  return (
    <>
      {!currentPlan && (
        <>
          <x.h2
            color="silver"
            py={4}
            fontSize={{ md: "4xl", xs: "xl" }}
            fontWeight="700"
            animation="fadeInUp"
            animationDelay="0ms"
          >
            Pricing Plans
          </x.h2>
          <x.p color="gray" pb={{ md: 24, xs: 16 }}>
            Start tracking for free, then add a site plan to track more. Account
            plans unlock additional features.
          </x.p>
        </>
      )}
      <x.div
        mb={{ md: 16, xs: 12 }}
        p={2}
        borderRadius=".5rem"
        border="1px solid"
        borderColor="dropdownBorder"
        backgroundColor="grayLight"
        animation="fadeInUp"
        animationDelay="100ms"
        display="inline-flex"
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
          Monthly billing
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
          Yearly billing
        </x.button>
      </x.div>
      <x.div
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        animation="fadeInUp"
        animationDelay="250ms"
      >
        {products.map(({ id, name, description, prices = [] }, index) => {
          const price = prices.find(
            (item) => item.interval === billingInterval
          );
          const priceString = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: price?.currency || "usd",
            minimumFractionDigits: 0,
          }).format((price?.unit_amount || 0) / 100);
          const color = pricesData[index].color;

          return (
            <x.div
              p={8}
              borderRadius="35px"
              backgroundColor={
                id === currentPlan ? getBackGround(index) : "transparent"
              }
              display="flex"
              alignItems="center"
              flexDirection="column"
              m={5}
              flex="1"
              maxWidth={{ md: "25%", xs: "80%" }}
              key={id}
              textAlign="center"
            >
              <x.h3
                fontWeight="700"
                color={color}
                fontSize={{ md: "2xl", xs: "xl" }}
                mb={5}
                flex={1}
              >
                {name}
              </x.h3>
              <x.p color="gray" fontSize="sm" flex={1}>
                {description}
              </x.p>
              <x.span
                color={color}
                fontSize={{ md: "4xl", xs: "2xl" }}
                pt={4}
                pb={8}
              >
                <x.span>{priceString}</x.span>
                <x.span fontSize={{ md: "16px", xs: "sm" }} color="gray" pl={2}>
                  /{billingInterval}
                </x.span>
              </x.span>
              {currentPlan === id ? (
                <x.span color={getColor(index)}>Current plan</x.span>
              ) : (
                <Button
                  onClick={
                    currentPlan
                      ? redirectToCustomerPortal
                      : handleCheckout(price?.id)
                  }
                  disabled={loading}
                >
                  {checkoutPortalLoading ? (
                    <Loading />
                  ) : currentPlan ? (
                    "Change"
                  ) : (
                    "Start"
                  )}
                </Button>
              )}
            </x.div>
          );
        })}
      </x.div>
    </>
  );
}

Pricing.propTypes = {
  projectId: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.any),
  signedIn: PropTypes.bool,
};

export default Pricing;
