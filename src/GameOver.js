import React, { Component } from 'react';


// import components
import GameStart from './GameStart';
import Gameplay from './Gameplay'

class GameOver extends Component {

  
  componentDidMount() {
      this.audio.play()
    }
  render() {
    return(
      <div>
        <div className='final-stats'>
            <p> PLAYER: {this.props.username}</p>
            <p> SCORE: {this.props.score}</p>
        </div>
        
        <p className='gameover-text'>GAMEOVER</p>
        <button className='restart-button' onClick={() => {this.props.restartGame()}}> CLICK HERE TO PLAY AGAIN </button>
        <div>
          <img className='gameover-image' src='./kagami-noodles-black.png' alt='noodles on head'/>
        </div>
        <audio ref={audio => this.audio = audio}>
          <source src="gameover.mp3" />
        </audio> 
      </div>
    )
  }
}

export default GameOver;
