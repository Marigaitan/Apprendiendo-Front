import React from "react";

const ProgressBar = (props) => {
  const { tarea, bgcolor, completed } = props;

  const containerStyles = {
    height: 20,
    width: "90%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 30,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div>
      <h4>{tarea}</h4>
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
