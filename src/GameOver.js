import React, { Component } from 'react';


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
        <button className='restart-button' onClick={() => {this.props.startGame()}}> CLICK HERE TO PLAY AGAIN </button>
        <div>
          <img className='gameover-image' src='./kagami-noodles-black.png' alt='noodles on head'/>
        </div>
        
      </div>
    )
  }
}

export default GameOver
