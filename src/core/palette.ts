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

  public addColor(color: Color) {
    this._colors.push(color);
  }

  public static generateRandomPallete(colors: number): Palette {
    const pallete = new Palette();

    const generatedColors: Color[] = new Array(Math.round(colors || 1))
      .fill(0)
      .map(() => Color.generateRandomColor());

    pallete.colors = generatedColors;
    return pallete;
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
}
