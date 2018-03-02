import React, { Component } from 'react';
import { Loop, Stage, World, Body, Sprite } from 'react-game-kit';

// import components
import GameStart from './GameStart';
import Gameplay from './Gameplay'

class GameOver extends Component {
  render() {
    return(
      <div>
        <div className='final-stats'>
            <p> PLAYER: {this.props.username}</p>
            <p> SCORE: {this.props.score}</p>
        </div>
        
        <p className='gameover-text'>GAMEOVER</p>

        <button className='start-button' onClick={() => { this.props.startGame() }}> CLICK TO PLAY AGAIN </button>
      </div>
    )
  }
}

export default GameOver;
