import { Grid, Div } from 'maker-ui'
import { TableofContents } from '@maker-ui/toc'
import { useRouter } from 'next/router'

export default function TocPage() {
  const { asPath } = useRouter()
  return (
    <Grid columns={['.75fr .25fr']}>
      <div>
        <Div css={{ height: 400 }}>
          <h2 id="section1">Title 1</h2>
        </Div>
        <Div css={{ height: 400 }}>
          <h4 id="section10">Title 10</h4>
        </Div>
        <Div css={{ height: 400 }}>
          <h3 id="section12">Title 10</h3>
        </Div>
        <Div css={{ height: 600 }}>
          <h2 id="section2">Title 2</h2>
        </Div>
        <Div css={{ height: 800 }}>
          <h2 id="section3">Title 3</h2>
        </Div>
      </div>
      <div>
        <TableofContents
          title="On this page"
          pathname={asPath}
          activeColor="blue"
          marker="before"
          css={{
            top: 100,
            ul: {
              lineHeight: 2,
              borderLeft: '1px solid gainsboro',
            },
            a: {
              display: 'block',
              padding: '20px 5px',
              color: '#555',
            },
          }}
        />
      </div>
    </Grid>
  )
}
