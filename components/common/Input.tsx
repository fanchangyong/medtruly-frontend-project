import { FC, InputHTMLAttributes, SyntheticEvent } from 'react';
import styles from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (value: string) => any;
}

const Input: FC<Props> = ({ handleChange, ...restProps }) => {
  const onChangeWrapper = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    return handleChange(target.value);
  }

  return (
    <input
      className={styles.input}
      onChange={onChangeWrapper}
      {...restProps}
    />
  );
}

export default Input;
