import React, { Component } from 'react';
import ArrowKeysReact from 'arrow-keys-react';

class GameSession extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: {
        // x: window.innerWidth/2,
        // y: window.innerHeight/2,
        x: 100,
        y: 100,
      },
      key: this.props.keys,
    }
    ArrowKeysReact.config({
      left: () => {
        this.setState({
          key: 'left',
          position: {
            x: this.state.position.x - 10,
            y: this.state.position.y,
          }
        });
      },
      right: () => {
        this.setState({
          key: 'right',
          position: {
            x: this.state.position.x + 10,
            y: this.state.position.y,
          }

        });
      },
      up: () => {
        this.setState({
          key: 'up',
          position: {
            x: this.state.position.x,
            y: this.state.position.y - 10,
          }
        });
      },
      down: () => {
        this.setState({
          key: 'down',
          position: {
            x: this.state.position.x,
            y: this.state.position.y + 10,
          }
        })
      }
    })
  }
  componentDidMount() {
    this.draw()
  }

  componentDidUpdate() {
    this.draw()
    console.log(this.state.key)
  }

  updatePosition = (x, y) => {
    this.setState({
      position: {
        x,
        y
      }
    })
  }

  draw = () => {
    let canvasCtx = this.canvas.getContext('2d');
    // let drawVisual = requestAnimationFrame(this.draw);

    //redraw background
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    //draw player
    canvasCtx.fillStyle = 'rgb(255, 255, 255)';
    canvasCtx.fillRect(this.state.position.x, this.state.position.y, 20, 20);


    window.requestAnimationFrame(this.draw)
  }

  render() {
    return (
      
      <div {...ArrowKeysReact.events} tabIndex="1">
        <canvas ref={(self) => { this.canvas = self }}
          style={{ backgroundColor: 'black' }}
          width={window.innerWidth}
          height={window.innerHeight}
        />

      </div>
    )
  }
}

export default GameSession