import Palette from '../palette';

export function getPaletteUrl(palette: Palette): string {
  const colors = palette.colors.map(color => color.hexColor);

  return `${location.origin}/${colors.join('/')}`;
}