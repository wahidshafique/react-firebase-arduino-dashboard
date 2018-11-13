import React, { Component } from "react";
import logo from "./logo.svg";
import { Provider } from "react-redux";
import createStore from "./store/createFirestore";
import "./App.css";
import Led from "./components/Led";
import Piezo from "./components/Piezo";

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
          <div>
            <Led />
          </div>

          <Piezo />
        </div>
      </Provider>
    );
  }
}

export default App;
