import React, { Component } from 'react';
import Player from './Player'
// import keydown, { Keys } from 'react-keydown';
// var ReactCanvas = require('react-canvas');
// import components
import GameSession from './GameSession';
import GameOver from './GameOver'



class Gameplay extends Component {
  // lifeCounter = () => {
  //   this.setState({
  //     lives: this.lives -1
  //   })
  //   console.log(this.state.lives - 1)
  //   this.checkGameOver()
  // }

  render() {
    return (
      <div>
        <header className='user-stats'>
          <span className='user-lives'> LIVES: {this.props.lives} </span>
          <span className='username-stats'>PLAYER: {this.props.username} </span>
          <span className='score-stats'>SCORE: {this.props.score}</span>

        <button type="button" onClick={() => {this.props.lifeCounter()}}> decrement lives </button>
        </header>

        {(this.props.gameOver) ? 
          (<GameOver
            username={this.props.username}
            gameState={this.props.gameState}
            score={this.props.score}
            lives={this.props.lives} 
            lifeCounter={this.props.lifeCounter}
            startGame={this.props.startGame}
            />)
          : 
          (<GameSession 
            gameOver={this.props.gameOver} 
            username={this.props.username}
            gameState={this.props.gameState}
            score={this.props.score}
            lives={this.props.lives}
            lifeCounter={this.props.lifeCounter} 
            />)
        }

    </div>
    )
  }
}

export default Gameplay

