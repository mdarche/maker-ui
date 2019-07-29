import React from "react"
import Layout from "../layouts/SidebarLeft"
import { BlogPost } from "react-understudy"

const LeftSidebarPage = () => (
  <Layout>
    <BlogPost paragraphs={6} image={false} />
  </Layout>
)

export default LeftSidebarPage
