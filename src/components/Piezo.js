import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { compose, flattenProp, withHandlers, pure } from "recompose";
import withFirestore from "../helpers/withFirestore";

//TODO: format this and compose, use functional components, obviously

class Piezo extends Component {
  static propTypes = {
    getBoardSwitches: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { isPlayingSong: false };
  }

  render() {
    return (
      <div className="one-half column card">
        <div className="one-half column content-container">
          <img
            className="u-max-full-width"
            src={require("../assets/piezo.png")}
          />
        </div>
        <h2 className="">
          {this.state.isPlayingSong ? "Playing..." : "Idle..."}
        </h2>
        <h5 className="">Piezo buzzer</h5>
        <p className="">Connect your Piezo</p>
        <button>How?</button>
        <div className="two-thirds nest-card ">
          {" "}
          <button
            disabled={this.state.isPlayingSong}
            onClick={() => {
              this.props.updatePiezo(true);
              this.setState({ isPlayingSong: true });
            }}
            className="button button-primary"
          >
            {this.state.isPlayingSong ? "Playing..." : "Play sound!"}
          </button>
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
    updatePiezo: props => isPlaying => {
      return props.firestore.update(`arduino/boardSwitches`, {
        isPlayingSong: isPlaying
      });
    },
    getBoardSwitches: props => () => {
      return props.firestore.get(`arduino/boardSwitches`);
    }
  }),
  // Prevent unnessesary re-renders by doing shallow comparison of props
  pure
);

export default enhance(Piezo);
