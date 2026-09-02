import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles(() => ({
  appBar: {
    borderBottom: "1px solid #262932",
    backgroundColor: "#0E0F13",
  },
  title: {
    flex: 1,
    color: "#F2F3F5",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: 20,
    cursor: "pointer",
    letterSpacing: "-0.01em",
  },
  dot: {
    color: "#00BFA6",
  },
  select: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    border: "1px solid #262932",
    borderRadius: 6,
    color: "#F2F3F5",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function Header() {
  const classes = useStyles();
  const { currency, setCurrency } = CryptoState();

  const history = useHistory();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        className={classes.appBar}
        color="transparent"
        position="static"
        elevation={0}
      >
        <Container>
          <Toolbar disableGutters style={{ minHeight: 64 }}>
            <Typography
              onClick={() => history.push(`/`)}
              className={classes.title}
            >
              TradeOrbit<span className={classes.dot}>.</span>
            </Typography>
            <Select
              disableUnderline
              className={classes.select}
              value={currency}
              style={{ width: 90, height: 36, padding: "0 8px" }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
