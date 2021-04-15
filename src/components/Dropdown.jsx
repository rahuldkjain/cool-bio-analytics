import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { x } from '@xstyled/styled-components'

const Dropdown = ({ options, styles, onChange, name }) => {
  const handleChange = useCallback(
    (event) => {
      console.log(event)
      if (typeof onChange === 'function') {
        onChange(event)
      }
    },
    []
  )

  return (
    <x.select
      onChange={handleChange}
      name={name}
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
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string
  })),
  styles: PropTypes.any,
  value: PropTypes.string
}

export default Dropdown
