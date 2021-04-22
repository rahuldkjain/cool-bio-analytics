import PropTypes from 'prop-types'
import React from 'react'
import styled, { useColor } from '@xstyled/styled-components'
import { animated, useSpring } from 'react-spring'

import { useAtom } from 'jotai'

import { formatNumber, getStatistic, capitalize } from '../utils/commonFunctions'
import {
  SPRING_CONFIG_NUMBERS
} from '../config/constants'
import { selectedCountry } from '../atoms'

const Panel = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-height: 6rem;
    padding-top: 1rem;
    position: relative;
`

const LeftPanel = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    animation: fadeInUp;
    animation-delay: 0ms;
`

const PanelH2 = styled.h2`
    color: ${({ color }) => color};
    font-weight: 900;
    margin-top: 0;
    transition: color 0.3s ease-in-out;
`

const PanelH1 = styled.h1`
    color: ${({ color }) => color};
    margin-top: .9rem;
    line-height: 15px;

    span {
        font-size: .75rem;
        font-weight: 600;
    }
`

function getBackGround (statistic) {
  switch (statistic) {
    case 'users':
      return 'cherry'
    case 'active':
      return 'blue'
    case 'sessions':
      return 'green'
    case 'bounce':
      return 'gray'
    default:
      return ''
  }
}

function MapPanel ({ mapStatistic, data = {} }) {
  const currentStatistic = getBackGround(mapStatistic)
  const color = useColor(currentStatistic)
  const [selected] = useAtom(selectedCountry)
  console.log(data, mapStatistic)

  const spring = useSpring({
    total: selected.name ? 10 : 1000, // data[mapStatistic]?.aggregate?.count,
    config: { tension: 250, ...SPRING_CONFIG_NUMBERS }
  })

  return (
        <Panel>
            <LeftPanel>
                <PanelH2 color={color}>
                    {selected.name ? selected.name : 'Worldwide'}
                </PanelH2>
                <PanelH1 color={color}>
                    <animated.div>
                        {spring.total.interpolate((total) =>
                          formatNumber(
                            total,
                            'int',
                            'active'
                          )
                        )}
                    </animated.div>
                    <span>Active</span>
                </PanelH1>
            </LeftPanel>

            <div>
            </div>
        </Panel>
  )
}

MapPanel.propTypes = {
  data: PropTypes.object,
  mapStatistic: PropTypes.string
}

export default MapPanel
