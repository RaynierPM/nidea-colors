import { InvalidHexColorError } from "./errors/Color"

const hexColorRegex = /^#([0-9a-f]{3,8})$/



export default class Color {
  constructor(hexColor: number) {
    this._colorValue = hexColor
  }

  private  _colorValue: number

  get color() {
    return this._colorValue
  }
  set color(hexColor: number) {
    this._colorValue = Math.abs(hexColor)
  }

  get hexColor(): string {
    const hexColor = this._colorValue.toString(16).padStart(6, "0")
    return hexColor
  }


  public static generateRandomColor(): Color {
    const randomColor = Math.round(Math.random() * parseInt('FFFFFF', 16))
    return new Color(randomColor)
  }

  public static fromHexColor(hexColor: string): Color {
    if (!hexColorRegex.test(hexColor.toLocaleLowerCase())) {
      throw new InvalidHexColorError(hexColor)
    }
    return new Color(parseInt(hexColor.slice(1), 16))
  } 
}