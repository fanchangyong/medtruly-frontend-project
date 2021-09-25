import { FC, SelectHTMLAttributes, SyntheticEvent } from 'react';
import styles from './Select.module.scss';

export interface Option {
  label: string;
  value: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  hasAll?: boolean
  options: Option[]
  handleChange: (value: string) => any;
}

const Select: FC<Props> = ({ options, handleChange, hasAll = true, ...restProps }) => {
  const onChangeWrapper = (e: SyntheticEvent) => {
    const target = e.target as HTMLSelectElement;
    return handleChange(target.value);
  };

  return (
    <select
      className={styles.select}
      onChange={onChangeWrapper}
      {...restProps}
    >
      {hasAll && (
        <option value="All">
          All
        </option>
      )}
      {options.map((opt) => {
        return (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        );
      })}
    </select>
  );
}

export default Select;
