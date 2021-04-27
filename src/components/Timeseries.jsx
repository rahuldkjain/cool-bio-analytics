import PropTypes from 'prop-types'
import React, { memo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import styled, { x, useTheme } from '@xstyled/styled-components'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'

import CustomTooltip from './CustomTooltip'

import {
  STATISTIC_DEFINITIONS
} from '../config/constants'

import { currentDataWithCounts } from '../atoms'

function getBackGround (statistic) {
  switch (statistic) {
    case 'users':
      return 'cherryLight'

    case 'active':
      return 'blueLight'

    case 'sessions':
      return 'greenLight'

    case 'bounce':
      return 'grayLight'

    default:
      return ''
  }
}

const TimeseriesWrapper = styled.div`
    align-self: center;
    width: 100%;
`

function tickFormatter (data) {
  const date = dayjs(data)
  return date.isValid() ? dayjs(data).format('HH:mm') : dayjs().format('HH:mm')
}

function Timeseries ({
  data: defaultData
}) {
  const theme = useTheme()
  const [data = {}] = useAtom(currentDataWithCounts)

  return (
    <TimeseriesWrapper>
      {
        Object.keys(STATISTIC_DEFINITIONS).map(statistic => {
          const item = STATISTIC_DEFINITIONS[statistic]
          const strokeColor = theme.colors[item.color]
          return (
            <x.div w="100%" h="12rem" bg={getBackGround(statistic)} key={item.options.statistic} mb={4} position="relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data[statistic]}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: 0,
                    left: 10,
                    bottom: 0
                  }}
                >
                  <XAxis
                    dataKey="hour"
                    tickLine={{
                      stroke: strokeColor,
                      fill: strokeColor
                    }}
                    axisLine={{
                      stroke: strokeColor,
                      fill: strokeColor
                    }}
                    tick={{ fontSize: 12, fill: strokeColor }}
                    tickFormatter={tickFormatter}
                  />
                  <YAxis
                    orientation="right"
                    tickLine={{
                      stroke: strokeColor,
                      fill: strokeColor
                    }}
                    axisLine={{
                      stroke: strokeColor,
                      fill: strokeColor
                    }}
                    tick={{ fontSize: 12, fill: strokeColor }}
                  />
                  <Tooltip
                    active
                    wrapperStyle={{
                      visibility: 'visible'
                    }}
                    position={{ x: 10, y: 10 }}
                    content={<CustomTooltip item={item} statistic={statistic} defaultData={defaultData} />}
                    cursor={false}
                  />
                  <Line type="monotone" dataKey="count" strokeWidth={4} stroke={strokeColor} fill={strokeColor} />
                </LineChart>
              </ResponsiveContainer>
            </x.div>
          )
        }
        )
      }
    </TimeseriesWrapper>
  )
}

Timeseries.propTypes = {
  data: PropTypes.any
}

export default memo(Timeseries)
