import { createClient } from 'nhost-js-sdk'

const config = {
  baseURL: import.meta.env.VITE_BACKEND_BASE_API
}

const { auth, storage } = createClient(config)

export { auth, storage }
