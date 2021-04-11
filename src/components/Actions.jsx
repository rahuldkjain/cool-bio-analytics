import React from 'react'
import styled from '@xstyled/styled-components'
import { parse, format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

const getTimeFromMilliseconds = (lastViewedLog) => {
  return format(
    utcToZonedTime(parse(lastViewedLog, 'T', new Date())),
    'dd MMM, p'
  )
}

const H5Wrapper = styled.h5`
    animation: fadeInUp;
    animation-delay: 750ms;
    color: gray;
`

const ActionsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 1rem;

    > * {
        align-self: center;
    }
`

export default function Actions () {
  const lastViewedLog = new Date().getMilliseconds()
  return (
        <ActionsWrapper>
            <H5Wrapper>
                {`${getTimeFromMilliseconds(
                    lastViewedLog
                )} IST`}
            </H5Wrapper>
        </ActionsWrapper>
  )
}
