import { useState } from 'react';
import styles from './style.module.css';
import DrawerComponent from 'components/common/drawer/Drawer';
import { Button, Select, Tooltip, Typography } from 'antd';
import RangeFactor from 'components/common/Range/RangeFactor';
import { Color, generatePaletteOptions, Palette, PaletteType } from 'nidea-colors';
import { Factor } from 'nidea-colors/ColorMixer';

type PaletteSettingsProps = {
  options: generatePaletteOptions;
  palette: Palette;
  updateOptions: (options: generatePaletteOptions) => void;
  generateNewPalette: () => void;
};

type AvailablePalette = {
  label: string;
  value: PaletteType;
};

const availableSchemes: AvailablePalette[] = [
  {
    label: 'RANDOM',
    value: PaletteType.RANDOM,
  },
  {
    label: 'MONOCHROMATIC',
    value: PaletteType.MONOCHROMATIC,
  },
  {
    label: 'ANALOGOUS',
    value: PaletteType.ANALOGOUS,
  },
  {
    label: 'COMPLEMENTARY',
    value: PaletteType.COMPLEMENTARY,
  },
  {
    label: 'TRIADIC',
    value: PaletteType.TRIADIC,
  },
  {
    label: 'COMPOUND',
    value: PaletteType.COMPOUND,
  },
];

function getAvailableColors(palette: Palette) {
  return palette.colors.map(color => ({
    label: (
      <div className={styles.littleTileContainer}>
        <span
          className={styles.littleTile}
          style={{ backgroundColor: `#${color.hexColor}` }}
        />
      </div>
    ),
    value: color.hexColor,
  }));
}

function backDefaultOptions(
  options: generatePaletteOptions,
): generatePaletteOptions {
  return {
    ...options,
    paletteType: PaletteType.RANDOM,
    baseColor: undefined,
    luminosity: undefined,
    saturation: undefined,
  };
}

export default function PaletteSettings({
  options,
  updateOptions,
  generateNewPalette,
  palette,
}: PaletteSettingsProps) {
  const [visibleSettings, setVisibleSettings] = useState(false);

  function handleClose() {
    setVisibleSettings(false);
  }

  function handleOpen() {
    setVisibleSettings(true);
  }

  function changeScheme(value: PaletteType) {
    if (value === PaletteType.RANDOM) {
      updateOptions({
        ...options,
        paletteType: value,
        baseColor: undefined,
      });
      return;
    }
    updateOptions({
      ...options,
      paletteType: value,
    });
  }

  function handleBaseColorChange(value: string) {
    updateOptions({
      ...options,
      baseColor: Color.fromHexColor(value),
    });
  }

  function handleLuminosityChange(value: Factor) {
    updateOptions({
      ...options,
      luminosity: value,
    });
  }

  function handleSaturationChange(value: Factor) {
    updateOptions({
      ...options,
      saturation: value,
    });
  }

  function addLuminosity() {
    updateOptions({
      ...options,
      luminosity: new Factor(0.3, 0.7),
    });
  }

  function addSaturation() {
    updateOptions({
      ...options,
      saturation: new Factor(0.4, 0.6),
    });
  }

  return (
    <>
      <div className={styles.settingsButton} onClick={handleOpen}>
        <i className="bi bi-gear-fill" />
      </div>
      <DrawerComponent
        open={visibleSettings}
        onClose={handleClose}
        title="Palette Settings"
      >
        <div className={styles.drawerContent}>
          <section className={styles.section}>
            <Typography.Title level={5} className={styles.sectionTitle}>
              Color scheme
              <Tooltip title="Choose how colors relate to each other. Random picks freely; other schemes create harmony from a base color.">
                <i className="bi bi-question-circle-fill" />
              </Tooltip>
            </Typography.Title>
            <Select
              options={availableSchemes}
              value={options.paletteType}
              onChange={changeScheme}
              style={{ width: '100%' }}
              size="large"
            />
            {options.paletteType !== PaletteType.RANDOM && (
              <div className={styles.baseColorSection}>
                <Typography.Paragraph className={styles.baseColorLabel}>
                  Base color
                </Typography.Paragraph>
                <div className={styles.baseColorRow}>
                  <Select
                    options={getAvailableColors(palette)}
                    value={options.baseColor?.hexColor}
                    onChange={handleBaseColorChange}
                    style={{ flex: 1 }}
                    placeholder="Select a color"
                    size="large"
                  />
                  {!options.baseColor && (
                    <Tooltip title="Pick a base color from your palette">
                      <i className="bi bi-info-circle-fill" />
                    </Tooltip>
                  )}
                </div>
              </div>
            )}
          </section>

          <section className={styles.section}>
            <Typography.Title level={5} className={styles.sectionTitle}>
              Fine-tune
            </Typography.Title>
            <div className={styles.card}>
              {options.luminosity ? (
                <RangeFactor
                  label="Luminosity"
                  value={options.luminosity}
                  onChange={handleLuminosityChange}
                />
              ) : (
                <button className={styles.addButton} onClick={addLuminosity}>
                  <span>Luminosity</span>
                  <Tooltip title="Controls brightness — 0 is black, 100% is white.">
                    <i className="bi bi-info-circle" />
                  </Tooltip>
                  <i className="bi bi-plus-circle" />
                </button>
              )}
            </div>
            <div className={styles.card}>
              {options.saturation ? (
                <RangeFactor
                  label="Saturation"
                  value={options.saturation}
                  onChange={handleSaturationChange}
                />
              ) : (
                <button className={styles.addButton} onClick={addSaturation}>
                  <span>Saturation</span>
                  <Tooltip title="Controls color intensity — 0 is gray, 100% is vivid.">
                    <i className="bi bi-info-circle" />
                  </Tooltip>
                  <i className="bi bi-plus-circle" />
                </button>
              )}
            </div>
          </section>

          <p className={styles.note}>
            Based on the RGB color model. Generated colors will differ from
            traditional color pickers.
          </p>

          <div className={styles.drawerActions}>
            <Button
              onClick={() => {
                generateNewPalette();
                handleClose();
              }}
              size="large"
              className={styles.primaryButton}
            >
              Generate <i className="bi bi-arrow-repeat" />
            </Button>
            <Button
              variant="outlined"
              color="danger"
              onClick={() => {
                const newOptions = backDefaultOptions(options);
                updateOptions(newOptions);
              }}
              size="large"
              className={styles.resetButton}
            >
              Reset <i className="bi bi-arrow-repeat" />
            </Button>
          </div>
        </div>
      </DrawerComponent>
    </>
  );
}
