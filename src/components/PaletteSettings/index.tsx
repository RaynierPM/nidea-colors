import { useState } from 'react';
import styles from './style.module.css';
import DrawerComponent from 'components/common/drawer/Drawer';
import { Button, Collapse, Select, Tooltip, Typography } from 'antd';
import { PaletteType } from 'core/types';

type PaletteSettingsProps = {
  visible: boolean;
  selectedScheme: PaletteType;
  changleScheme: (scheme: PaletteType) => void;
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
];

export default function PaletteSettings({
  visible,
  selectedScheme,
  changleScheme,
  generateNewPalette,
}: PaletteSettingsProps) {
  const [visibleSettings, setVisibleSettings] = useState(false);

  function handleClose() {
    setVisibleSettings(false);
  }

  function handleOpen() {
    setVisibleSettings(true);
  }

  return (
    <>
      {visible && (
        <div className={styles.settingsButton} onClick={handleOpen}>
          <i className="bi bi-gear-fill" />
        </div>
      )}
      <DrawerComponent
        open={visibleSettings}
        onClose={handleClose}
        title="Palette Settings"
      >
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel header="Basic Settings" key="1">
            <Typography.Title level={4}>
              Color schemes{' '}
              <Tooltip title="All palettes are random but you can improve how mix colors 🎨 (Enjoy it 😉)">
                <i className="bi bi-question-circle-fill" />
              </Tooltip>
            </Typography.Title>
            <Select
              options={availableSchemes}
              value={selectedScheme}
              onChange={changleScheme}
              style={{ width: '100%' }}
            />

            <Typography.Paragraph
              italic
              style={{
                marginTop: 20,
                border: '1px solid #ccc',
                padding: '5px',
                borderRadius: 5,
              }}
            >
              Note: If lock another color and had been selected a color scheme,
              the colors will be reseted to the default palette Settings
              (Random).
              <br />
              <i>We are working to improve it...</i>
            </Typography.Paragraph>
          </Collapse.Panel>
          <Collapse.Panel header="Advanced Settings" key="2">
            <div className={styles.comingSoon}>
              <Typography.Title level={5} style={{ margin: 0 }}>
                Coming soon...
              </Typography.Title>
            </div>
          </Collapse.Panel>
        </Collapse>
        <Button
          onClick={() => {
            generateNewPalette();
            handleClose();
          }}
          style={{ width: '100%', marginTop: 10 }}
        >
          Generate new palette <i className="bi bi-arrow-repeat" />
        </Button>
      </DrawerComponent>
    </>
  );
}
