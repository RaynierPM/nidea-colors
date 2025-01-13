import { useState } from 'react';
import styles from './style.module.css';
import DrawerComponent from 'components/common/drawer/Drawer';
import { Button, Col, Collapse, Row, Select, Tooltip, Typography } from 'antd';
import { generatePaletteOptions, PaletteType } from 'core/types';
import Palette from 'core/palette';
import Color from 'core/Color';
import Factor from 'core/ColorMixer/utils/RandomFactor';
import RangeFactor from 'components/common/Range/RangeFactor';

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
        <Collapse defaultActiveKey={['scheme']}>
          <Collapse.Panel header="Basic Settings" key="scheme">
            <Typography.Title level={4}>
              Color schemes{' '}
              <Tooltip title="All palettes are random but you can improve how mix colors 🎨 (Enjoy it 😉)">
                <i className="bi bi-question-circle-fill" />
              </Tooltip>
            </Typography.Title>
            <Select
              options={availableSchemes}
              value={options.paletteType}
              onChange={changeScheme}
              style={{ width: '100%' }}
            />
            {options.paletteType !== PaletteType.RANDOM && (
              <div className={styles.baseColor}>
                <Typography.Paragraph
                  style={{ marginBottom: 0, fontWeight: 'bold' }}
                >
                  Base color
                </Typography.Paragraph>
                <div className={styles.baseColorContainer}>
                  <Select
                    options={getAvailableColors(palette)}
                    value={options.baseColor?.hexColor}
                    onChange={handleBaseColorChange}
                    style={{ width: '100%', marginTop: 10 }}
                    placeholder="Select base color"
                  />
                  {!options.baseColor && (
                    <Tooltip title="Base color not selected">
                      <i
                        className="bi bi-info-circle-fill"
                        style={{
                          color: '#' + Color.generateRandomColor().hexColor,
                          fontSize: 20,
                        }}
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
            )}
          </Collapse.Panel>
          <Collapse.Panel header="Advanced Settings" key="advancedSettings">
            <div className={styles.box}>
              {options.luminosity ? (
                <RangeFactor
                  label="luminosity"
                  value={options.luminosity}
                  onChange={handleLuminosityChange}
                />
              ) : (
                <div className={styles.buttonsConfiguration}>
                  <Button className={styles.widthFull} onClick={addLuminosity}>
                    Luminosity <i className="bi bi-plus-circle" />
                  </Button>
                  <Tooltip
                    title="Luminosity is percent value thats represent the color's 
                  brightness. 0 represents black color and 100% its white"
                  >
                    <i className="bi bi-info-circle" />
                  </Tooltip>
                </div>
              )}
            </div>

            <div className={styles.box}>
              {options.saturation ? (
                <RangeFactor
                  label="Saturation"
                  value={options.saturation}
                  onChange={handleSaturationChange}
                />
              ) : (
                <div className={styles.buttonsConfiguration}>
                  <Button className={styles.widthFull} onClick={addSaturation}>
                    Saturation <i className="bi bi-plus-circle" />
                  </Button>
                  <Tooltip
                    title="Saturation is percent value thats represent the color's 
                  intensity.0 represents gray color and 100% the most intense color representation"
                  >
                    <i className="bi bi-info-circle" />
                  </Tooltip>
                </div>
              )}
            </div>
          </Collapse.Panel>
        </Collapse>
        <Typography.Paragraph
          italic
          style={{
            marginTop: 20,
            border: '1px solid #ccc',
            padding: '5px',
            borderRadius: 5,
          }}
        >
          <b>Note: </b>This cromatic circle is based on RGB color model, so the
          colors generated will be different from the ones you can see on
          traditional color pickers.
        </Typography.Paragraph>
        <Row justify="space-between">
          <Col span={12}>
            <Button
              onClick={() => {
                generateNewPalette();
                handleClose();
              }}
              style={{ width: '100%', marginTop: 10, padding: 3 }}
            >
              Generate new palette <i className="bi bi-arrow-repeat" />
            </Button>
          </Col>
          <Col span={12}>
            <Button
              variant="outlined"
              color="danger"
              onClick={() => {
                const newOptions = backDefaultOptions(options);
                updateOptions(newOptions);
              }}
              style={{ width: '100%', marginTop: 10, padding: 3 }}
            >
              Reset configuration <i className="bi bi-arrow-repeat" />
            </Button>
          </Col>
        </Row>
      </DrawerComponent>
    </>
  );
}
