import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { CirclePicker as ColorPicker } from "react-color";
import PropTypes from "prop-types";
import { compose, flattenProp, withHandlers, pure } from "recompose";
import withFirestore from "../helpers/withFirestore";

const colorArr = [
  "#ff0000",
  "#00ff00",
  "#000fff",
  "#ffff00",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548"
];

const glowing = keyframes`
  0% {
    filter: blur(15px);
  }
  40% {
    filter: blur(17px);
  }
  60% {
    filter: blur(20px);
  }
  100% {
    filter: blur(25px)}
    `;

const GlowDot = styled.div`
  z-index: -1;
  position: absolute;
  left: 11%;
  top: 11%;
  border-radius: 50%;
  width: 85px;
  height: 80px;

  background: ${props => props.color};
  filter: blur(10px);
  animation: ${glowing} 2000ms infinite alternate;
`;

const ArdStatusButton = styled.button`
  background-color: red;
`;

class Led extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      color: "#454545"
    };
  }

  componentDidMount = async () => {
    const bs = await this.props.getBoardState();
    const color = bs.data().ledColor;
    this.setState({ color: color });
  };

  handleChangeComplete = color => {
    this.setState({ color: color.hex });
    this.props.updateColor(color.hex);
  };

  render() {
    return (
      <div className="two-thirds column card">
        <div className="one-half column category">
          <GlowDot color={this.state.color} />
          <img
            className="u-max-full-width"
            src={require("../assets/led.png")}
          />
        </div>
        <h2 className="">{this.state.color}</h2>
        <h5 className="">LED Color Changer</h5>
        <p className="">Connect your Diffuse RGB LED, with 270 Ω resistors</p>
        <button>How?</button>
        {/* <ArdStatusButton>Arduino: OFF</ArdStatusButton>
        <button>LED: NO-CON</button> */}
        <div className="two-thirds nest-card ">
          <ColorPicker
            circleSize={30}
            color={this.state.color}
            onChangeComplete={this.handleChangeComplete}
            width="inherit"
            colors={colorArr}
          />
        </div>
      </div>
    );
  }
}

const enhance = compose(
  // Add props.firestore
  withFirestore,
  // Flatten led prop (creates id, text, owner, done and disabled props)
  flattenProp("led"),
  // Handlers as props
  withHandlers({
    updateColor: props => colorHex => {
      return props.firestore.update(`app/boardState`, { ledColor: colorHex });
    },
    getBoardState: props => () => {
      return props.firestore.get(`app/boardState`);
    }
  }),
  // Prevent unnessesary re-renders by doing shallow comparison of props
  pure
);

export default enhance(Led);
