import * as React from 'react'
import { Div } from '@maker-ui/primitives'

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M256 0C114.497 0 0 114.507 0 256c0 141.503 114.507 256 256 256 141.503 0 256-114.507 256-256C512 114.497 397.493 0 256 0zm0 472c-119.393 0-216-96.615-216-216 0-119.393 96.615-216 216-216 119.393 0 216 96.615 216 216 0 119.393-96.615 216-216 216z" />
    <path d="M256 128.877c-11.046 0-20 8.954-20 20V277.67c0 11.046 8.954 20 20 20s20-8.954 20-20V148.877c0-11.046-8.954-20-20-20z" />
    <circle cx="256" cy="349.16" r="27" />
  </svg>
)

interface DefaultErrorProps {
  showStackTrace?: boolean
  errorInfo?: any
}

export const DefaultError = ({
  showStackTrace,
  errorInfo,
}: DefaultErrorProps) => {
  return (
    <Div
      className="error-boundary"
      css={{
        button: {
          marginLeft: 5,
          cursor: 'pointer',
          color: 'var(--color-primary)',
        },
        svg: { height: 30 },
        details: { paddingLeft: '20px', whiteSpace: 'pre' },
        summary: { cursor: 'pointer' },
      }}>
      <ErrorIcon />
      <div>
        There was an issue loading this section of the app.
        <button onClick={() => window?.location.reload()}>
          Try reloading the page.
        </button>
      </div>
      {showStackTrace ? (
        <div>
          <details className="error-details">
            <summary>Click for error details</summary>
            {errorInfo ? errorInfo.componentStack.toString() : null}
          </details>
        </div>
      ) : null}
    </Div>
  )
}

const acceptable = ['Main', 'SideNav', 'Sidebar', 'PageTransition']

export const ContentError = () => {
  return (
    <Div
      css={{
        margin: '150px auto',
        maxWidth: 600,
        fontSize: 20,
        lineHeight: 1.5,
        'li, span': {
          padding: '0 8px',
          fontFamily: 'monospace',
          backgroundColor: 'var(--color-muted)',
          fontSize: 18,
          borderRadius: 3,
          border: '1px solid gainsboro',
        },
        '.error-title': {
          padding: 20,
          marginBottom: 30,
          background: 'var(--color-muted)',
          strong: { marginRight: 20 },
        },
        ul: {
          columns: 2,
          margin: '50px 0 35px',
          li: { marginBottom: 10, width: 'min-content' },
        },
        svg: {
          height: 35,
          marginRight: 10,
        },
      }}>
      <div className="error-title inline-flex align-center justify-center width-100">
        <ErrorIcon />
        <strong>Error</strong> Invalid layout configuration.
      </div>
      <div>
        <p>
          The <span>Content</span> component only accepts the following direct
          children:
        </p>
        <ul>
          {acceptable.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>
          If your custom child component has fixed positioning or is a Provider,
          you can still use it here by assigning the component a{' '}
          <strong>displayName</strong> of 'Fixed', 'Provider', or 'Context'.
        </p>
        <p>
          <a
            href="https://maker-ui.com/docs/content"
            target="_blank"
            rel="noreferrer">
            See the docs
          </a>{' '}
          for a complete list of layout configurations.
        </p>
      </div>
    </Div>
  )
}
