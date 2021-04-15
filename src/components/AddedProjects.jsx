import React, { lazy } from 'react'
import styled, { x } from '@xstyled/styled-components'
import { useSubscription } from '@apollo/client'
import { GET_PROJECTS } from '../graphql/subscription'
import { Link } from 'react-router-dom'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
dayjs.extend(timezone)
dayjs.extend(utc)

const Table = lazy(() => import('./Table'))

const ActionLink = styled(Link)`
    background-color: greenLight;
    color: green;
    border-radius: 5px;
    padding: 0.5rem;
    max-width: 20rem;
`

function dateFormat (date) {
  return dayjs(date).tz('Europe/Paris').format('MMMM D, YYYY h:mm A')
}

const columns = [
  {
    Header: 'Domain',
    accessor: 'domain'
  },
  {
    Header: 'Tracking Id',
    accessor: 'websiteId'
  },
  {
    Header: 'Created at',
    accessor: 'createdAt',
    Cell: ({ cell }) => {
      const date = dateFormat(cell?.row?.original?.createdAt, cell?.row?.original?.timezone)
      console.log(date)
      return date
    }
  },
  {
    Header: 'Reporting as',
    accessor: 'timezone'
  },
  {
    Header: 'Share Id',
    accessor: 'shareId'
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    Cell ({ cell }) {
      return (
                <x.div display="flex" justifyContent="center">
                    <ActionLink to={`/projects/${cell?.row?.original?.websiteId}`}>
                        View
                </ActionLink>
                </x.div>
      )
    }
  }
]

function AddedProjects (props) {
  const { loading, error, data } = useSubscription(GET_PROJECTS)

  console.log(loading, error, data)

  if (loading) {
    return (
            <x.div animation="pulse" pb={12}>
                <x.div flex="1" py={1}>
                    <x.div display="flex">
                        <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
                        <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
                        <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
                    </x.div>
                </x.div>
                <x.div flex="1" py={1}>
                    <x.div display="flex">
                        <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
                        <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
                        <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
                    </x.div>
                </x.div>
                <x.div flex="1" py={1}>
                    <x.div display="flex">
                        <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
                        <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
                        <x.div h={12} bg="grayHover" borderRadius flex={1} mr={4} />
                    </x.div>
                </x.div>
            </x.div>
    )
  }
  return (
        <>
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
                    {data?.website?.length || 0}
                </x.span>
            </x.div>
            <Table columns={columns} data={data?.website} />
        </>
  )
}

export default AddedProjects
