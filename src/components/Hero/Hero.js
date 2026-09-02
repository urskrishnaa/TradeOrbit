import { Container, makeStyles, Typography } from "@material-ui/core";
import Spotlight from "./Spotlight";

const useStyles = makeStyles((theme) => ({
  hero: {
    position: "relative",
    borderBottom: "1px solid #262932",
    backgroundImage:
      "radial-gradient(ellipse 60% 80% at 80% 20%, rgba(0,191,166,0.10), transparent), linear-gradient(180deg, #0E0F13 0%, #0B0C10 100%)",
    backgroundColor: "#0E0F13",
    overflow: "hidden",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 40,
    padding: "72px 0 64px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "48px 0",
    },
  },
  copy: {
    maxWidth: 440,
  },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    color: "#00BFA6",
    marginBottom: 16,
  },
  heading: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: "2.75rem",
    lineHeight: 1.1,
    color: "#F2F3F5",
    marginBottom: 18,
    letterSpacing: "-0.02em",
  },
  sub: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "#868D97",
    lineHeight: 1.6,
  },
}));

function Hero() {
  const classes = useStyles();

  return (
    <div className={classes.hero}>
      <div className={classes.grid} />
      <Container className={classes.content}>
        <div className={classes.copy}>
          <div className={classes.eyebrow}>Live market data</div>
          <Typography className={classes.heading} variant="h1">
            Track crypto without the noise.
          </Typography>
          <Typography className={classes.sub}>
            Real-time prices, market caps, and trend charts for the coins
            that matter — no clutter, no distractions.
          </Typography>
        </div>
        <Spotlight />
      </Container>
    </div>
  );
}

export default Hero;
