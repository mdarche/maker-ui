import * as React from 'react'
import { Div, Flex, Button } from 'maker-ui'
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

const calculateLinesToHighlight = meta => {
  if (!RE.test(meta)) {
    return () => false
  }
  const lineNumbers = RE.exec(meta)[1]
    .split(`,`)
    .map(v => v.split(`-`).map(x => parseInt(x, 10)))
  return index => {
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
  const [isCopied, setIsCopied] = React.useState(false)
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
        <Div
          className="highlight"
          data-language={language}
          css={{
            position: 'relative',
            fontSize: [12, 15],
            pre: {
              padding: isShell
                ? ['55px 30px 25px', '65px 30px 30px']
                : ['55px 10px 25px', '65px 0 30px'],
              borderRadius: 5,
              lineHeight: [1.5, 1.5],
              overflowX: 'scroll',
            },
            '.code-wrapper': {
              margin: '40px auto',
              maxWidth: 'calc(100vw - 40px)',
              position: 'relative',
            },
            '.token': {
              display: 'inline-block',
            },
            '.line-number-style': {
              position: 'relative',
              display: 'inline-block',
              width: [25, 50],
              userSelect: 'none',
              opacity: 0.3,
              textAlign: ['left', 'center'],
            },
            '.highlight-line': {
              backgroundColor: 'rgb(2, 55, 81)',
              borderLeft: '4px solid rgb(2, 155, 206)',
            },
            '.highlight-line .line-number-style': {
              opacity: 0.5,
              left: -4,
            },
          }}>
          <Div className="code-wrapper">
            <Flex
              align="center"
              justify="flex-end"
              css={{
                padding: '8px 10px',
                position: 'absolute',
                width: '100%',
                top: 0,
                fontSize: [13, 15],
                color: '#fff',
                borderBottom: '1px solid',
                borderColor: 'rgba(255,255,255,0.2)',
              }}>
              <Button
                onClick={() => {
                  copyToClipboard(codeString)
                  setIsCopied(true)
                  setTimeout(() => setIsCopied(false), 3000)
                }}
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  fontSize: [14, 15],
                  fontWeight: 400,
                  svg: {
                    height: [17, 19],
                    fill: 'rgb(255, 255, 255, 0.4)',
                    marginRight: 10,
                    transition: 'all ease .3s',
                  },
                  color: 'rgb(255, 255, 255, 0.35)',
                  transition: 'all ease .3s',
                  '&:hover': {
                    color: '#fff',
                    svg: { fill: '#fff' },
                  },
                }}>
                <CopyIcon />
                {isCopied ? 'Copied!' : 'Copy'}
              </Button>
            </Flex>
            <pre className={className} style={style}>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i })

                if (shouldHighlightLine(i)) {
                  lineProps.className = `${lineProps.className} highlight-line`
                }

                return (
                  <div {...lineProps}>
                    {!isShell ? (
                      <span className="line-number-style">{i + 1}</span>
                    ) : null}
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                )
              })}
            </pre>
          </Div>
        </Div>
      )}
    </Highlight>
  )
}

/**
 * A DOM helper function that copies HTML into a formatted clipboard string
 * for easy pasting.
 */

const copyToClipboard = str => {
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
