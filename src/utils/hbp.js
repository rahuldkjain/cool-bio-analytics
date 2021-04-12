import { createClient } from 'nhost-js-sdk'

const config = {
  baseURL: 'https://backend.cool.bio'
}

const { auth, storage } = createClient(config)

export { auth, storage }
