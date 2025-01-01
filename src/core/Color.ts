import { InvalidHexColorError } from './errors/Color';

const hexColorRegex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
const hexColorSplitter = /([0-9a-f]{2})/gi;

const colorsIndex = ['red', 'green', 'blue', 'alpha'];

type ColorsOptions = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
};

export default class Color {
  constructor(colorValues: number | ColorsOptions) {
    if (typeof colorValues === 'number') {
      this.fromHexNumberToColor(colorValues);
    } else {
      this._red = colorValues.red;
      this._green = colorValues.green;
      this.blue = colorValues.blue;
      this.alpha = colorValues.alpha;
    }
  }

  private _red: number = 0;
  private _green: number = 0;
  private _blue: number = 0;
  private _alpha: number = 255;

  get red(): number {
    return this._red;
  }

  set red(value: number) {
    this._red = this.get_validatedColorValue(value);
  }

  get green(): number {
    return this._green;
  }

  set green(value: number) {
    this._green = this.get_validatedColorValue(value);
  }

  get blue(): number {
    return this._blue;
  }

  set blue(value: number) {
    this.blue = this.get_validatedColorValue(value);
  }

  get alpha(): number {
    return this._alpha;
  }

  set alpha(value: number) {
    this.alpha = this.get_validatedColorValue(value);
  }

  private get_validatedColorValue(value: number): number {
    value = Math.abs(Math.round(value));
    if (value > 255) {
      return 255;
    } else {
      return value;
    }
  }

  get hexColor(): string {
    let hexColor: string = '';

    const values = [this._red, this._green, this._blue];

    if (this._alpha !== 255) {
      values.push(this._alpha);
    }

    for (const value of values) {
      if (value < 0 || value > 255) {
        throw new InvalidHexColorError(value.toString());
      }
      hexColor += value.toString(16).padEnd(2, '0');
    }
    return hexColor;
  }

  private fromHexNumberToColor(number: number) {
    const hexColor = number.toString(16).padEnd(6, '0');
    if (!Color.isValidHexColor(hexColor)) {
      throw new InvalidHexColorError(hexColor);
    }

    const splittedHexColor: string[] | null = hexColor.match(hexColorSplitter);

    if (!splittedHexColor) {
      throw new InvalidHexColorError(hexColor);
    }

    for (let i = 0; i < colorsIndex.length; i++) {
      const color: string = splittedHexColor[i];
      if (color) {
        switch (i) {
          case 0:
            this._red = parseInt(color, 16);
            break;
          case 1:
            this._green = parseInt(color, 16);
            break;
          case 2:
            this._blue = parseInt(color, 16);
            break;
          case 3:
            this._alpha = parseInt(color, 16);
            break;
        }
      }
    }
  }

  public static fromHexColor(hexColor: string): Color {
    if (!this.isValidHexColor(hexColor)) {
      throw new InvalidHexColorError(hexColor);
    }
    return new Color(parseInt(hexColor, 16));
  }

  public static isValidHexColor(hexColor: string): boolean {
    return hexColorRegex.test(hexColor.toLocaleLowerCase());
  }

  public static generateRandomColor(): Color {
    const randomColor = Math.round(Math.random() * parseInt('FFFFFF', 16));
    return new Color(randomColor);
  }
}
