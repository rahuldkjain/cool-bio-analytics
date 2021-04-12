import React, { memo } from 'react'

function SvgComponent ({ width = 512, height = 512, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
      {...rest}
    >
      <g xmlns="http://www.w3.org/2000/svg">
        <path
          d="M366.413 353.874V165.262C366.413 104.38 316.882 54.85 256 54.85c-60.881 0-110.412 49.53-110.412 110.412v188.613h-47.35V165.262C98.238 78.272 169.009 7.5 256 7.5s157.762 70.772 157.762 157.762v188.613h-47.349z"
          fill="#eaf2ff"
          data-original="#eaf2ff"
        />
        <path
          d="M256 7.5c-9.378 0-18.566.827-27.499 2.403 51.26 9.047 94.053 42.931 115.481 88.731 14.068 18.531 22.43 41.62 22.43 66.628v188.613h47.35V165.262C413.762 78.272 342.991 7.5 256 7.5z"
          fill="#c9e0fd"
          data-original="#c9e0fd"
        />
        <path
          d="M415.101 504.5H96.899c-17.803 0-32.235-14.432-32.235-32.235V280.399c0-17.803 14.432-32.235 32.235-32.235H415.1c17.803 0 32.235 14.432 32.235 32.235v191.866c.001 17.803-14.431 32.235-32.234 32.235z"
          fill="#dc3545"
          data-original="#ffd064"
        />
        <path
          d="M415.101 248.164h-55.027c17.803 0 32.235 14.432 32.235 32.235v191.866c0 17.803-14.432 32.235-32.235 32.235h55.027c17.803 0 32.235-14.432 32.235-32.235V280.399c0-17.803-14.432-32.235-32.235-32.235z"
          fill="#842029"
          data-original="#ffc250"
        />
        <circle
          cx={256}
          cy={376.332}
          fill="#fff"
          r={93.526}
          data-original="#ffffff"
        />
        <path
          d="M256 282.806a93.498 93.498 0 00-27.499 4.112c38.232 11.744 66.027 47.332 66.027 89.414s-27.795 77.67-66.027 89.414A93.498 93.498 0 00256 469.858c51.653 0 93.526-41.873 93.526-93.526S307.653 282.806 256 282.806z"
          fill="#eaf2ff"
          data-original="#eaf2ff"
        />
        <path
          d="M283.741 355.582c0-15.917-13.404-28.702-29.54-27.685-13.894.876-25.148 12.242-25.901 26.143-.515 9.509 3.767 18.038 10.639 23.407l-7.465 39.136c-.816 4.277 2.463 8.24 6.817 8.24h35.419c4.354 0 7.632-3.963 6.817-8.24l-7.465-39.136c6.497-5.076 10.679-12.98 10.679-21.865z"
          fill="#60a0f7"
          data-original="#60a0f7"
        />
        <g>
          <path
            d="M447.336 436.971a7.5 7.5 0 007.5-7.5V280.399c0-19.815-14.579-36.285-33.574-39.255v-75.883C421.262 74.136 347.126 0 256 0S90.738 74.136 90.738 165.262v47.835a7.5 7.5 0 007.5 7.5 7.5 7.5 0 007.5-7.5v-47.835C105.738 82.407 173.145 15 256 15s150.263 67.407 150.263 150.262v75.403h-32.35v-75.403c0-65.017-52.895-117.911-117.913-117.911-65.017 0-117.911 52.894-117.911 117.911v75.403H96.9c-21.91 0-39.736 17.824-39.736 39.735v191.865C57.164 494.175 74.99 512 96.9 512h318.2c21.91 0 39.736-17.825 39.736-39.736v-7.732c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v7.732c0 13.64-11.096 24.736-24.736 24.736H96.9c-13.64 0-24.736-11.096-24.736-24.736V280.399c0-13.639 11.096-24.735 24.736-24.735h318.2c13.64 0 24.736 11.096 24.736 24.735v149.072a7.5 7.5 0 007.5 7.5zm-88.423-196.306H153.088v-75.403c0-56.746 46.166-102.912 102.912-102.912 56.747 0 102.914 46.166 102.914 102.912v75.403z"
            data-original="#000000"
          />
          <path
            d="M154.974 376.332c0 55.706 45.319 101.026 101.025 101.026s101.026-45.32 101.026-101.026S311.705 275.306 256 275.306s-101.026 45.32-101.026 101.026zm187.052 0c0 47.435-38.591 86.027-86.027 86.027-47.435 0-86.026-38.591-86.026-86.027s38.591-86.027 86.026-86.027c47.436 0 86.027 38.591 86.027 86.027z"
            data-original="#000000"
          />
          <path
            d="M253.729 320.412c-17.801 1.122-31.953 15.405-32.918 33.223a35.336 35.336 0 009.97 26.55l-6.675 34.993c-1.7 8.906 5.133 17.146 14.183 17.146h35.419c9.066 0 15.88-8.255 14.183-17.145l-6.673-34.985c6.418-6.549 10.021-15.291 10.021-24.612.002-19.783-16.61-36.487-37.51-35.17zm22.513 35.17c0 6.268-2.843 12.084-7.798 15.956a7.501 7.501 0 00-2.75 7.315l7.338 38.471h-34.064l7.338-38.471a7.5 7.5 0 00-2.749-7.315 20.308 20.308 0 01-7.767-17.092c.545-10.056 8.839-18.431 18.884-19.064 11.771-.746 21.568 8.542 21.568 20.2z"
            data-original="#000000"
          />
        </g>
      </g>
    </svg>
  )
}

const Privacy = memo(SvgComponent)
export default Privacy