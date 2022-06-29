import React, { Component } from "react";
import {
  shuffleBoard,
  copyBoard,
  isTileEqual,
  isAdjacent,
  calculateScore
} from "../../util/gameUtil";
import Board from "../Board";
import ScoreBox from "../ScoreBox";
import CurrentWord from "../CurrentWord";
import Button from "../Button";
import "./Game.css";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.initBoard = shuffleBoard();

    this.state = {
      words: [],
      DataisLoaded: false,
      URL:
        "https://api.dictionaryapi.dev/api/v2/entries/en/" +
        <word>{this.currentWord}</word>,
      board: this.initBoard,
      currentWord: "",
      currentWordPosition: [],
      wordScoreList: {}
    };
  }

  mount() {
    fetch(
      "https://api.dictionaryapi.dev/api/v2/entries/en/" +
        this.state.currentWord
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          words: json,
          DataisLoaded: true
        });
      });
  }
  handleClick(rowId, columnId) {
    const selectedTile = this.state.board[rowId][columnId];
    const lastSelectedTile = this.state.currentWordPosition[
      this.state.currentWordPosition.length - 1
    ];
    if (selectedTile.selected) {
      if (isTileEqual(selectedTile, lastSelectedTile)) {
        const newBoard = copyBoard(this.state.board);
        newBoard[rowId][columnId].selected = false;
        this.setState({
          currentWord: this.state.currentWord.slice(0, -1),
          board: newBoard,
          currentWordPosition: this.state.currentWordPosition.slice(0, -1)
        });
      }
    } else {
      if (!lastSelectedTile || isAdjacent(selectedTile, lastSelectedTile)) {
        const newBoard = copyBoard(this.state.board);
        newBoard[rowId][columnId].selected = true;
        this.setState({
          currentWord: this.state.currentWord.concat(
            newBoard[rowId][columnId].letter
          ),

          board: newBoard,

          currentWordPosition: this.state.currentWordPosition.concat({
            rowId: rowId,
            columnId: columnId
          })
        });
      }
    }
  }

  handleSubmit(word) {
    if (word.length < 3 || this.state.wordScoreList[word]) {
      return;
    } else {
      this.mount();
    }

    const score = calculateScore(word);

    const clearedBoard = this.initBoard;

    this.setState({
      wordScoreList: { ...this.state.wordScoreList, [word]: score },
      currentWord: "",
      currentWordPosition: [],
      board: clearedBoard
    });
  }

  render() {
    return (
      <section>
        <div>
          <div className="game-area">
            <Board
              board={this.state.board}
              handleClick={this.handleClick.bind(this)}
            />
            <CurrentWord
              currentWord={this.state.currentWord}
              label="Current Word"
            />
            <Button
              handleSubmit={this.handleSubmit.bind(
                this,
                this.state.currentWord
              )}
              label="SUBMIT WORD"
            />
          </div>

          <ScoreBox
            wordScoreList={this.state.wordScoreList}
            totalScore={Object.values(this.state.wordScoreList).reduce(
              (totalScore, next) => {
                return totalScore + next;
              },
              0
            )}
          />

          <div className="clear" />
        </div>
      </section>
    );
  }
}
