import { createRequire } from 'node:module'

export function readJson(path) {
  const require = createRequire(import.meta.url)
  const json = require(path)
  return json
}

export function toKebadCase(str) {
  // Paso 1: Reemplaza espacios y caracteres especiales por guiones.

  const withoutSpecialChars = str
    .replace(/[^\w\s-]/g, '') // Elimina caracteres especiales excepto guiones y espacios
    .trim() // Elimina espacios al principio y al final
    .replace(/\s+/g, '-') // Reemplaza múltiples espacios con un solo guión
  // Paso 2: Convierte a minúsculas y coloca guiones entre palabras.
  const kebabCaseString = withoutSpecialChars
    .toLowerCase()
    .replace(/\s+/g, '-') // Convierte espacios en guiones adicionales
    .replace(/-+/g, '-') // Reemplaza múltiples guiones con un solo guión

  return kebabCaseString
}
