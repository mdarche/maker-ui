import { useState } from 'react'
import { Div, Flex, useColorTheme } from 'maker-ui'
import { Dropdown } from '@maker-ui/elements'
import Link from 'next/link'

import { GithubIcon, PaintIcon, CaretIcon } from './Icons'
import { DocSearch } from '@docsearch/react'

export const NavWidgets = () => {
  const { themes, setColorTheme } = useColorTheme()
  const [show, set] = useState(false)

  return (
    <>
      <Flex css={{ display: ['flex', 'none'], button: { marginRight: 15 } }}>
        <DocSearch
          appId="BH4D9OD16A"
          indexName="maker-ui"
          apiKey="375203709e8b66acf3df920a0129ecc4"
        />
      </Flex>
      <Flex
        align="center"
        justify="center"
        css={{
          display: ['none', 'flex'],
          svg: { fill: 'var(--color-header_fill)' },
          '.github-link': {
            marginLeft: 30,
          },
          '.popover': {
            right: 0,
            top: 58,
          },
          a: {
            fontWeight: 500,
            padding: '0 18px',
            position: 'relative',
          },
        }}>
        <Link href="/docs/getting-started/">Docs</Link>
        <Link href="/guides/">Guides</Link>
        <Link href="/builder/">Builder</Link>
        <a
          className="github-link"
          href="https://github.com/mdarche/maker-ui"
          target="_blank"
          rel="noopener noreferrer">
          <GithubIcon css={{ height: 22, marginTop: 2 }} />
        </a>
        {themes ? (
          <Dropdown
            _css={{ marginLeft: 20 }}
            controls={[show, set]}
            transition="none"
            buttonCss={{
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              outline: 'none',
              border: 'none',
              textTransform: 'capitalize',
              fontSize: 16,
              fontWeight: 500,
            }}
            button={
              <>
                <PaintIcon css={{ height: 20, marginRight: 10 }} />
                <CaretIcon css={{ height: 3, marginTop: 4 }} />
              </>
            }>
            <Div
              css={{
                background: 'var(--color-bg_header)',
                border: '1px solid',
                borderColor: 'var(--color-border_dark)',
                width: 150,
                padding: '5px 0',
                button: {
                  border: 'none',
                  outline: 'none',
                  background: 'none',
                  padding: '10px 20px',
                  width: '100%',
                  textAlign: 'left',
                  textTransform: 'capitalize',
                  fontWeight: 500,
                  fontSize: 15,
                },
                ul: {
                  padding: 0,
                  margin: 0,
                  listStyleType: 'none',
                },
              }}>
              <ul>
                {themes.map((t) => (
                  <li key={t}>
                    <button
                      onClick={() => {
                        setColorTheme(t)
                        set(false)
                      }}>
                      {t}
                    </button>
                  </li>
                ))}
              </ul>
            </Div>
          </Dropdown>
        ) : null}
      </Flex>
    </>
  )
}
