/** @jsx jsx */
import { jsx } from "theme-ui"
import { BlogPost } from "react-understudy"
import Layout from "../layouts/demos/News"

const NewsPage = () => (
  <Layout>
    <div sx={{ bg: "#d2d2d2", height: "60vh" }} />
    <div sx={{ m: "80px auto", maxWidth: "960px" }}>
      <BlogPost image={false} />
    </div>
  </Layout>
)

export default NewsPage
