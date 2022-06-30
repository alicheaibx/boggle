import React, { Component } from "react";
import logo from "./img/logo.png";
import "./App.css";
import Timer from "./components/Timer";


class App extends Component {
  stylelogo={width:200,
  highit:200
  };
  render() {
    return (
      <div className="container">
        <div className="header">
         
          <img style={this.stylelogo} src={logo} className="header-logo" alt="logo" />
        </div>
        
        <Timer />
      </div>
    );
  }
}

export default App;
