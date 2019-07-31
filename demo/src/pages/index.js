import React from "theme-ui"
import { BlogPost } from "react-understudy"
import Layout from "../layouts/Default"

const IndexPage = () => (
  <Layout>
    <BlogPost paragraphs={6} image={false} />
  </Layout>
)

export default IndexPage
