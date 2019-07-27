/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Layout from "../layouts/Default"
import { BlogPost } from "react-understudy"

const IndexPage = () => (
  <Layout>
    <h1 sx={{ fontFamily: "serif" }}>Test</h1>
    <BlogPost paragraphs={6} image={false} />
  </Layout>
)

export default IndexPage
