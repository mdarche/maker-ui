import React from 'react'
import { Box, Heading } from 'theme-ui'

import SEO from '../components/Seo'

const IndexPage = () => (
  <React.Fragment>
    <Box sx={{ mt: 100, textAlign: 'center' }}>
      <Box as="h1" sx={{ fontSize: 70, mb: 60 }}>
        Elements UI + Gatsby
      </Box>
      <Box
        as="p"
        sx={{
          fontSize: 22,
          bg: 'bg_header',
          border: '1px solid',
          borderColor: 'border',
          p: 30,
          lineHeight: 2,
          span: {
            fontSize: 19,
            fontFamily: 'monospace',
            p: '2px 7px',
            mx: '5px',
            bg: 'primary',
            border: '1px solid rgba(255, 255, 255, 0.26)',
          },
        }}>
        Try going into <span>src/config/options.js</span> and play around with
        settings like
        <span>header.sticky</span>, <span>content.maxwidth</span>, and{' '}
        <span>navigation</span>.
      </Box>
    </Box>
    <Box>
      <Heading>Next Steps</Heading>
      <ol>
        <li>Customize your layout</li>
        <li>Design your theme</li>
        <li>Add some extra plugins</li>
        <li>Create content!</li>
      </ol>
    </Box>
  </React.Fragment>
)

export default IndexPage
