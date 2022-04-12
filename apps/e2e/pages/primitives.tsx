import { Grid } from 'maker-ui'

export default function PrimitivesPage() {
  return (
    <div>
      <h1>Primitives</h1>
      <Grid
        columns={5}
        columnGap={50}
        rowGap={30}
        css={{ '.col': { height: 200, background: 'gainsboro' } }}>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
      </Grid>
    </div>
  )
}
