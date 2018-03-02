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
        <form 
          onKeyUp={(event) => { this.props.getUserName(event, this.state.userInput) }} 
          onSubmit={() => { this.props.startGame() }}>
          <label>
            PLAYER NAME:
            <input type="text" onChange={this.handleInput} autoFocus/>
          </label>  
        </form>

        <button className='start-button' onClick={() => { this.props.startGame() }}> HIT ENTER TO PLAY </button>
        <div>
          <img className='logo' src='./ramenbowlblack.png' alt='ramenbowllogo'/>
        </div>
      </div>

    )
  }
}

export default GameStart;


