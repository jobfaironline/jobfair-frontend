import React from 'react'
import styles from './TextInput.module.scss'
const TextInput = ({ register, name, label, ...rest }) => {
  return (
    <div>
      <label for={label} className={styles.label}>
        {label}
      </label>{' '}
      <br></br>
      <input
        {...register(name)}
        {...rest}
        className={styles.InputText}
        autoComplete="off"
      />{' '}
    </div>
  )
}
export default TextInput
