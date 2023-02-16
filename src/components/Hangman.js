//Hangman game
// Reference: adapted code from https://www.youtube.com/watch?v=82-Gnw-rBiQ

import React from "react";
import { Component } from "react";
import { randomWord } from "./Dictionery.js";
import Button from "react-bootstrap/Button";

// import all images
import state1 from "../images/state1.GIF";
import state2 from "../images/state2.GIF";
import state3 from "../images/state3.GIF";
import state4 from "../images/state4.GIF";
import state5 from "../images/state5.GIF";
import state6 from "../images/state6.GIF";
import state7 from "../images/state7.GIF";
import state8 from "../images/state8.GIF";
import state9 from "../images/state9.GIF";
import state10 from "../images/state10.GIF";
import state11 from "../images/state11.GIF";
import win from "../images/win.png";
import lost from "../images/lost.png";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 10,
    images: [
      state1,
      state2,
      state3,
      state4,
      state5,
      state6,
      state7,
      state8,
      state9,
      state10,
      state11,
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      wrongLetter: 0,
      guessed: new Set([]),
      chosenWord: randomWord(),
    };
  }
  // on letter click the letter tile disappears and state changed
  handleGuess = (e) => {
    let letter = e.target.value;
    e.target.style.display = "none";
    this.setState((state) => ({
      guessed: state.guessed.add(letter),
      // mistake counter, add one if wrong letter entered
      wrongLetter:
        state.wrongLetter + (state.chosenWord.includes(letter) ? 0 : 1),
    }));
  };
  // when letter is clicked either letter shown or black space
  guessedWord() {
    return this.state.chosenWord
      .split("")
      .map((letter) => (this.state.guessed.has(letter) ? letter : " _ "));
  }
  // show letter tiles by splitting string of alphabet and then use map to show individual letters
  letters() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <Button
        variant="success"
        className="letters"
        key={letter}
        value={letter}
        onClick={this.handleGuess}
      >
        {letter}
      </Button>
    ));
  }
  // when reset button cliked all state is reset to original values with a new random word
  resetButton = () => {
    this.setState({
      wrongLetter: 0,
      guessed: new Set([]),
      chosenWord: randomWord(),
    });
  };
  // help div state set to false
  state = { div: false };

  render() {
    // on page load
    let gameArea = this.letters();
    // if maximum mistakes is recahed game over set to true
    const gameOver = this.state.wrongLetter >= this.props.maxWrong;
    // if guessedword joined together is equal to chosen word then isWinner set to true
    const isWinner = this.guessedWord().join("") === this.state.chosenWord;

    // show game status win or lose image shown
    if (isWinner) {
      gameArea = <img src={win} width="300px" height="300px"></img>;
    }
    if (gameOver) {
      gameArea = <img src={lost} width="300px" height="300px"></img>;
    }

    // function to show/hide help instructions
    let showHelp = (e) => {
      this.setState({ div: !this.state.div });
    };
    let x = this.state.div;

    return (
      <div>
        <h1>HANGMAN</h1>
        <br></br>
        {/*Help button to show instructions and then hide if not required*/}
        <Button type="button" onClick={showHelp}>
          {x ? "Hide Help" : "How to play"}
        </Button>
        <br></br>
        {/* Show help section on button click (reference:https://www.youtube.com/watch?v=8xcdoH_Y_kc ) and then hide on click again*/}
        {x && (
          <div>
            <br></br>
            <ul>
              <li>Select the letters from the tiles.</li>
              <li>
                If the letter is present in the random word it will appear in
                the position.
              </li>
              <li>
                If the letter is not present then the hangman drawing will
                appear.
              </li>
              <li>
                If you get 10 incorrect letters then you will lose the game.
              </li>
              <li>You can replay the game by pressing the reset button.</li>
            </ul>
          </div>
        )}
        <br></br>
        {/*div to show guess left */}
        <div className="guesses">
          Guesses Left: {10 - this.state.wrongLetter}
        </div>
        <div>
          {/*Hangman images shown when wrong letters entered */}
          <img src={this.props.images[this.state.wrongLetter]} />
        </div>
        <div>
          {/* word to guess section */}
          <p> Guess the word:</p>
          <p className="word">
            {!gameOver ? this.guessedWord() : this.state.chosenWord}
          </p>
          <p className="stat">{gameArea}</p>
          {/*reset button to choose new word and start again*/}
          <Button onClick={this.resetButton}>Reset</Button>
        </div>
      </div>
    );
  }
}

export default Hangman;
