import React, { Component } from 'react';

class GameStart extends Component {
constructor(){
  super()

  this.state = {
    userInput: ''
  }
}

  handleInput = (e) => {
    this.setState({
      userInput: e.target.value
    })
  }

  render() {
    console.log(this.props.username)
    return (
      <div className='start-page'>
        <form onKeyUp={(event) => {this.props.getUserName(event, this.state.userInput)}}>
          <label>
            PLAYER NAME:
            <input type="text" onChange={this.handleInput} />
          </label>  
        </form>

        <button className='start-button' onClick={() => {this.props.startGame()}}> CLICK TO PLAY </button>
      </div>

    )
  }
}

export default GameStart;


