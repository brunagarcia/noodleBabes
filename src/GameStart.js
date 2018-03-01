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
    return (
      <div style={{color:'white'}}>
        <form onSubmit={(event) => {this.props.getUserName(event, this.state.userInput)}}>
          <label>
            Player Name:
            <input type="text" onChange={this.handleInput} />
          </label>

          <button style={{color:'red'}} onClick={() => {this.props.startGame()}}> PRESS TO PLAY </button>
                {(this.props.gameState ? 'hello': 'nope')}
        </form>
      </div>

    )
  }
}

export default GameStart;


