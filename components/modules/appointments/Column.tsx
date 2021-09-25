import { FC, ReactNode } from 'react';
import styles from './Column.module.scss';

interface Props {
  title: string;
  children: ReactNode;
}

const Column: FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        {title}
      </h3>
      {children}
    </div>
  );
}

export default Column;
