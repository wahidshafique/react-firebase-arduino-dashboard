import React, { Component } from "react";
import logo from "./logo.svg";
import { Provider } from "react-redux";
import createStore from "./store/createStore";
import "./App.css";
import Led from "./components/Led";

const store = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <div className="header">
            <h3 className="section-heading">Arduino Dashboard</h3>
            <img width={75} src={require("./assets/arduino.png")} />

            <p className="section-description">
              A sandbox for testing out arduino components
            </p>
          </div>

          <div className="container">
            <div className="row">
              <Led />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
