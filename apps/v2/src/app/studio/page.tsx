import { Grid } from '@maker-ui/studio'
import './page.css'

export default function StudioTest() {
  return (
    <div style={{ padding: '100px 0' }}>
      <Grid />
      <div className="parent">
        <div className="child">Child</div>
      </div>
    </div>
  )
}
