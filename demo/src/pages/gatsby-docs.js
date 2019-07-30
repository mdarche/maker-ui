import React from "theme-ui"
import Layout from "../layouts/demos/Gatsby"
import { BlogPost } from "react-understudy"

const GatsbyPage = () => (
  <Layout>
    <BlogPost paragraphs={6} image={false} />
  </Layout>
)

export default GatsbyPage
