import { FC } from 'react';
import styles from './TextAvatar.module.scss';

interface Props {
  text: string;
}

const TextAvatar: FC<Props> = ({ text }) => {
  return (
    <div className={styles.wrapper}>
      {text}
    </div>
  );
}

export default TextAvatar;
