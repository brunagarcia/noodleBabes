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
      lives: 3
    }
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
  }

  // function to retoggle gamestate to false in order to bring back to landing page render
  restartGame = () => {
    console.log('GAME RESTARTING')
    this.setState({
      gameState: false
    })
  }


  // function to decrease lives 

  lifeCounter = () => {
    console.log(this.state.lives)
    this.setState({
      lives: this.state.lives - 1
    })
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