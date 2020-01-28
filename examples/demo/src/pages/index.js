import React from 'react'
import { BlogPost } from 'react-understudy'
import Layout from '../layouts/default'

const IndexPage = () => (
  <Layout>
    <BlogPost paragraphs={6} image={false} />
  </Layout>
)

export default IndexPage
