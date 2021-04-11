import React from 'react'
import styled from '@xstyled/styled-components'
import Dropdown from './Dropdown'

const SearchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    * {
        align-self: center;
    }
`

const Label = styled.label`
    color: gray;
    font-size: 0.75rem;
    margin-bottom: 1rem;
    animation: fadeInUp;
    animation-delay: 250ms;
`

const DropdownWrapper = styled.div`
    animation: fadeInUp;
    animation-delay: 500ms;
    min-width: calc(60%);
    display: flex;
`

const dropdownOptions = [{
  key: 'cool.bio',
  name: 'Cool.bio'
},
{
  key: 'higgle.io',
  name: 'Higgle'
}]

export default function Search () {
  return (
        <SearchWrapper>
            <Label>
                Filter your websites or apps
            </Label>
            <DropdownWrapper>
                <Dropdown value="cool.bio" options={dropdownOptions} />
            </DropdownWrapper>
        </SearchWrapper>
  )
}
