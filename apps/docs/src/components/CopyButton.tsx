'use client'

import { useEffect, useState } from 'react'

export const CopyButton = () => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonElement = event.currentTarget
    const preElement = buttonElement
      .closest('.mkui-code-block')
      ?.querySelector('pre')

    if (preElement) {
      const textToCopy = preElement.textContent || ''
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => setIsCopied(true))
        .catch((err) => {
          console.error('Failed to copy code:', err)
          alert('Failed to copy code. Please try again.')
        })
    }
  }

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 1800)
    }
  }, [isCopied])

  return (
    <button onClick={handleCopyClick}>{isCopied ? 'Copied' : 'Copy'}</button>
  )
}

CopyButton.diiplayName = 'CopyButton'
