import { Box, Paper, Typography } from "@mui/material";

const About = () => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
          <Box sx={{ maxWidth: 1000, margin: "auto", textAlign: "justify" }}>
            <Typography align="center" variant="h4" component="h1" gutterBottom>
              <strong>About Us</strong>
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1, padding: 2 }}>
              At Percepta, we believe that feedback is more than just words —
              it’s a bridge between people and the companies that serve them.
              Our platform was built with one goal in mind: to create a simple,
              transparent, and effective space where customers can share their
              real experiences and businesses can listen, learn, and evolve.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1, padding: 2 }}>
              In today’s world, trust is built through communication. Percepta
              empowers users to express their thoughts in a respectful and
              constructive way, allowing them to highlight what companies are
              doing well and point out where improvements are needed. Whether
              it's about a great service, a frustrating delay, or a suggestion
              for better performance, every voice matters.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1, padding: 2 }}>
              For businesses, Percepta offers more than just a feedback wall.
              It's a complete tool to understand customer satisfaction, identify
              trends, and take action based on real insights. With our intuitive
              interface, companies can track responses over time, categorize
              feedback by theme, and respond directly to their audience —
              showing that they care and are willing to grow.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1, padding: 2 }}>
              Our vision is to foster a culture of transparency, continuous
              improvement, and human connection. We’re not just a feedback
              platform — we’re a movement to bring people and organizations
              together through open dialogue and accountability.
            </Typography>
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
              <Typography variant="body1" sx={{ marginBottom: 1, padding: 2 }}>
                Join us on this journey to transform feedback into progress.
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, padding: 2 }}>
                Percepta — Where feedback meets action.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default About;
