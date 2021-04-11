import React, { useState, useEffect } from 'react'
import styled, { x } from '@xstyled/styled-components'
import { useSessionStorage } from 'react-use'

import Navbar from '../components/Navbar'
import PrivateRoute from '../components/PrivateRoute'

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
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 0;
  margin-right: 0;
  padding-top: 1rem;

  @media (min-width: md) {
    margin-left: 9rem;
    margin-right: 3rem;
    padding-top: 5rem;
  }
`

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 34rem;

  @media (max-width: md) {
    width: 100%;
  }
`

const HomeLeft = styled(HomeWrapper)`
  margin-right: 2.5rem;
  min-height: 60rem;

  @media (max-width: md) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`

const HomeRight = styled(HomeWrapper)`
  margin-left: 2.5rem;
  min-height: 10rem;

  @media (max-width: md) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`

const MapLevelWrapper = styled.div`
  position: relative;
  margin-top: 1rem;
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

function Projects (props) {
  console.log('home----->')
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
        <x.div>Add your site here!</x.div>
      </AppWrapper>
    </PrivateRoute>
  )
}

export default Projects
