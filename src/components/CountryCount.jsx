import PropTypes from "prop-types";
import React, { lazy } from 'react'
import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'

// import { GET_PROJECTS_DETAILS } from '../../graphql/subscription'
import { GET_SESSIONS_COUNT_WITH_COUNTRY } from '../graphql/queries'

const Table = lazy(() => import('./Table'))

const columns = [
  {
    Header: 'country',
    accessor: 'country'
  },
  {
    Header: 'Count',
    accessor: 'count'
  }
]

const tableData = [
  {
    users: 'rabbit',
    lastName: 'kitten',
    id: 1,
    visits: 57,
    progress: 13,
    active: 'single',
    subRows: undefined
  },
  {
    users: 'rabbit',
    lastName: 'kitten',
    id: 1,
    visits: 57,
    progress: 13,
    active: 'single',
    subRows: undefined
  },
  {
    users: 'rabbit',
    lastName: 'kitten',
    id: 1,
    visits: 57,
    progress: 13,
    active: 'single',
    subRows: undefined
  },
  {
    users: 'rabbit',
    lastName: 'kitten',
    id: 1,
    visits: 57,
    progress: 13,
    active: 'single',
    subRows: undefined
  },
  {
    users: 'rabbit',
    lastName: 'kitten',
    id: 1,
    visits: 57,
    progress: 13,
    active: 'single',
    subRows: undefined
  }
]

function CountryCount ({ projectId }) {
  const dateFor = dayjs().subtract(7, 'day').format('YYYY-MM-DD')
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
  const { loading, error, data = {} } = useQuery(GET_SESSIONS_COUNT_WITH_COUNTRY, {
    variables: {
      projectId: projectId,
      at: {
        _eq: dateFor
      }
    }
  })
  console.log(loading, error, data, dateFor)

  const { countries = [] } = data

  return (
    <Table columns={columns} data={countries} />
  )
}

CountryCount.propTypes = {
  projectId: PropTypes.string
}

export default CountryCount
