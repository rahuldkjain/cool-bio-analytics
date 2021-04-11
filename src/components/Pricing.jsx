import React, { useState } from 'react';
import styled, { x } from '@xstyled/styled-components';
import { Link } from 'react-router-dom';

import { pricesData } from '../config/constants';

const Button = styled(Link)`
  appearance: none;
  background-color: dropdown;
  background-position-x: calc(100% - 0.4rem);
  background-position-y: 50%;
  background-repeat: no-repeat;
  background-size: 0.6rem;
  border: 2px solid;
  border-color: dropdownBorder;
  border-radius: 4px;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  padding: 1rem;
  padding-right: 1.4rem;
  width: 120px;
  text-align: center;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: dorpdownHover;
  }
`;

export default function Pricing({ products }) {
    const [billingInterval, setBillingInterval] = useState('month');

    const onBillingIntervalChange = (val) => () => {
        setBillingInterval(val)
    }

    return (
        <>
            <x.h2
                color="silver"
                py={4}
                fontSize={{ md: "4xl", xs: "xl" }}
                fontWeight="700"
            >Pricing Plans</x.h2>
            <x.p color="gray" pb={{ md: 24, xs: 16 }}>Start tracking for free, then add a site plan to track more. Account plans unlock additional features.</x.p>
            <x.div
                mb={{ md: 16, xs: 12 }}
                p={2}
                borderRadius=".5rem"
                border="1px solid"
                borderColor="dropdownBorder"
                backgroundColor="grayLight"
            >
                <x.button
                    fontSize="sm"
                    px={8}
                    py={4}
                    borderRadius=".375rem"
                    backgroundColor={billingInterval === 'month' ? "greenLight" : "transparent"}
                    color="green"
                    onClick={onBillingIntervalChange('month')}
                >
                    Monthly billing
                </x.button>
                <x.button
                    fontSize="sm"
                    px={8}
                    py={4}
                    borderRadius=".375rem"
                    backgroundColor={billingInterval === 'year' ? "greenLight" : "transparent"}
                    color="green"
                    onClick={onBillingIntervalChange('year')}
                >
                    Yearly billing
                </x.button>
            </x.div>
            <x.div
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="center"
            >
                {
                    pricesData.map(({ color, month, year, title, label, views }) => (
                        <x.div
                            p={8}
                            borderRadius="35px"
                            backgroundColor={`${color}Light`}
                            display="flex"
                            alignItems="center"
                            flexDirection="column"
                            m={5}
                            flex="1"
                            maxWidth={{ md: "25%", xs: "80%" }}
                        >
                            <x.h3
                                fontWeight="700"
                                color={color}
                                fontSize={{ md: "2xl", xs: "xl" }}
                                mb={5}
                            >
                                {title}
                            </x.h3>
                            <x.p
                                color="gray"
                                fontSize="sm"
                            >
                                {label} Upto {views} views.
                            </x.p>
                            <x.span
                                color={color}
                                fontSize={{ md: "4xl", xs: "2xl" }}
                                pt={4}
                                pb={8}
                            >
                                ${billingInterval === 'month' ? month : year}
                                <x.span
                                    fontSize={{ md: "16px", xs: "sm" }}
                                    color="gray"
                                    pl={2}
                                >/{billingInterval}</x.span>
                            </x.span>
                            <Button to="/login">Start</Button>
                        </x.div>
                    ))
                }
            </x.div>
        </>
    )
}