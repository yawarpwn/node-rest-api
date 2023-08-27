import { createRequire } from 'node:module'

export function readJson(path) {
  const require = createRequire(import.meta.url)
  const json = require(path)
  return json
}

