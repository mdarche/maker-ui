import React from "react"
import Layout from "../layouts/SidebarRight"
import { BlogPost } from "react-understudy"

const RightSidebarPage = () => (
  <Layout>
    <BlogPost paragraphs={6} image={false} />
  </Layout>
)

export default RightSidebarPage
