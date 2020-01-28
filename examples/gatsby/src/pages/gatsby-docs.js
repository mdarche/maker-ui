/** @jsx jsx */
import { jsx } from "theme-ui"
import Layout from "../layouts/demos/Gatsby"
import { BlogPost } from "react-understudy"

const GatsbyPage = () => (
  <Layout>
    <div sx={{ pt: 5, px: 3 }}>
      <BlogPost paragraphs={6} image={false} />
    </div>
  </Layout>
)

export default GatsbyPage
