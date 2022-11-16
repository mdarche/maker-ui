import * as React from 'react'
import styles from './Button.module.css'

export const Button = () => {
  return (
    <button className={styles.button_root}>
      <span>Test</span>
      <div className={styles.button_inner}>Test Button</div>
    </button>
  )
}
