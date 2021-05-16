import React from "react";
import styled from "@xstyled/styled-components";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import Dropdown from "./Dropdown";

import { getClient } from "../utils/hbp";
import { GET_ALL_PROJECTS } from "../graphql/queries";

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  * {
    align-self: center;
  }
`;

const Label = styled.label`
  color: gray;
  font-size: 0.75rem;
  margin-bottom: 1rem;
  animation: fadeInUp;
  animation-delay: 250ms;
`;

const DropdownWrapper = styled.div`
  animation: fadeInUp;
  animation-delay: 500ms;
  min-width: calc(60%);
  display: flex;
`;

export default function Search() {
  const history = useHistory();
  const { auth } = getClient();
  const user = auth.user();
  const { loading, error, data } = useQuery(GET_ALL_PROJECTS, {
    variables: { userId: user.id },
  });

  function onDropdownChange(e) {
    history.push(`/projects/${e.target.value}`);
  }

  return (
    <SearchWrapper>
      <Label>Filter your websites or apps</Label>
      <DropdownWrapper>
        <Dropdown
          value="cool.bio"
          options={data?.project || []}
          onChange={onDropdownChange}
        />
      </DropdownWrapper>
    </SearchWrapper>
  );
}
