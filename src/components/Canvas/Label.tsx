import { copyToClipboard } from 'components/utils/copyToClipboard';
import styles from './style.module.css';

type LabelProps = {
  text: string;
};

export default function Label({ text }: LabelProps) {
  function handleCopy() {
    copyToClipboard(text);
  }

  return (
    <div className={styles.labelContainer} onClick={handleCopy}>
      <span className={styles.label}>{text}</span>
    </div>
  );
}
