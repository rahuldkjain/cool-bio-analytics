import React, { lazy, useState } from "react";
import PropTypes from "prop-types";
import { x } from "@xstyled/styled-components";
import { useQuery, useMutation } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";

import { GET_PROJECT_DETAILS_BY_ID_FOR_SETTINGS } from "../graphql/queries";

import { DELETE_PROJECT_BY_ID } from "../graphql/mutation";

import Loading from "../components/Loading";

const CreateProject = lazy(() => import("../components/CreateProject"));

function SettingsDetails({ projectId }) {
  const history = useHistory();
  const [deleting, setDeletinga] = useState(false);
  const [deleteProject] = useMutation(DELETE_PROJECT_BY_ID);
  const {
    loading,
    error,
    data = {},
  } = useQuery(GET_PROJECT_DETAILS_BY_ID_FOR_SETTINGS, {
    variables: {
      projectId,
    },
  });

  async function onDeleteProject() {
    try {
      setDeletinga(true);
      await deleteProject({
        variables: {
          projectId,
        },
      });
      setDeletinga(false);
      history.push("/projects");
    } catch (error) {
      console.error(error);
      setDeletinga(false);
    }
  }

  return error ? (
    <x.div py={8} color="red">
      There was an error. Reload the page!
    </x.div>
  ) : (
    <x.div>
      <x.div py={8}>
        <x.h2
          color="silver"
          mt={4}
          mb={2}
          fontSize={{ md: "2xl", xs: "xl" }}
          fontWeight="700"
        >
          General
        </x.h2>
        <x.p color="gray" mb={5}>
          Edit or change details.
        </x.p>
        {loading ? (
          <x.div animation="pulse" pb={12}>
            <x.div flex="1" py={1}>
              <x.div display="flex">
                <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
                <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
                <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
              </x.div>
            </x.div>
            <x.div flex="1" py={1}>
              <x.div display="flex">
                <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
                <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
                <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
              </x.div>
            </x.div>
            <x.div flex="1" py={1}>
              <x.div display="flex">
                <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
                <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
                <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
              </x.div>
            </x.div>
          </x.div>
        ) : (
          <CreateProject
            editEnabled
            disableEdits={{ domain: true }}
            domain={data?.project?.domain}
            timezone={data?.project?.timezone}
            projectId={projectId}
          />
        )}
      </x.div>
      <x.div py={8} animation="fadeInUp" animationDelay="250ms">
        <x.h2
          color="silver"
          mt={4}
          mb={2}
          fontSize={{ md: "2xl", xs: "xl" }}
          fontWeight="700"
        >
          Plan
        </x.h2>
        <x.p color="gray">
          Your personal account is on the{" "}
          <x.span fontWeight="700">
            {data?.project?.subscriptions?.[0]?.price?.product?.name || "Hobby"}
          </x.span>
        </x.p>
        <x.div pt={8} maxWidth={800}>
          <Link to={`/projects/${projectId}/plans`}>
            <x.div
              bg="blueLight"
              color="blue"
              borderRadius="5px"
              py={3}
              px={6}
              maxWidth="20rem"
              display="inline-block"
            >
              Change plan
            </x.div>
          </Link>
        </x.div>
      </x.div>
      <x.div py={8} animation="fadeInUp" animationDelay="500ms">
        <x.h2
          color="silver"
          mt={4}
          mb={2}
          fontSize={{ md: "2xl", xs: "xl" }}
          fontWeight="700"
        >
          Delete Project
        </x.h2>
        <x.p color="gray">Deleting a project is irreversible.</x.p>
        <x.div pt={8} maxWidth={800}>
          <x.button
            bg="redLight"
            color="red"
            borderRadius="5px"
            py={3}
            px={6}
            maxWidth="20rem"
            display="inline-block"
            onClick={onDeleteProject}
          >
            {deleting ? <Loading /> : "Delete"}
          </x.button>
        </x.div>
      </x.div>
    </x.div>
  );
}

SettingsDetails.propTypes = {
  projectId: PropTypes.string,
};

export default SettingsDetails;
