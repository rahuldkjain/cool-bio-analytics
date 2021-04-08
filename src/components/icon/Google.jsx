import * as React from "react"

function Google(props) {
  return (
    <svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#prefix__clip0)">
        <path
          d="M8.865 24.173L7.472 29.37l-5.088.108A19.91 19.91 0 010 20c0-3.316.807-6.444 2.236-9.198h.001l4.531.83 1.985 4.504A11.888 11.888 0 008.11 20c0 1.468.266 2.875.754 4.173z"
          fill="#FBBB00"
        />
        <path
          d="M39.65 16.264c.23 1.21.35 2.46.35 3.736 0 1.432-.15 2.829-.437 4.176a19.995 19.995 0 01-7.042 11.421l-.001-.001-5.707-.291-.807-5.042a11.92 11.92 0 005.128-6.087H20.44v-7.912h19.21z"
          fill="#518EF8"
        />
        <path
          d="M32.52 35.595v.002A19.916 19.916 0 0120 40c-7.617 0-14.238-4.257-17.616-10.522l6.48-5.306C10.555 28.68 14.903 31.89 20 31.89c2.191 0 4.244-.592 6.006-1.627l6.514 5.333z"
          fill="#28B446"
        />
        <path
          d="M32.766 4.604l-6.48 5.305A11.822 11.822 0 0020 8.11c-5.213 0-9.643 3.356-11.247 8.025l-6.516-5.334C5.564 4.385 12.27 0 20 0c4.853 0 9.302 1.729 12.766 4.604z"
          fill="#F14336"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill="#fff" d="M0 0h40v40H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Google
