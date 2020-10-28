import React, { useRef, useState } from 'react'
import { Flex, Div, Button, SVG, Span } from 'maker-ui'

import { useCode, prismOptions } from './CodeContext'

export const CodeToolbar = () => {
  const toolbarRef = useRef(null)
  const [copyState, setCopyState] = useState('Copy')
  const [theme, setTheme] = useCode()

  const onChangeTheme = i => setTheme(i)

  const onCopyClick = async e => {
    const blob = toolbarRef.current.nextSibling.innerText
    try {
      await navigator.clipboard.writeText(blob)
      setCopyState('Copied!')
    } catch (error) {
      console.error(error)
    }
  }

  const onCopyBlur = e => {
    if (copyState !== 'Copy') {
      setTimeout(() => setCopyState('Copy'), 600)
    }
  }

  return (
    <Flex
      ref={toolbarRef}
      sx={{
        position: 'relative',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        button: { fontSize: 1, py: 2, px: [2, 3] },
      }}>
      <Button
        onClick={onCopyClick}
        onBlur={onCopyBlur}
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '5px',
          border: 'none',
          bg: 'primary',
        }}>
        <SVG
          viewBox="0 0 24 24"
          sx={{ height: '14px', mr: [0, 2], fill: '#fff' }}>
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z" />
        </SVG>
        <Span as="span" sx={{ display: ['none', 'block'] }}>
          {copyState}
        </Span>
      </Button>
      <Div>
        {prismOptions.map((item, index) => (
          <Button
            key={index}
            onClick={e => onChangeTheme(item.label)}
            title={`Use ${item.label} code theme`}
            sx={{ bg: item.label === theme.label ? '#ededed' : '#dedede' }}>
            {item.label}
          </Button>
        ))}
      </Div>
    </Flex>
  )
}
