import util from 'node:util'
import child_process from 'node:child_process'

const exec = util.promisify(child_process.exec)

async function generateOpenApi(): Promise<void> {
  try {
    console.log('Generating OpenAPI...')
    await exec('./generate-openapi.sh')
  } catch (error) {
    console.error('Failed to generate OpenAPI:', error)
  }
}

type OpenApiStatus = {
  promise: Promise<void>
  ready: boolean
}

const openApiStatus: OpenApiStatus = {
  ready: false,
  promise: generateOpenApi(),
}

export default {
  name: 'OpenApi Generation Plugin',

  // Wait for initial generation before the build starts
  async buildStart() {
    await openApiStatus.promise
    openApiStatus.ready = true
  },

  // Wait while generation is in progress before loading files
  async load() {
    while (!openApiStatus.ready && openApiStatus.promise) {
      await openApiStatus.promise
    }
  },

  // On watched file change, regenerate and update status
  async watchChange() {
    openApiStatus.ready = false
    const promise = generateOpenApi()
    openApiStatus.promise = promise
    await promise
    if (openApiStatus.promise === promise) {
      openApiStatus.ready = true
    }
  },
}
