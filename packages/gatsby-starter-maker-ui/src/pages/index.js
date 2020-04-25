import React from 'react'
import { Box, Heading } from 'theme-ui'
import { SEO } from '@maker-ui/seo'

const Highlite = ({ fontSize = [17, 19], ...props }) => (
  <Box
    as="span"
    sx={{
      fontSize,
      fontFamily: 'monospace',
      p: '2px 7px',
      mx: '5px',
      bg: 'primary',
      border: '1px solid rgba(255, 255, 255, 0.26)',
    }}
    {...props}
  />
)

const IndexPage = () => (
  <React.Fragment>
    <SEO title="Maker UI + Gatsby" />
    <Box sx={{ mt: 100, textAlign: 'center', px: 20 }}>
      <Box as="h1" sx={{ fontSize: [42, 70], mb: 60 }}>
        Maker UI + Gatsby
      </Box>
      <Box
        as="p"
        sx={{
          fontSize: [18, 22],
          display: 'block',
          bg: 'bg_header',
          border: '1px solid',
          borderColor: 'border',
          p: 30,
          lineHeight: [1.75, 2],
        }}>
        Welcome to your new site!
        <br />
        Try going into
        <Highlite>src/config/options.js</Highlite> to play around with settings
        like
        <Highlite>header.sticky</Highlite> and
        <Highlite>content.maxwidth</Highlite>.
      </Box>
    </Box>
    <Box sx={{ my: 80, px: 20 }}>
      <Heading
        sx={{
          textAlign: 'center',
          fontSize: 32,
          pb: 20,
          mb: 40,
          borderBottom: '1px solid',
          borderColor: 'border',
        }}>
        Next Steps
      </Heading>
      <Box
        as="ol"
        sx={{
          pl: 20,
          fontSize: 18,
          h4: { ml: 10, mb: 10, fontSize: 20 },
          li: { fontWeight: 700, mb: 40, lineHeight: 1.75 },
          div: {
            display: ['flex', 'block'],
            flexWrap: 'wrap',
            ml: 10,
            fontWeight: 400,
          },
        }}>
        <li>
          <h4>Customize your layout</h4>
          <div>
            This starter uses a basic layout. If you want a SideNav, Sidebar,
            conditional page layouts, or a different header (and much more), you
            can customize
            <Highlite fontSize={16}>src/components/Layout.js</Highlite>.
          </div>
        </li>
        <li>
          <h4>Set theme options</h4>
          <div>
            Maker UI gives you access to dozens of helpful features that you can
            configure in{' '}
            <Highlite fontSize={16}>src/config/options.js.</Highlite>.
          </div>
        </li>
        <li>
          <h4>Design your theme</h4>
          <div>
            Customize the look and feel of your theme by editing global styles,
            responsive scales, color modes, and Maker UI theme variants in
            <Highlite fontSize={16}>src/config/theme.js</Highlite>.
          </div>
        </li>
        <li>
          <h4>Add extra plugins / packages</h4>
          <div>
            This starter ships with minimal dependencies. Consider adding a few
            awesome tools like Gatsby Image, MDX, TypographyJS, Google
            Analytics, or a CMS data source.
          </div>
        </li>
        <li>
          <h4>Create content</h4>
          <div>
            Maker UI gets your layout up and running quickly so you can focus on
            building pages and creating content. Have fun and enjoy!
          </div>
        </li>
      </Box>
    </Box>
  </React.Fragment>
)

export default IndexPage
