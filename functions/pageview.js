import DeviceDetector from 'device-detector-js'
import BotDetector from 'device-detector-js/dist/parsers/bot'

const deviceDetector = new DeviceDetector()
const botDetector = new BotDetector()

export default ({
  handler({ request }) {
    const userAgent = request.headers.get('User-Agent') || ''
    const bot = botDetector.parse(userAgent);
    if (bot || userAgent.includes('bot')) {
      return new Response('Block User Agent containing bot', { status: 403 })
    }

    const device = deviceDetector.parse(userAgent)

    const headers = Object.fromEntries(request.headers)
    var orig = request.headers.get("Origin");
    console.log('--->', orig)

    const data = {
      userId: headers['x-real-ip'] || headers['cf-connecting-ip'],
      websiteId: headers['cf-ipcountry'],
      requestId: headers['cf-request-id'],
      createdAt: new Date(),
      hostname: headers.host,
      clientName: device?.client?.name,
      clientType: device?.client?.type,
      clientVersion: device?.client?.version,
      osName: device?.os?.name,
      osVersion: device?.os?.version,
      deviceType: device?.device?.version,
      deviceBrand: device?.device?.brand,
      language: headers['accept-language'],
      country: headers['cf-ipcountry'],
      origin: orig,
      headers: headers
    }

    console.log(data);

    return {
      data,
    }
  },
  options: {
    cache: {
      api: 90,
      html: 90,
    },
  },
})
