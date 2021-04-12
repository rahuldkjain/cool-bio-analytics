import React, { useState, lazy } from 'react'
import styled, { x } from '@xstyled/styled-components'
import { useSessionStorage } from 'react-use'

import PrivateRoute from '../components/PrivateRoute'

const Table = lazy(() => import('../components/Table'))
const Navbar = lazy(() => import('../components/Navbar'))

const pages = [
  {
    pageLink: '/',
    displayName: 'Home',
    showInNavbar: true
  },
  {
    pageLink: '/list',
    displayName: 'List',
    showInNavbar: true
  },
  {
    pageLink: '/about',
    displayName: 'About',
    showInNavbar: true
  },
  {
    pageLink: '/state/:stateCode',
    displayName: 'State',
    showInNavbar: false
  }
]

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-left: 0;
  margin-right: 0;
  padding-top: 1rem;

  @media (min-width: md) {
    margin-left: 9rem;
    margin-right: 3rem;
    padding-top: 5rem;
  }
`

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

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: dorpdownHover;
  }
`

const data = {
  delta: {
    confirmed: 2074,
    deceased: 5,
    recovered: 810
  },
  delta7: {
    confirmed: 311737,
    deceased: 1490,
    other: 91,
    recovered: 165540,
    tested: 6204434,
    vaccinated: 13505932
  },
  meta: {
    last_updated: '2021-03-27T18:21:52+05:30',
    population: 1332900000,
    tested: {
      last_updated: '2021-03-26',
      source: 'https://twitter.com/ICMRDELHI/status/1375661955516538887'
    },
    vaccinated: {
      last_updated: '2021-03-26',
      source: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1708008'
    }
  },
  total: {
    confirmed: 11910447,
    deceased: 161280,
    other: 4802,
    recovered: 11293659,
    tested: 239769553,
    vaccinated: 58109773
  }
}

const columns = [
  {
    Header: 'Country',
    accessor: 'country'
  },
  {
    Header: 'Active',
    accessor: 'active'
  },
  {
    Header: 'Visits',
    accessor: 'visits'
  },
  {
    Header: 'Users',
    accessor: 'users'
  },
  {
    Header: 'Progress',
    accessor: 'progress'
  }
]

const tableData = [
  {
    users: 'rabbit',
    lastName: 'kitten',
    country: 1,
    visits: 57,
    progress: 13,
    active: 'single',
    subRows: undefined
  },
  {
    users: 'rabbit',
    lastName: 'kitten',
    country: 1,
    visits: 57,
    progress: 13,
    active: 'single',
    subRows: undefined
  },
  {
    users: 'rabbit',
    lastName: 'kitten',
    country: 1,
    visits: 57,
    progress: 13,
    active: 'single',
    subRows: undefined
  },
  {
    users: 'rabbit',
    lastName: 'kitten',
    country: 1,
    visits: 57,
    progress: 13,
    active: 'single',
    subRows: undefined
  },
  {
    users: 'rabbit',
    lastName: 'kitten',
    country: 1,
    visits: 57,
    progress: 13,
    active: 'single',
    subRows: undefined
  }
]

function Projects(props) {
  const [billingInterval, setBillingInterval] = useState('month')

  const onBillingIntervalChange = (val) => () => {
    setBillingInterval(val)
  }
  const [mapStatistic, setMapStatistic] = useSessionStorage(
    'mapStatistic',
    'active'
  )
  const [graphData, setGraphData] = useState({})
  const [timeseriesData, setTimeSeriesData] = useState({})
  const [currentDates, setConfigDates] = useState([])
  const [date, setDate] = useState('')
  return (
    <PrivateRoute>
      <Navbar pages={pages} />
      <AppWrapper>
        <x.h1
          fontSize={{ md: '4xl', xs: '2xl' }}
          fontWeight="500"
          color="blue"
        >Add your site here!</x.h1>
        <x.div
          my={{ md: 8, xs: 4 }}
          p={2}
          borderRadius=".5rem"
          border="1px solid"
          borderColor="dropdownBorder"
          backgroundColor="grayLight"
          w="max-content"
        >
          <x.button
            fontSize="sm"
            px={8}
            py={4}
            borderRadius=".375rem"
            backgroundColor={billingInterval === 'month' ? 'greenLight' : 'transparent'}
            color="green"
            onClick={onBillingIntervalChange('month')}
          >
            Ascending
          </x.button>
          <x.button
            fontSize="sm"
            px={8}
            py={4}
            borderRadius=".375rem"
            backgroundColor={billingInterval === 'year' ? 'greenLight' : 'transparent'}
            color="green"
            onClick={onBillingIntervalChange('year')}
          >
            Descending
          </x.button>
        </x.div>
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
            fontSize={{ md: 'xl', xs: 'lg' }}
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
            fontSize={{ md: 'xl', xs: 'lg' }}
            ml={4}
          >
            4
          </x.span>
        </x.div>
        <Table columns={columns} data={tableData} />
        <Button>Add another</Button>
      </AppWrapper>
    </PrivateRoute>
  )
}

export default Projects
