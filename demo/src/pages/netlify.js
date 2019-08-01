/** @jsx jsx */
import { jsx } from "theme-ui"
import { Box, Grid } from "react-understudy"
import Layout from "../layouts/demos/Netlify"

const NetlifyPage = () => (
  <Layout>
    <div
      sx={{
        width: "100%",
        bg: "#0e1e24",
        height: "160px",
      }}
    />
    <div
      sx={{
        maxWidth: "75rem",
        bg: "#fff",
        p: "30px",
        m: ["-120px 20px 5rem", "-120px auto 5rem"],
        borderRadius: "8px",
        boxShadow: "0 2px 4px 0 rgba(14,30,37,.12)",
      }}>
      <Grid
        sx={{ mb: 30 }}
        gap={[40, 40]}
        columns="2"
        rows="2"
        height="115px"
        width="100%"
      />
      <Box height="30px" width="130px" />
      <Box height="200px" mb="50px" />
      <Box height="50px" width="40%" />
      <Box height="50px" />
      <Box height="50px" />
      <Box height="450px" />
    </div>
  </Layout>
)

export default NetlifyPage
