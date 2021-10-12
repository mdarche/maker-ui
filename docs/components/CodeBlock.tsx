import { useState } from 'react'
import { mergeSelectors } from 'maker-ui'
import Highlight, { defaultProps } from 'prism-react-renderer'
import Prism from 'prism-react-renderer/prism'
import theme from 'prism-react-renderer/themes/nightOwl'
import { CopyIcon } from './Icons'

//@ts-ignore
;(typeof global !== 'undefined' ? global : window).Prism = Prism

const RE = /{([\d,-]+)}/

/**
 * A helper function for highlighting lines in a codeblock
 */

const calculateLinesToHighlight = (meta) => {
  if (!RE.test(meta)) {
    return () => false
  }
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)))
  return (index) => {
    const lineNumber = index + 1
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    )
    return inRange
  }
}

/**
 * Custom code block component that includes a 'Copy' button, the code block language,
 * and syntax highlighting.
 */

export const CodeBlock = ({ codeString, language, metastring, ...props }) => {
  const [isCopied, setIsCopied] = useState(false)
  const shouldHighlightLine = calculateLinesToHighlight(metastring)
  const isShell = language === 'sh'

  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
      {...props}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div
          className={mergeSelectors([
            'highlight',
            isShell ? 'shell' : undefined,
          ])}
          data-language={language}>
          <div className="code-wrapper">
            <div className="code-header flex align-center justify-flex-end">
              <button
                className="copy-button flex align-center"
                onClick={() => {
                  copyToClipboard(codeString)
                  setIsCopied(true)
                  setTimeout(() => setIsCopied(false), 3000)
                }}>
                <CopyIcon />
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className={className} style={style}>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i })

                if (shouldHighlightLine(i)) {
                  lineProps.className = `${lineProps.className} highlight-line`
                }

                return (
                  <div key={i} {...lineProps}>
                    {!isShell ? (
                      <span className="line-number-style">{i + 1}</span>
                    ) : null}
                    {line.map((token, key) => (
                      <span key={i} {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                )
              })}
            </pre>
          </div>
        </div>
      )}
    </Highlight>
  )
}

/**
 * A DOM helper function that copies HTML into a formatted clipboard string
 * for easy pasting.
 */

const copyToClipboard = (str) => {
  if (typeof window !== 'undefined') {
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
}
