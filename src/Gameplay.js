import React, { Component } from 'react';
import Player from './Player'
import keydown, { Keys } from 'react-keydown';
// var ReactCanvas = require('react-canvas');

// import components
import GameSession from './GameSession';
import GameOver from './GameOver'




class Gameplay extends Component {
  constructor() {
    super()
    this.state = {
      gameOver: false
    }
  }

  render() {
    return (
     
      <div className='playble'>
        <header className='user-stats'>
          <span className='user-lives'> LIVES: {this.props.lives} </span>
          <span className='username-stats'>PLAYER: {this.props.username} </span>
          <span className='score-stats'>SCORE: {this.props.score}</span>
        
        </header>

        {(this.state.gameOver) ?
          <GameOver
            username={this.props.username}
            gameState={this.props.gameState}
            score={this.props.score}
            lives={this.props.lives} 
            lifeCounter={this.props.lifeCounter}
            startGame={this.props.startGame}
            restartGame={this.props.restartGame}
            />
          : 
          <GameSession 
            gameOver={this.state.gameOver} 
            username={this.props.username}
            gameState={this.props.gameState}
            score={this.props.score}
            lives={this.props.lives}
            lifeCounter={this.props.lifeCounter} 
            />
        }

    </div>
    )
  }
}

export default Gameplay

