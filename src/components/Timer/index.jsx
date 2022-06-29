import React, { Component } from "react";
import Game from "../Game";
import ScoreBox from "../ScoreBox";

import TotalScore from "../ScoreBox/TotalScore";
class Timer extends Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 0 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }
  stoptimer = () => {
    this.state.seconds = 1;
  };
  setOneMin = () => {
    this.state.seconds = 60;
    this.startTimer();
  };
  setthreeMin = () => {
    this.state.seconds = 180;
    this.startTimer();
  };
  setfiveMin = () => {
    this.state.seconds = 300;
    this.startTimer();
  };
  settenMin = () => {
    this.state.seconds = 600;
    this.startTimer();
  };
  startgame = () => {
    return <div> {<Game />}</div>;
  };

  resultshow = () => {
    if (this.state.seconds === 0) {
      return (
        <div>
          <p> congratultion You win</p>
        </div>
      );
    }
  };
  render() {
    return (
      <div>
        m: {this.state.time.m} s: {this.state.time.s}
        <div>
          <button onClick={this.setOneMin}>1min</button>
          <button onClick={this.setthreeMin}>3min</button>
          <button onClick={this.setfiveMin}>5min</button>
          <button onClick={this.settenMin}>10min</button>
        </div>
        <div>
          <Game />
          <button onClick={this.stoptimer}>stop</button>
          <div>{this.resultshow()}</div>
        </div>
      </div>
    );
  }
}

export default Timer;
