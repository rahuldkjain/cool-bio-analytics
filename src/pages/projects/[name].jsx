import React, { useState, lazy, useEffect } from 'react'
import styled from '@xstyled/styled-components'
import { useSessionStorage } from 'react-use'
import {
  useParams
} from 'react-router-dom'
import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'

import Search from '../../components/Search'
import Actions from '../../components/Actions'
import MapSwitcher from '../../components/MapSwitcher'
import Level from '../../components/Level'
import Minigraphs from '../../components/Minigraphs'
import MapPanel from '../../components/MapPanel'
import StateHeader from '../../components/StateHeader'
import Navbar from '../../components/Navbar'
import PrivateRoute from '../../components/PrivateRoute'
import CountryCount from '../../components/CountryCount'

import {
  GET_PROJECTS_DETAILS,
  GET_SESSIONS_COUNT_WITH_COUNTRY,
  GET_SESSIONS_COUNT_WITH_CLIENT_NAME,
  GET_SESSIONS_COUNT_WITH_PAGES,
  GET_SESSIONS_COUNT_WITH_REFERRER
} from '../../graphql/queries'

import timeData from '../../config/timeSeries.json'
import { getStatisticData } from '../../utils/commonFunctions'

import { selectedCountry } from '../../atoms'

const Map = lazy(() => import('../../components/Map'))
const Timeseries = lazy(() => import('../../components/Timeseries'))

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

const countryColumns = [
  {
    Header: 'Country',
    accessor: 'countryName.name'
  },
  {
    Header: 'Count',
    accessor: 'count'
  }
]

const browserColumns = [
  {
    Header: 'Browser',
    accessor: 'client_name'
  },
  {
    Header: 'Count',
    accessor: 'count'
  }
]

const pagesColumns = [
  {
    Header: 'Pages',
    accessor: 'pathname'
  },
  {
    Header: 'Count',
    accessor: 'count'
  }
]

const referrerColumns = [
  {
    Header: 'Referrer',
    accessor: 'referrer'
  },
  {
    Header: 'Count',
    accessor: 'count'
  }
]

function calculateBouce (session = 0, user = 0) {
  const bounce = ((session - user) / session) * 100
  return isNaN(bounce) ? 0 : bounce
}

function getStatistic (data, statistic) {
  console.log(data?.users?.aggregate?.sum?.count)
  switch (statistic) {
    case 'users' :
      return {
        count: data?.users?.aggregate?.sum?.count || 0,
        delta: data?.users?.aggregate?.sum?.delta || 0
      }

    case 'active' :
      return {
        count: data?.project?.active?.aggregate?.count || 0,
        delta: data?.project?.active?.aggregate?.sum?.delta || 0
      }

    case 'sessions' :
      return {
        count: data?.sessions?.aggregate?.sum?.count || 0,
        delta: data?.sessions?.aggregate?.sum?.delta || 0
      }

    case 'bounce' :
      return {
        count: calculateBouce(data?.sessions?.aggregate?.sum?.count, data?.users?.aggregate?.sum?.count),
        delta: calculateBouce(data?.sessions?.aggregate?.sum?.delta, data?.users?.aggregate?.sum?.delta)
      }

    default:
      return ''
  }
}
const updatedAt = dayjs().subtract(2, 'minutes')

function ListPage () {
  const { name } = useParams()
  const [mapStatistic, setMapStatistic] = useSessionStorage(
    'mapStatistic',
    'active'
  )
  const [, setSelectedCountry] = useAtom(selectedCountry)
  const dateFor = dayjs().subtract(0, 'days').format('YYYY-MM-DD')
  /* const { loading, error, data = {} } = useSubscription(GET_PROJECTS_DETAILS, {
    variables: {
      projectId: name,
      where: {
        created_at: {
          _gte: dateFor
        }
      }
    }
  }) */
  const { loading, error, data = {} } = useQuery(GET_PROJECTS_DETAILS, {
    variables: {
      projectId: name,
      at: {
        _gte: dateFor
      },
      updatedAt: {
        _gte: updatedAt
      }
    }
  })
  console.log(loading, error, data)
  const [timeseriesData, setTimeSeriesData] = useState(timeData)
  const [date, setDate] = useState('')
  const { project, sessions, users } = data

  const currentStatics = getStatistic(data, mapStatistic)?.count

  console.log('mapStatisticmapStatistic', mapStatistic)

/*   useEffect(() => {
    setSelectedCountry({
      id: '',
      name: '',
      count: currentStatics || 0
    })
  }, [currentStatics]) */

  return (
    <PrivateRoute>
      <Navbar />
      <AppWrapper>
        <HomeLeft>
          <Search />
          <Actions />
          <MapLevelWrapper>
            <MapSwitcher mapStatistic={mapStatistic} setMapStatistic={setMapStatistic} />
            <Level data={{ ...project, sessions, users }} />
            <Minigraphs timeseries={timeseriesData?.dates} projectId={name} {...{ date }} />
          </MapLevelWrapper>
          <CountryCount projectId={name} query={GET_SESSIONS_COUNT_WITH_COUNTRY} columns={countryColumns} />
          <CountryCount projectId={name} query={GET_SESSIONS_COUNT_WITH_CLIENT_NAME} columns={browserColumns} />
          <CountryCount projectId={name} query={GET_SESSIONS_COUNT_WITH_PAGES} columns={pagesColumns} />
          <CountryCount projectId={name} query={GET_SESSIONS_COUNT_WITH_REFERRER} columns={referrerColumns} />
        </HomeLeft>
        <HomeRight>
          <StateHeader data={project} />
          <MapPanel mapStatistic={mapStatistic} data={project} />
          <Map mapStatistic={mapStatistic} projectId={name} />
          <Timeseries chartType="total" projectId={name} data={{ ...project, sessions, users }} />
        </HomeRight>
      </AppWrapper>
    </PrivateRoute>
  )
}

export default ListPage
