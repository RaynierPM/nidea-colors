import { copyToClipboard } from 'components/utils/copyToClipboard';
import styles from './style.module.css';
import { Tooltip } from 'antd';
import { Actions } from './type';

type LabelProps = {
  copyableText: string;
  actions?: Actions[];
};

export default function TileActions({ copyableText, actions }: LabelProps) {
  function handleCopy() {
    copyToClipboard(copyableText);
  }

  return (
    <div className={styles.labelContainer}>
      <Tooltip title="Copy to clipboard">
        <span className={styles.label} onClick={handleCopy}>
          {copyableText}
        </span>
      </Tooltip>
      {Boolean(actions) && (
        <div className={styles.actions}>
          {actions?.map(action => (
            <Tooltip title={action.tooltip}>
              <span className={styles.action} onClick={action.action}>
                <i className={action.icon} />
              </span>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
}
