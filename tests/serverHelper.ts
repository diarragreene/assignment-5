import { beforeEach, afterEach } from 'vitest'
import { startServer } from '../server'
import http from 'http'

export type TestContext = {
  address: string
  server: http.Server
  close: () => Promise<void>
}

export function useServer(): TestContext {
  let server: http.Server
  let address: string

  beforeEach(async () => {
    server = await startServer(0) // 0 for random port
    const addr = server.address()
    if (addr && typeof addr !== 'string') {
      address = `http://localhost:${addr.port}`
    } else {
      throw new Error('Failed to get server address')
    }
  })

  afterEach(async () => {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()))
      })
    }
  })

  return {
    get address() {
      return address
    },
    get server() {
      return server
    },
    close: async () => {
      await new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()))
      })
    },
  }
}
