import React from "react"
import { BlogPost } from "react-understudy"
import Layout from "../layouts/demos/Blog"

const BlogPage = () => (
  <Layout>
    <BlogPost paragraphs={6} image={false} />
  </Layout>
)

export default BlogPage
