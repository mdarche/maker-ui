import { Div, DivProps } from 'maker-ui'

interface CalloutProps extends DivProps {
  type: 'alert' | 'info' | 'suggestion'
}

export const Callout = ({ children, type = 'suggestion' }: CalloutProps) => {
  return (
    <Div
      // @ts-ignore
      css={{
        background: `var(--color-callout_${type})`,
        padding: '25px 20px',
        borderLeft: '5px solid',
        borderColor: `var(--color-callout_${type}_border)`,
        margin: '30px 0',
        borderRadius: 3,
        span: {
          fontWeight: 700,
        },
      }}>
      {children}
    </Div>
  )
}
