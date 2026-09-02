import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      border: "1px solid #262932",
      borderRadius: 6,
      padding: "8px 18px",
      fontFamily: "Inter",
      fontSize: 13,
      cursor: "pointer",
      backgroundColor: selected ? "#00BFA6" : "transparent",
      color: selected ? "#0B0C10" : "#868D97",
      fontWeight: selected ? 600 : 500,
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: "#00BFA6",
        color: selected ? "#0B0C10" : "#F2F3F5",
      },
      width: "22%",
      textAlign: "center",
    },
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
