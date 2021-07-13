import PropTypes from "prop-types";
import React, { lazy } from "react";
import styled, { x } from "@xstyled/styled-components";
import { useSubscription } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/subscription";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import LoadingAndErrorHandler from "./LoadingAndErrorHandler";
dayjs.extend(timezone);
dayjs.extend(utc);

const Table = lazy(() => import("./Table"));

const ActionLink = styled(Link)`
  background-color: greenLight;
  color: green;
  border-radius: 5px;
  padding: 0.5rem;
  max-width: 20rem;
`;

function dateFormat(date) {
  return dayjs(date).tz("Europe/Paris").format("MMMM D, YYYY h:mm A");
}

const columns = [
  {
    Header: "Domain",
    accessor: "domain",
  },
  {
    Header: "Tracking Id",
    accessor: "projectId",
  },
  {
    Header: "Created at",
    accessor: "createdAt",
    Cell: ({ cell }) => {
      const date = dateFormat(
        cell?.row?.original?.createdAt,
        cell?.row?.original?.timezone
      );
      return date;
    },
  },
  {
    Header: "Reporting as",
    accessor: "timezone",
  },
  {
    Header: "Share Id",
    accessor: "shareId",
  },
  {
    Header: "Actions",
    accessor: "actions",
    Cell({ cell }) {
      return (
        <x.div display="flex" justifyContent="center">
          <ActionLink
            to={`/projects/${cell?.row?.original?.projectId}/settings`}
            style={{ marginRight: 20 }}
          >
            Settings
          </ActionLink>
          <ActionLink to={`/projects/${cell?.row?.original?.projectId}`}>
            View
          </ActionLink>
        </x.div>
      );
    },
  },
];

function AddedProjects({ order }) {
  const { loading, error, data } = useSubscription(GET_PROJECTS, {
    variables: {
      order,
    },
  });

  return (
    <LoadingAndErrorHandler loading={loading} error={error}>
      <x.div
        animation="fadeInUp"
        animationDelay="0ms"
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <x.h2
          color="silver"
          py={4}
          fontSize={{ md: "xl", xs: "lg" }}
          fontWeight="700"
        >
          Total Pages
        </x.h2>
        <x.span
          backgroundColor="brickLight"
          borderRadius="5px"
          padding={2}
          max-width={10}
          color="brick"
          fontSize={{ md: "xl", xs: "lg" }}
          ml={4}
        >
          {data?.project?.length || 0}
        </x.span>
      </x.div>
      <Table columns={columns} data={data?.project || []} />
    </LoadingAndErrorHandler>
  );
}

AddedProjects.propTypes = {
  order: PropTypes.string,
};

export default AddedProjects;
