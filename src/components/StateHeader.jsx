import React, { memo, useMemo } from 'react';
import { animated, useSpring } from 'react-spring';
import styled from '@xstyled/styled-components';

import { SPRING_CONFIG_NUMBERS } from '../config/constants';
import { formatDate, formatNumber, getStatistic } from '../utils/commonFunctions';

const Header = styled.h1`
    background-color: brickLight;
    border-radius: 5px;
    padding: 0.25rem;
    max-width: 20rem;
    color: brick;
    animation: fadeInUp;
    animation-delay: 0ms;
`;

const HeaderRight = styled.div`
    color: purpleMid;
    display: flex;
    flex-direction: column;
    text-align: right;
    animation: fadeInUp;
    animation-delay: 500ms;
`;

const StateHeaderWrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  height: 5.25rem;
  justify-content: space-between;
  margin-bottom: 1rem;
  position: relative;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  display: flex;
`;

const HeaderRightWrapper = styled.h5`
  font-weight: 600;
`;

const HeaderRightH2 = styled(animated.h2)`
  color: purple;
  font-weight: 900;
`;

const SubHeader = styled.h5`
  animation: fadeInUp;
  animation-delay: 250ms;
  color: gray;
  margin-top: .5rem;
  font-weight: 600;
`;

function StateHeader({ data, stateCode }) {
  const spring = useSpring({
    total: getStatistic(data, 'total', 'tested'),
    config: SPRING_CONFIG_NUMBERS,
  });

  return (
    <StateHeaderWrapper>
      <div>
        <HeaderWrapper>
          <Header>Cool Bio</Header>
        </HeaderWrapper>
        <SubHeader>
          {`Last Updated on ${formatDate(
            10992002000,
            'dd MMM, p'
          )} IST`}
        </SubHeader>
      </div>

      <HeaderRight>
        <HeaderRightWrapper>Viewed</HeaderRightWrapper>
        <HeaderRightH2>
          {spring.total.interpolate((total) => formatNumber(Math.floor(total)))}
        </HeaderRightH2>
        <HeaderRightWrapper className="timestamp">
          {`As of ${formatDate(10992002000, 'dd MMMM')}`}
        </HeaderRightWrapper>
      </HeaderRight>
    </StateHeaderWrapper>
  );
}

export default memo(StateHeader);
