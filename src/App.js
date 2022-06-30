import React, { Component } from "react";
import logo from "./img/logo.png";
import "./App.css";
import Game from "./components/Game";
import Timer from "./components/Timer";

class App extends Component {
  render() {
    return (
      <div className="container">
     
        <Timer />
      </div>
    );
  }
}

export default App;
