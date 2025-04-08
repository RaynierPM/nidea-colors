import { Palette } from 'nidea-colors';
import { useState } from 'react';
import { toast } from 'sonner';

type PaletteStored = {
  [id: string]: Palette;
};

type PaletteLocalStorage = {
  [id: string]: string;
};

const PALETTES_LOCALSTORAGE_KEY = 'palettes';

export default function usePaletteLocalStorage() {
  const [storedPalettes, setPalettes] = useState<PaletteStored>(getPalettes);

  function savePalette(palette: Palette) {
    const newPalettes = { ...storedPalettes, [palette.id]: palette };
    localStorage.setItem(
      PALETTES_LOCALSTORAGE_KEY,
      JSON.stringify(parPalettesToJson(newPalettes)),
    );
    setPalettes(newPalettes);
  }

  function removePalette(palette: Palette) {
    const newPalettes = { ...storedPalettes };
    delete newPalettes[palette.id];
    localStorage.setItem(
      PALETTES_LOCALSTORAGE_KEY,
      JSON.stringify(parPalettesToJson(newPalettes)),
    );
    setPalettes(newPalettes);
  }

  function clearStoredPalettes() {
    localStorage.removeItem(PALETTES_LOCALSTORAGE_KEY);
    setPalettes({});
  }

  function importPalettes(palettes: PaletteLocalStorage) {
    const newPalettes = { ...storedPalettes, ...jsonToPalettes(palettes) };
    localStorage.setItem(
      PALETTES_LOCALSTORAGE_KEY,
      JSON.stringify(parPalettesToJson(newPalettes)),
    );
    setPalettes(newPalettes);
  }

  function exportPalettes() {
    const palettes = parPalettesToJson(storedPalettes);
    const data = new Blob([JSON.stringify(palettes)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'palettes.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  return {
    storedPalettes,
    savePalette,
    removePalette,
    clearStoredPalettes,
    importPalettes,
    exportPalettes,
  };
}

function getPalettes() {
  const palettes = localStorage.getItem('palettes');
  if (palettes) {
    try {
      const palettesJson: { [id: string]: string } = JSON.parse(palettes);

      const palettesObj: PaletteStored = {};

      for (const id in palettesJson) {
        palettesObj[id] = Palette.fromJson(palettesJson[id]);
      }

      return palettesObj;
    } catch {
      localStorage.removeItem('palettes');
      toast.error('Error loading stored palettes');
      return {};
    }
  }
  return {};
}

function parPalettesToJson(palettes: PaletteStored): PaletteLocalStorage {
  const palettesStorage: PaletteLocalStorage = {};
  for (const id in palettes) {
    palettesStorage[id] = palettes[id].toString();
  }
  return palettesStorage;
}

function jsonToPalettes(palettes: PaletteLocalStorage): PaletteStored {
  const palettesObj: PaletteStored = {};
  for (const id in palettes) {
    palettesObj[id] = Palette.fromJson(palettes[id]);
  }
  return palettesObj;
}
