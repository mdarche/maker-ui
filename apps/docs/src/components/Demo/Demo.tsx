'use client'

import { cn } from 'maker-ui/utils'
import { useState } from 'react'

import { CodeIcon, ComponentIcon, PaneIcon } from '../Icons'
import styles from './demo.module.scss'

type View = 'split' | 'markdown' | 'component'

interface DemoProps {
  component: React.ReactNode
  markdown: React.ReactNode
  topic?: string | React.ReactElement
}

type ViewOption = {
  label: string
  value: View
  icon: React.ReactNode
}

const options: ViewOption[] = [
  {
    label: 'Split',
    value: 'split',
    icon: <PaneIcon />,
  },
  {
    label: 'Code',
    value: 'markdown',
    icon: <CodeIcon />,
  },
  {
    label: 'Component',
    value: 'component',
    icon: <ComponentIcon />,
  },
]

export const Demo = ({ component, markdown, topic }: DemoProps) => {
  const [view, setView] = useState<View>('split')

  return (
    <>
      <div className={styles.topic}>{topic}</div>
      <div className={styles.demo}>
        <div className={cn([styles.toolbar, 'flex align-center'])}>
          {options.map((item, i) => (
            <button
              key={i}
              className={cn([
                styles.toolbar_btn,
                'flex align-center',
                view === item.value ? styles.active : '',
              ])}
              onClick={() => setView(item.value)}>
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div
          className={cn([styles.grid])}
          style={{ gridTemplateColumns: view === 'split' ? '1fr 1fr' : '1fr' }}>
          <div
            className={cn([
              styles.markdown,
              view === 'component' ? styles.hide : undefined,
            ])}>
            {markdown}
          </div>
          <div
            className={cn([
              styles.component,
              view === 'markdown' ? styles.hide : undefined,
            ])}>
            <div className={styles.preview}>Preview</div>
            <div className={styles.component_inner}>
              <div className={styles.component_canvas}>{component}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
