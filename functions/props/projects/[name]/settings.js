import { defineEdgeProps } from 'vitedge/define'

export default defineEdgeProps({
  handler ({ params = {}, query = {} }) {
    return {
      data: {
        server: true,
        msg: `This is Name details page ${params.resource || ''}`
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
