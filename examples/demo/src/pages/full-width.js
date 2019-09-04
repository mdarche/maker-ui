/** @jsx jsx */
import { jsx } from "theme-ui"
import { Section } from "gatsby-theme-elements"

import Layout from "../layouts/FullWidth"

const FullWidthPage = () => (
  <Layout>
    <Section
      background="#efefef"
      sx={{
        height: "75vh",
      }}>
      Section 1
    </Section>
    <Section
      background="#e0e0e0"
      sx={{
        height: "75vh",
      }}>
      Section 2
    </Section>
    <Section
      background="#d4d2d2"
      sx={{
        height: "75vh",
      }}>
      Section 3
    </Section>
  </Layout>
)

export default FullWidthPage
