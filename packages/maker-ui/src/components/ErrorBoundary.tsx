import * as React from 'react'
import { Div, Span, SVG } from './Primitives'
import { OptionContext } from '../context/OptionContext'

const ErrorIcon = props => (
  <SVG viewBox="0 0 512 512" {...props}>
    <path d="M256 0C114.497 0 0 114.507 0 256c0 141.503 114.507 256 256 256 141.503 0 256-114.507 256-256C512 114.497 397.493 0 256 0zm0 472c-119.393 0-216-96.615-216-216 0-119.393 96.615-216 216-216 119.393 0 216 96.615 216 216 0 119.393-96.615 216-216 216z" />
    <path d="M256 128.877c-11.046 0-20 8.954-20 20V277.67c0 11.046 8.954 20 20 20s20-8.954 20-20V148.877c0-11.046-8.954-20-20-20z" />
    <circle cx="256" cy="349.16" r="27" />
  </SVG>
)

interface DefaultErrorProps {
  showDetails?: boolean
  errorInfo?: any
}

const DefaultError = ({ showDetails, errorInfo }: DefaultErrorProps) => {
  return (
    <Div variant="errorMessage">
      <ErrorIcon sx={{ height: 30 }} />
      <Div>
        There was an error loading this part of the page.
        <Span
          sx={{ ml: '5px', cursor: 'pointer', color: 'primary' }}
          onClick={e => window.location.reload()}>
          Reload this page.
        </Span>
      </Div>
      {showDetails ? (
        <Div
          sx={{
            details: { pl: '20px', whiteSpace: 'pre' },
            summary: { cursor: 'pointer' },
          }}>
          <details className="error-details">
            <summary>Click for error details</summary>
            {errorInfo ? errorInfo.componentStack.toString() : null}
          </details>
        </Div>
      ) : null}
    </Div>
  )
}

interface ErrorState {
  error: string
  errorInfo: string
  hasError: boolean
}

interface ErrorProps {
  message?: React.ReactNode
  component?: string
  errorKey?: string
  showDetails?: boolean
  logFunction?: (error: string, logInfo: any) => any
}

export class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  static contextType = OptionContext

  state = {
    error: '',
    errorInfo: '',
    hasError: false,
  }

  static getDerivedStateFromError(error) {
    return { error, hasError: true }
  }

  // componentDidMount() {
  //   const options = this.context

  //   console.log('Options from error boundary are', options)
  // }

  componentDidCatch(error, errorInfo) {
    // const logger = this.props.logFunction || this.context.errors.logFunction
    // if (logger !== undefined) {
    //   logger(error, errorInfo, this.props.component)
    // }

    this.setState({ errorInfo })
    console.log('Error is', error)
    console.log('Error Info is', errorInfo.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <DefaultError showDetails={true} errorInfo={this.state.errorInfo} />
      )
    }

    return this.props.children
  }
}
