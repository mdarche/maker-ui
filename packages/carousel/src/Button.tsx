import * as React from 'react'
import styles from './Button.module.css'

export const Button = () => {
  return (
    <button className={styles.btn_root}>
      <span>Test</span>
      <div className={styles.btn_inner}>Test Button</div>
    </button>
  )
}
