import * as React from 'react'

import { useOptions, OptionContext } from '../../context/OptionContext'
import { DefaultError } from './Errors'

interface ErrorState {
  error: string
  errorInfo: string
  hasError: boolean
}

export interface ErrorProps {
  errorMessage?: React.ReactNode
  errorKey?: string
  showDetails?: boolean
  logFunction?: (error?: string, logInfo?: any, component?: string) => any
  children: React.ReactNode
}

interface ErrorContainerProps extends Omit<ErrorProps, 'errorKey'> {
  errorKey:
    | 'topbar'
    | 'header'
    | 'mobileMenu'
    | 'sidebar'
    | 'sideNav'
    | 'content'
    | 'footer'
}

export const ErrorContainer = ({ children, ...props }: ErrorContainerProps) => {
  const options = useOptions()
  const keyExists = Object.keys(options).includes(props.errorKey)

  return keyExists && options[props.errorKey].errorBoundary ? (
    <ErrorBoundary>{children}</ErrorBoundary>
  ) : (
    <>{children}</>
  )
}

/**
 * Use the `ErrorBoundary` to wrap your component with a fallback UI for
 * errors in production. You can use a custom logFunction or supply one to MakerOptions.
 *
 * @link https://maker-ui.com/docs/error-boundary
 */
export class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
  static contextType = OptionContext

  state = {
    error: '',
    errorInfo: '',
    hasError: false,
  }

  static getDerivedStateFromError(error: any) {
    return { error, hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    const logger =
      this.props.logFunction || this.context.errors.logFunction || false

    if (logger) {
      logger(error, errorInfo, this.props.errorKey)
    }

    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorMessage ||
        this.context.errors.errorMessage[`${this.props.errorKey}`] ? (
        this.context.errors.errorMessage[`${this.props.errorKey}`]
      ) : (
        <DefaultError
          showStackTrace={this.context.errors.errorMessage.showStackTrace}
          errorInfo={this.state.errorInfo}
        />
      )
    }

    return this.props.children
  }
}
