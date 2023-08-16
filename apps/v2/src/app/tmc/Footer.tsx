import { generateId } from 'maker-ui/utils'
import { Style } from 'maker-ui'
import { Logo } from './icons'
import Link from 'next/link'

export const Footer = () => {
  const styleId = generateId()

  return (
    <>
      <Style
        root={styleId}
        css={{
          display: 'grid',
          gridTemplateColumns: ['1fr', '400px 1fr 400px'],
          height: '100%',
          '.col-logo svg': {
            height: 25,
          },
          '.col-link a': {
            marginRight: 10,
          },
          '.col': {
            display: 'flex',
            alignItems: 'center',
            padding: '0 15px',
            fontSize: 14,
          },
        }}
      />
      <div className={styleId}>
        <div className="col col-link">
          <Link href="/">Terms of Service</Link>
          <Link href="/">Privacy Policy</Link>
        </div>
        <div className="col col-logo justify-center">
          <a href="https://oneofnone.io" target="_blank" rel="noreferrer">
            <Logo />
          </a>
        </div>
        <div className="col col-copyright justify-flex-end">
          <div>
            © 2023{' '}
            <a
              href="https://www.themarathonclothing.com/"
              target="_blank"
              rel="noreferrer">
              The Marathon Clothing
            </a>
            . All rights reserved.
          </div>
        </div>
      </div>
    </>
  )
}
