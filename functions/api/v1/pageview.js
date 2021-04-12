import DeviceDetector from 'device-detector-js'

const deviceDetector = new DeviceDetector()

const query = `
  mutation postSession($objects: [session_insert_input!]!) {
    insert_session(objects: $objects) {
      affected_rows
    }
  }
`

export default ({
  async handler ({ request }) {
    if (request.method !== 'POST') {
      // return new Response("Blocked Method", { status: 403 });
      throw new Error('Method not supported!')
    }
    const userAgent = request.headers.get('User-Agent') || ''
    if (userAgent.includes('bot')) {
      // return new Response("Block User Agent containing bot", { status: 403 });
      throw new Error('Block User Agent containing bot.')
    }

    const { websiteId } = await request.json()

    if (!websiteId) {
      // return new Response("Website Id is required", { status: 403 });
      throw new Error('Website Id is required.')
    }

    const device = deviceDetector.parse(userAgent)

    const headers = Object.fromEntries(request.headers)
    const origin = request.headers.get('Origin')
    const {
      latitude,
      longitude,
      timezone,
      region,
      country,
      continent,
      city,
      regionCode,
      postalCode
    } = request.cf

    const data = {
      ip: headers['x-real-ip'] || headers['cf-connecting-ip'],
      website_id: websiteId,
      client_name: device?.client?.name,
      client_type: device?.client?.type,
      client_version: device?.client?.version,
      client_engine: device?.client?.engine,
      os_name: device?.os?.name,
      os_version: device?.os?.version,
      device_type: device?.device?.type,
      device_brand: device?.device?.brand,
      device_model: device?.device?.model,
      language: headers['accept-language'],
      origin,
      latitude,
      longitude,
      timezone,
      region,
      country,
      continent,
      city,
      region_code: regionCode,
      postal_code: postalCode
    }

    const postCall = await fetch(process.env.VITEDGE_GRAPHQL_API, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret':
          process.env.VITEDGE_WORKER_HASURA_GRAPHQL_ADMIN_SECRET
      },
      body: JSON.stringify({
        query,
        variables: {
          objects: data
        }
      })
    })

    return {
      data: postCall.body,
      options: {
        status: postCall.status
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
