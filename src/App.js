import React, { Component } from 'react';
import Game from './Game'


class App extends Component {
  render() {
    return (
      <div className='game-container' style={{height: '700px' }} >
      <Game />
      </div>
    )
  }
}

export default App; 