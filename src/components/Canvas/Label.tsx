import styles from './style.module.css';

type LabelProps = {
  text: string;
};

export default function Label({ text }: LabelProps) {
  return (
    <div className={styles.labelContainer}>
      <span className={styles.label}>{text}</span>
    </div>
  );
}
