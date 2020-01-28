import React from "react"
import { BlogPost } from "react-understudy"
import Layout from "../layouts/SidebarRight"

const RightSidebarPage = () => (
  <Layout>
    <BlogPost paragraphs={6} image={false} />
  </Layout>
)

export default RightSidebarPage
