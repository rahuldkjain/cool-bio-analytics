import { defineEdgeProps } from 'vitedge/define'

export default defineEdgeProps({
  handler ({ params = {}, query = {} }) {
    return {
      data: {
        heading1: 'cool.bio Analytics is an open-source project dedicated to making web analytics more privacy-friendly. Our mission is to reduce corporate surveillance by providing an alternative web analytics tool which doesn’t come from the AdTech world.',
        heading2: 'We are trusted by 100+ subscribers. We are completely independent, self-funded and bootstrapped.'
      }
    }
  },
  options: {
    cache: {
      api: 90,
      html: 90
    }
  }
})
