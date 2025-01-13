import { Slider, Typography } from 'antd';
import Factor from 'core/ColorMixer/utils/RandomFactor';
import styles from './style.module.css';

type Props = {
  value: Factor;
  onChange: (value: Factor) => void;
  label?: string;
};

export default function RangeFactor({ onChange, value, label }: Props) {
  return (
    <div>
      {label && (
        <Typography.Title level={5} style={{ margin: 0 }}>
          {label} ({value.min * 100}% - {value.max * 100}%)
        </Typography.Title>
      )}
      <div className={styles.rangeFactor}>
        <span>0%</span>
        <Slider
          min={0}
          max={100}
          step={1}
          style={{ width: '100%' }}
          onChange={value => {
            onChange(new Factor(value[0] / 100, value[1] / 100));
          }}
          value={[value.min * 100, value.max * 100]}
          range
        />
        <span>100%</span>
      </div>
    </div>
  );
}
