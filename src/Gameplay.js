import React, { Component } from 'react';
import ArrowKeysReact from 'arrow-keys-react';

class Gameplay extends Component {
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
      enemy: {
        x: 70,
        y: 0
      },
      request: ''
    }
    ArrowKeysReact.config({
      left: () => {
        this.setState({
          key: 'left',
          position: {
            x: this.state.position.x-10,
            y: this.state.position.y,
          }
        });
      },
      right: () => {
        this.setState({
          key: 'right',
          position: {
            x: this.state.position.x+10,
            y: this.state.position.y,
          }

        });
      },
      up: () => {
        this.setState({
          key: 'up',
          position: {
            x: this.state.position.x,
            y: this.state.position.y-10,
          }
        });
      },
      down: () => {
        this.setState({
          key: 'down',
          position: {
            x: this.state.position.x,
            y: this.state.position.y+10,
          }
        })
      }
    })
  }
  componentDidMount() {
    this.draw()
    this.setState({
      request: requestAnimationFrame(this.tick)
   });
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.state.request);
  }

  tick = () => {
    let { x, y } = this.state.enemy
    if (y < 400) {
      this.setState({
        request: requestAnimationFrame(this.tick),
        enemy: {
          x: x,
          y: y+5
        }
     });
    } else {
      console.log('cancelled')
      cancelAnimationFrame(this.state.request)
    }
  }

  componentDidUpdate() {
    this.draw()
    // console.log(this.state.key)
  }

  draw = () => {
    const { x, y } = this.state.position
    const enemy = this.state.enemy
    let canvasCtx = this.canvas.getContext('2d');
    // let drawVisual = requestAnimationFrame(this.draw);

    //redraw background
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    //draw player
    canvasCtx.fillStyle = 'rgb(255, 255, 255)';
    canvasCtx.fillRect(x, y, 20, 20);
    
    //enemy
    canvasCtx.fillStyle = 'pink';
    canvasCtx.arc(enemy.x,enemy.y,20,0,2*Math.PI)
    canvasCtx.fill()

    // requestAnimationFrame(() => {this.draw()});
    // window.requestAnimationFrame(this.draw)
  }

  render() {
    return (
      <div {...ArrowKeysReact.events} tabIndex="1">
        <canvas ref={(self) => {this.canvas = self}}
          style={{backgroundColor: 'black'}}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    )
  }
}

export default Gameplay