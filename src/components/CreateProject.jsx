import React, { useState } from 'react'
import styled, { x } from '@xstyled/styled-components'

import Dropdown from './Dropdown'

import { timeZones } from '../config/constants'

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
  width: 150px;
  text-align: center;
  animation: fadeInUp;
  animation-delay: 0ms;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: dorpdownHover;
  }
`

const Base = styled.div`
    border: 2px solid;
    border-color: dropdownBorder;
    display: flex;
    align-items: center;
    position: relative;
    background-color: dropdown;
    border-radius: 5px;
    margin: 1.5rem 0;
    padding-left: 1rem;
    padding-right: 1rem;
    max-width: 350px;

    &:focus-within {
        @media (-webkit-min-device-pixel-ratio: 0): {
          outlineColor: -webkit-focus-ring-color;
          outlineStyle: auto;
        }
        outline-width: 2px;
        outline-style: solid;
        outline-color: Highlight;
    }
`

export default function CreateProject () {
  const [isShowingForm, setShowForm] = useState(false)
  const [domainName, setDomainName] = useState('')

  function showForm () {
    setShowForm(true)
  }

  function onDomainNameChange (event) {
    const { value } = event.target
    setDomainName(value)
  }

  function submitHandler (event) {
    event.preventDefault()
    console.log(domainName)
    setShowForm(false)
  }

  return (
        <x.div>
            {isShowingForm
              ? <x.form
                    animation="fadeInUp"
                    animationDelay="0ms"
                    onSubmit={submitHandler}
                    display="flex"
                    flexDirection="column"
                >
                    <x.label color="gray" fontSize={{ md: 'xl', xs: 'lg' }}>Add domain</x.label>
                    <Base>
                        <x.span color="silver" fontSize="16px">https://</x.span>
                        <x.input
                            type='text'
                            name='domainName'
                            onChange={onDomainNameChange}
                            fontSize="16px"
                            py={4}
                            px={1}
                            placeholder="Enter domain name"
                            color="gray"
                            w="100%"
                            outline="none"
                            backgroundColor="dropdown"
                        />
                    </Base>
                    <x.label color="gray" fontSize={{ md: 'xl', xs: 'lg' }}>Reporting Timezone</x.label>
                    <Dropdown value="cool.bio" options={timeZones} styles={{ maxWidth: 350, my: '1.5rem' }} />
                    <Button type="submit">Submit</Button>
                </x.form>
              : <Button onClick={showForm}>Add another</Button>
            }
        </x.div>
  )
}
