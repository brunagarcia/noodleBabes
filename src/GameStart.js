import React, { Component } from 'react';

class GameStart extends Component {
constructor(){
  super()

  this.state = {
    userInput: ''
  }
}

  // componentDidMount() {
  //   this.audio.play()
  // }

  handleClick = () => {
    //call start game func
    this.props.startGame();
    //call timer func
    this.props.scoringTimer();

  }



  handleInput = (e) => {
    this.setState({
      userInput: e.target.value
    })
  }

  render() {
    return (
      <div className='start-page'>
      <h1 className='game-title'> STOP SENDING NOODS </h1>
        <form 
          onKeyUp={(event) => { this.props.getUserName(event, this.state.userInput) }} 
          onSubmit={() => { this.props.startGame() }}>
          <label>
            <p className='player'> |- PLAYER NAME -|</p>
            <input type="text" onChange={this.handleInput} autoFocus/>
          </label>  
        </form>
        <button className='start-button' onClick={() => { this.handleClick() }}> HIT ENTER TO PLAY </button>

        <div>
          <img className='logo' src='./ramenbowlblack.png' alt='ramenbowllogo'/>
        </div>
      {/* <audio ref={audio => this.audio = audio}>
        <source src="playgame.mp3" />
      </audio> */}
      </div>

    )
  }
}

export default GameStart;


