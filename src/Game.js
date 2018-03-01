import React, { Component } from 'react';
import { Loop, Stage, World, Body, Sprite } from 'react-game-kit';

import GameStart from './GameStart';


class Game extends Component {
  constructor(){
    super()

    this.state = {
      gameState: false,
      username: "",
      score: 0,
    }
  }

  //Function to assign name inpput to username state.
  getUserName = (event, input) => {
    event.preventDefault();
    console.log(input)
    this.setState({
      username: input
    })
  }

  startGame = () => {
    console.log('GAMEPLAY')
    this.setState({
      gameState: true
    })
  }

  render() {
    return (

      <Loop>
        <Stage style={{backgroundColor: 'black'}} 
        height={window.innerWidth} width={window.innerHeight} >
          <World>
            <Body args={[0,0,75,75]} >
              <GameStart 
              username={this.state.username}
              getUserName={this.getUserName}
              gameState={this.state.gameState}
              startGame={this.startGame}
              />
              <Sprite />
            </Body>
          </World>
        </Stage>
      </Loop>

    )
  }
}

export default Game;