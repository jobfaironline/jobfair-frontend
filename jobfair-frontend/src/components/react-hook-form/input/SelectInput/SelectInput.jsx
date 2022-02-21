import React from 'react'
import styles from './SelectInput.module.scss'

const SelectInput = ({ register, options, label, name, ...rest }) => {
  return (
    <div>
      <label for={label} className={styles.label}>
        {label}
      </label>{' '}
      <br />
      <select {...register(name)} {...rest} className={styles.SelectInput}>
        {options.map(value => (
          <option value={value}>{value}</option>
        ))}
      </select>
    </div>
  )
}
export default SelectInput
