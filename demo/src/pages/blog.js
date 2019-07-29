import React from "react"
import Layout from "../layouts/demos/Blog"
import { BlogPost } from "react-understudy"

const BlogPage = () => (
  <Layout>
    <BlogPost paragraphs={6} image={false} />
  </Layout>
)

export default BlogPage
