export class InvalidHexColorError extends Error {
  constructor(hexColor: string) {
    super(`Invalid hex color: ${hexColor}`)

    this.hexColor = hexColor
  }

  hexColor: string;
}