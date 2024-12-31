import Color from './Color';
import { InvalidHexColorError } from './errors/Color';
import { InvalidHexColorsJsonError } from './errors/Palette';

export default class Palette {
  private _colors: Color[];

  set colors(colors: Color[]) {
    this._colors = colors;
  }
  get colors() {
    return this._colors;
  }

  constructor(colors?: Color[]) {
    if (colors) {
      this._colors = colors;
      return;
    }
    this._colors = [];
  }

  public addColor(...colors: Color[]) {
    this._colors.push(...colors);
  }

  public removeColor(color: Color) {
    this._colors = this._colors.filter(c => c.hexColor !== color.hexColor);
  }

  public toString() {
    return JSON.stringify({
      colors: this._colors.map(color => color.hexColor),
    });
  }

  static fromJson(json: string): Palette {
    const { colors }: { colors: string[] } = JSON.parse(json);
    const pallete = new Palette();
    try {
      pallete.colors = colors.map(hexColor => Color.fromHexColor(hexColor));
    } catch (err) {
      if (err instanceof InvalidHexColorError) {
        throw new InvalidHexColorsJsonError(json);
      }
    }
    return pallete;
  }

  public clone(): Palette {
    return Palette.fromJson(this.toString());
  }
}
