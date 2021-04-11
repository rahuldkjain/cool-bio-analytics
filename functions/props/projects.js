export default {
  handler ({ params = {}, query = {} }) {
    return {
      data: {
        server: true,
        msg: `This is projects page ${params.resource || ''}`
      }
    }
  },
  options: {
    cache: {
      api: 90,
      html: 90
    }
  }
}
