/** @jsx jsx */
import { jsx } from "theme-ui"
import { Sidebar, Main } from "gatsby-theme-elements"
import { Box, Grid } from "react-understudy"
import Layout from "../layouts/demos/Github"

const GithubPage = () => (
  <Layout>
    <Sidebar>
      <Box height="260px" mb="30px" />
      <Box height="40px" width="85%" />
      <Box height="25px" width="60%" mb="50px" />
      <Box height="40px" />
      <Box height="25px" width="30%" />
      <Box height="1px" />
      <Grid count={3} height="40px" width="40px" columns="5" />
    </Sidebar>
    <Main>
      <Box height="60px" width="70%" mb="30px" />
      <Box height="30px" width="150px" mb="30px" />
      <Grid sx={{ mb: 30 }} columns="2" rows="2" height="115px" width="100%" />
      <Box height="30px" width="130px" />
      <Box height="200px" mb="50px" />
      <Box height="50px" />
      <Box height="450px" />
    </Main>
  </Layout>
)

export default GithubPage
