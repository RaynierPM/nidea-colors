export class InvalidHexColorsJsonError extends Error {
  constructor(json: string) {
    super(`Invalid hex colors:
      ${json}
    `)
  }
}