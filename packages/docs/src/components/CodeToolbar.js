import React, { useRef } from 'react'
import { Flex, Button } from 'maker-ui'

import { useCode, prismOptions } from './CodeContext'

const copyCode = async blob => {
  try {
    return await navigator.clipboard.writeText(blob)
  } catch (error) {
    console.error(error)
  }
}

export const CodeToolbar = () => {
  const toolbarRef = useRef(null)
  const [theme, setTheme] = useCode()

  const onChangeTheme = i => setTheme(i)

  const onCopyCode = e => {
    const codeBlock = toolbarRef.current.nextSibling.innerText
    copyCode(codeBlock)
  }

  return (
    <Flex ref={toolbarRef}>
      <Button onClick={onCopyCode}>Copy</Button>
      {prismOptions.map((item, index) => (
        <Button
          key={index}
          onClick={e => onChangeTheme(item.label)}
          title={`Use ${item.label} code theme`}
          sx={{ bg: item.label === theme.label ? 'gainsboro' : 'blue' }}>
          {item.label}
        </Button>
      ))}
    </Flex>
  )
}
