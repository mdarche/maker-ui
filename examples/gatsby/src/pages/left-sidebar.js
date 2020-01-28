import React from "react"
import { BlogPost } from "react-understudy"
import Layout from "../layouts/SidebarLeft"

const LeftSidebarPage = () => (
  <Layout>
    <BlogPost paragraphs={6} image={false} />
  </Layout>
)

export default LeftSidebarPage
