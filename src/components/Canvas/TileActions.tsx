import { copyToClipboard } from 'components/utils/copyToClipboard';
import styles from './style.module.css';
import { Tooltip } from 'antd';

type LabelProps = {
  text: string;
  locked: boolean;
  lockUnlock: () => void;
};

export default function TileActions({ text, locked, lockUnlock }: LabelProps) {
  function handleCopy() {
    copyToClipboard(text);
  }

  const lockedUnlockedText = locked ? 'Unlock color' : 'Lock color';

  return (
    <div className={styles.labelContainer}>
      <Tooltip title="Copy to clipboard">
        <span className={styles.label} onClick={handleCopy}>
          {text}
        </span>
      </Tooltip>
      <div className={styles.actions}>
        <Tooltip title={lockedUnlockedText}>
          <span className={styles.action} onClick={lockUnlock}>
            <i className={locked ? 'bi bi-lock-fill' : 'bi bi-unlock-fill'} />
          </span>
        </Tooltip>
      </div>
    </div>
  );
}
