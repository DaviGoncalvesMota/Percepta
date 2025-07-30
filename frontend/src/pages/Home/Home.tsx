import { Paper, Typography } from "@mui/material";

const Home = () => {
  return (
    <>
      <Paper elevation={3} style={{ padding: '40px', margin: '20px' }}>
        <Typography align="center" variant="h4"> Welcome to Percepta</Typography>
        <Typography align="center" variant="h6"> your best feedback site. </Typography>
      </Paper>
      <br />
    </>
  );
}

export default Home;
