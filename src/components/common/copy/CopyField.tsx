import { Button } from 'antd';
import styles from './style.module.css';
import { copyToClipboard } from '../../utils/copyToClipboard';

type CopyFieldProps = {
  text: string;
};

export default function CopyField({ text }: CopyFieldProps) {
  function handleCopy() {
    copyToClipboard(text);
  }

  return (
    <div className={styles.clipboard}>
      {text}
      <Button onClick={handleCopy} className={styles.copyButton}>
        <i className="bi-clipboard" />
      </Button>
    </div>
  );
}
