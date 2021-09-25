import { FC, ReactNode } from 'react';
import styles from './PopCard.module.scss';

interface Props {
  title: string;
  subTitle: string;
  description: string;
  children: ReactNode;
}

const PopCard: FC<Props> = ({ children, title, subTitle, description }) => {
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.card}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.subTitle}>
          {subTitle}
        </div>
        <div>
          {description}
        </div>
      </div>
    </div>
  );
};

export default PopCard;
