// src/components/Alert.jsx
import React, { Component } from "react";
import PropTypes from "prop-types";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }

  getStyle = () => ({
    color: this.color,
    backgroundColor: this.bgColor,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: this.color,
    fontWeight: "bolder",
    borderRadius: "7px",
    textAlign: "center",
    fontSize: "12px",
    margin: "10px 0",
    padding: "10px",
  });

  render() {
    const { text } = this.props;
    if (!text) return null; // Non mostrare nulla se testo vuoto
    return <p style={this.getStyle()}>{text}</p>;
  }
}

Alert.propTypes = {
  text: PropTypes.string,
};

// Subclass InfoAlert (blue)
class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "rgb(0, 0, 255)";
    this.bgColor = "rgb(220, 220, 255)";
  }
}

// Subclass WarningAlert (yellow)
class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "rgb(255, 165, 0)";
    this.bgColor = "rgb(255, 245, 220)";
  }
}

// Subclass ErrorAlert (red)
class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "rgb(255, 0, 0)";
    this.bgColor = "rgb(255, 220, 220)";
  }
}

export { InfoAlert, WarningAlert, ErrorAlert };
