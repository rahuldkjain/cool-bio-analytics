import PropTypes from 'prop-types'
import React, { useState, useCallback, useRef } from 'react'
import styled, { x } from '@xstyled/styled-components'

const DropdownSelect = styled.select`
  appearance: none;
  background-color: dropdown;
  background-image: url('data:image/svg+xml,<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="m0,6l12,12l12,-12l-24,0z" fill="gray"/><path fill="none" d="m0,0l24,0l0,24l-24,0l0,-24z"/></svg>');
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
  width: 100%;

  &:focus {
    outline: none;
  }
`

const Dropdown = ({ options, styles }) => {
  const handleChange = useCallback(
    ({ target }) => {
      console.log(target.value)
    },
    []
  )

  return (
    <x.select
      onChange={handleChange}
      {...styles}
      appearance="none"
      backgroundColor="dropdown"
      backgroundImage={'url(\'data:image/svg+xml,<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="m0,6l12,12l12,-12l-24,0z" fill="gray"/><path fill="none" d="m0,0l24,0l0,24l-24,0l0,-24z"/></svg>\')'}
      backgroundPosition="calc(100% - 0.4rem) 50%"
      backgroundRepeat="no-repeat"
      backgroundSize="0.6rem"
      border="2px solid"
      borderColor="dropdownBorder"
      borderRadius="4px"
      color="gray"
      cursor="pointer"
      fontWeight={600}
      p="1rem"
      w="100%"
      focusOutline="none"
    >
  {
    options
      .map((region) => {
        return (
        <option
          value={region.key}
          key={region.key}
        >
          {region.name}
        </option>
        )
      })
  }
    </x.select >
  )
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string
  })),
  styles: PropTypes.any,
  value: PropTypes.string
}

export default Dropdown
