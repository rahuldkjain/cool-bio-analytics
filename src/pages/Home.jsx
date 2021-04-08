import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import styled from "@xstyled/styled-components";
import { useSessionStorage } from 'react-use';

import timeseries from '../config/timeSeries.json'
import graph from '../config/graph.json'
import dates from '../config/dates';

import Search from '../components/Search'
import Actions from '../components/Actions'
import MapSwitcher from '../components/MapSwitcher'
import Level from '../components/Level'
import Minigraphs from '../components/Minigraphs'
import Map from '../components/Map'
import MapPanel from '../components/MapPanel'
import StateHeader from '../components/StateHeader'
import Table from '../components/Table';
import Timeseries from '../components/Timeseries';
import Navbar from '../components/Navbar';
import { PrivateRoute } from '../components/PrivateRoute';

const pages = [
  {
    pageLink: '/',
    displayName: 'Home',
    showInNavbar: true,
  },
  {
    pageLink: '/list',
    displayName: 'List',
    showInNavbar: true,
  },
  {
    pageLink: '/about',
    displayName: 'About',
    showInNavbar: true,
  },
  {
    pageLink: '/state/:stateCode',
    displayName: 'State',
    showInNavbar: false,
  },
];

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
`;


const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 34rem;

  @media (max-width: md) {
    width: 100%;
  }
`;

const HomeLeft = styled(HomeWrapper)`
  margin-right: 2.5rem;
  min-height: 60rem;

  @media (max-width: md) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;

const HomeRight = styled(HomeWrapper)`
  margin-left: 2.5rem;
  min-height: 10rem;

  @media (max-width: md) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;


const MapLevelWrapper = styled.div`
  position: relative;
  margin-top: 1rem;
`;

const data = {
  "delta": {
    "confirmed": 2074,
    "deceased": 5,
    "recovered": 810
  },
  "delta7": {
    "confirmed": 311737,
    "deceased": 1490,
    "other": 91,
    "recovered": 165540,
    "tested": 6204434,
    "vaccinated": 13505932
  },
  "meta": {
    "last_updated": "2021-03-27T18:21:52+05:30",
    "population": 1332900000,
    "tested": {
      "last_updated": "2021-03-26",
      "source": "https://twitter.com/ICMRDELHI/status/1375661955516538887"
    },
    "vaccinated": {
      "last_updated": "2021-03-26",
      "source": "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1708008"
    }
  },
  "total": {
    "confirmed": 11910447,
    "deceased": 161280,
    "other": 4802,
    "recovered": 11293659,
    "tested": 239769553,
    "vaccinated": 58109773
  }
}

const columns = [
  {
    Header: 'Country',
    accessor: 'country',
  },
  {
    Header: 'Active',
    accessor: 'active',
  },
  {
    Header: 'Visits',
    accessor: 'visits',
  },
  {
    Header: 'Users',
    accessor: 'users',
  },
  {
    Header: 'Progress',
    accessor: 'progress',
  },
]

const tableData = [
  {
    users: "rabbit",
    lastName: "kitten",
    country: 1,
    visits: 57,
    progress: 13,
    active: "single",
    subRows: undefined
  },
  {
    users: "rabbit",
    lastName: "kitten",
    country: 1,
    visits: 57,
    progress: 13,
    active: "single",
    subRows: undefined
  },
  {
    users: "rabbit",
    lastName: "kitten",
    country: 1,
    visits: 57,
    progress: 13,
    active: "single",
    subRows: undefined
  },
  {
    users: "rabbit",
    lastName: "kitten",
    country: 1,
    visits: 57,
    progress: 13,
    active: "single",
    subRows: undefined
  },
  {
    users: "rabbit",
    lastName: "kitten",
    country: 1,
    visits: 57,
    progress: 13,
    active: "single",
    subRows: undefined
  }
]

export default function Home(props) {
  const [mapStatistic, setMapStatistic] = useSessionStorage(
    'mapStatistic',
    'active'
  );
  const [date, setDate] = useState('');
  return (
    <PrivateRoute>
      <Navbar
        pages={pages}
      />
      <AppWrapper>
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <title>Home</title>
          <link rel="canonical" href="http://analytics.cool.bio" />
        </Helmet>
        <HomeLeft>
          <Search />
          <Actions />
          <MapLevelWrapper>
            <MapSwitcher mapStatistic={mapStatistic} setMapStatistic={setMapStatistic} />
            <Level data={data} />
            <Minigraphs timeseries={timeseries?.dates} {...{ date }} />
          </MapLevelWrapper>
          <Table columns={columns} data={tableData} />
        </HomeLeft>
        <HomeRight>
          <StateHeader />
          <MapPanel mapStatistic={mapStatistic} />
          <Map mapStatistic={mapStatistic} />
          <Timeseries timeseries={graph} dates={dates} chartType="total" />
        </HomeRight>
      </AppWrapper>
    </PrivateRoute>
  )
}
