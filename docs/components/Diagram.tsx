import { Grid } from 'maker-ui'

export interface DiagramProps {
  component: string
  subtitle: string
  children: React.ReactNode
}

export const Diagram = ({ component, subtitle, children }: DiagramProps) => {
  const selector = `.${component.toLowerCase()} path`
  console.log('selector is', selector)

  const layoutStyle =
    component === 'Layout'
      ? {
          border: '3px solid',
          borderColor: 'var(--color-diagram_active)',
        }
      : undefined

  return (
    <Grid
      columns={['0.3fr 0.7fr', '0.4fr 0.6fr']}
      gap={40}
      css={{
        padding: '40px 0 20px',
        h1: { margin: 0 },
        '.diagram': {
          textAlign: 'center',
          ...layoutStyle,
          svg: { marginBottom: -7 },
        },
        '.diagram-title': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
        pre: {
          padding: '50px 0 20px',
        },
        'line-number-style': {
          opacity: 0,
          width: 30,
        },
        '.mobile-diagram': {
          maxHeight: 230,
        },
        '.import-guide': {
          display: ['none', 'block'],
        },
        '.bg': {
          fill: 'var(--color-diagram_bg)',
        },
        '.box': {
          fill: 'var(--color-diagram_light)',
        },
        '.box-dark': {
          fill: 'var(--color-diagram_dark)',
        },
        [selector]: {
          fill: 'var(--color-diagram_active)',
        },
      }}>
      <div className="diagram">
        {component === 'MobileMenu' ? (
          <MobileLayout />
        ) : component === 'SideNav' ? (
          <SideNavLayout />
        ) : (
          <FullLayout />
        )}
      </div>
      <div className="diagram-title">
        <h1>{component}</h1>
        {subtitle || 'Layout Component'}
        <div className="import-guide">{children}</div>
      </div>
    </Grid>
  )
}

const FullLayout = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 552">
    <g className="content">
      <path className="bg" d="M0 0h449v552H0z" />
    </g>
    <g className="footer">
      <path className="box" d="M0 425h449v126H0z" />
    </g>
    <g className="footer">
      <path className="box-dark" d="M38 452h376v69H38z" />
    </g>
    <g className="sidebar">
      <path className="box" d="M38 103h92.61v291H38z" />
    </g>
    <g className="main">
      <path className="box" d="M151.91 103H414v291H151.91z" />
    </g>
    <g className="topbar">
      <path className="box-dark" d="M0 0h449v18H0z" />
    </g>
    <g className="header">
      <path className="box" d="M0 18h449v54H0z" />
    </g>
    <g className="navbar">
      <path className="box-dark" d="M38 30h93.54v25H38z" />
    </g>
    <g className="navbar">
      <path className="box-dark" d="M163.95 30H364v25H163.95z" />
    </g>
    <g className="navbar">
      <path className="box-dark" d="M374.18 30H414v25h-39.82z" />
    </g>
  </svg>
)

export const SideNavLayout = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 364">
    <path className="bg" d="M0 0h449v364H0z" />
    <g className="sidenav">
      <path className="box-dark" d="M0 72h133v291H0z" />
    </g>
    <path className="box-dark" d="M0 0h449v18H0z" />
    <path className="box" d="M0 18h449v54H0z" />
    <path
      className="box-dark"
      d="M23 29h101v25H23zM159 29h222v25H159zM386 29h43v25h-43z"
    />
    <path className="box" d="M159 101h263v231H159z" />
  </svg>
)

export const MobileLayout = () => (
  <svg
    className="mobile-diagram"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 193 364">
    <path className="bg" d="M0 0h193v364H0z" />
    <g className="header">
      <path className="box" d="M0 0h193v40H0z" />
    </g>
    <g className="logo">
      <path className="box-dark" d="M11 9h96v20H11z" />
    </g>
    <g className="menu-toggle">
      <path className="box-dark" d="M155 9h29v20h-29z" />
    </g>
    <g className="body">
      <path className="box" d="M12 59h169v283H12z" />
    </g>
    <g className="mobilemenu">
      <path className="bg" d="M73 0h120v364H73z" />
    </g>
  </svg>
)
