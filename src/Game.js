import React, { Component } from 'react';
import { Loop, Stage, World, Body, Sprite } from 'react-game-kit';

// importing components
import GameStart from './GameStart';
import Gameplay from './Gameplay'


class Game extends Component {
  constructor() {
    super()

    this.state = {
      gameState: false,
      username: '',
      score: 0,
      lives: 3,
      gameOver: false
    }
  }

  //function to increment score based on timer
  //1 sec = 100 points.
  scoringTimer = () => {
    console.log('Timer Start')
    console.log(this.state.gameState)
      var i = 0;
      // This block will be executed 100 times.
      
      let timer = setInterval(() => {
          if (!this.state.gameOver) {
            // console.log(this.state.score)
            i += 69;
            this.setState({
              score: i
            })

          }else {
            console.log( `score is: ${this.state.score}`)
            clearInterval(timer)
          }
      }, 1000);


  }


  // function to assign name inpput to username state.
  getUserName = (event, input) => {
    event.preventDefault();

    this.setState({
      username: input
    })
  }

  // function to change game state to true to initiate gameplay render
  startGame = () => {
    console.log('GAME STARTING')
    this.setState({
      gameState: true
    })
    this.scoringTimer()
  }


  // function to retoggle gamestate to false in order to bring back to landing page render
  restartGame = () => {
    console.log('GAME RESTARTING')
    this.setState({
      gameState: false,
      gameOver: false,
      score: 0,
      lives: 3,

    })
  }

  checkGameOver = () => {
    if(this.state.lives < 1) {
      this.setState({
        gameOver: true,
        // gameState: false
      })
    }
  }

  // function to decrease lives 
  lifeCounter = () => {
    console.log(this.state.lives -1)
    this.setState({
      lives: this.state.lives - 1
    })
    this.checkGameOver()
  }

  render() {
    console.log('username in game.js')
    console.log(this.state.username)
    return (

      <Loop>
        <Stage style={{backgroundColor: 'black'}}
          height={1000} width={700} >
          <World>
            <Body args={[0, 0, 75, 75]} >
              
              {/* Ternary to render our starting page if current state of game state is false and to take 
              player to the game when they press enter to goggle the game state to true */}

              {!this.state.gameState ? (
                <GameStart
                  scoringTimer={this.scoringTimer}
                  username={this.state.username}
                  getUserName={this.getUserName}
                  gameState={this.state.gameState}
                  startGame={this.startGame} 
                  lives={this.state.lives}
                  lifeCounter={this.lifeCounter}
                  restartGame={this.restartGame}
                  />
              ) : (
                <Gameplay
                  username={this.state.username}
                  gameState={this.state.gameState}
                  score={this.state.score}
                  lives={this.state.lives}
                  lifeCounter={this.lifeCounter}
                  startGame={this.startGame}
                  restartGame={this.restartGame}
                  gameOver={this.state.gameOver}

                  />
                )}
              <Sprite />
            </Body>
          </World>
        </Stage>
      </Loop>

    )
  }
}

export default Game;