import PropTypes from 'prop-types'
import React, { lazy } from 'react'
import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'

// import { GET_PROJECTS_DETAILS } from '../../graphql/subscription'

const Table = lazy(() => import('./Table'))

function CountryCount ({ projectId, query, columns }) {
  const dateFor = dayjs().subtract(0, 'day').format('YYYY-MM-DD')
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
  const { loading, error, data = {} } = useQuery(query, {
    variables: {
      projectId: projectId,
      at: {
        _eq: dateFor
      }
    }
  })
  console.log(loading, error, data, dateFor)

  const { table = [] } = data

  return (
    <Table columns={columns} data={table} />
  )
}

CountryCount.propTypes = {
  columns: PropTypes.any,
  projectId: PropTypes.string,
  query: PropTypes.string
}

export default CountryCount
