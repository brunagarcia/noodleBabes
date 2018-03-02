import React, { Component } from 'react';
import ArrowKeysReact from 'arrow-keys-react';

let enemies = Array.from({length: 10}, () => Math.floor(Math.random() * 700));
let enemiesJSX = enemies.map((x) => {
  let negative = Math.floor(Math.random()*2) == 1 ? 1 : -1
  return {
    x: x,
    y: 0,
    radius: 10,
    angle: 0,
    angles: Math.PI*2,
    dx: (Math.random() * 1)*negative,
    dy: 0.3,
  }
})
console.log(enemiesJSX)
var dx = 1;
var dy = 1;


class GameSession extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: {
        // x: window.innerWidth/2,
        // y: window.innerHeight/2,
        x: 200,
        y: 200,
      },
      key: this.props.keys,
      enemy: [{
        'x': 200,
        'y': 0,
        'width': 50,
        'height': 50,
        'fill': 'white'
      }],
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
    let canvasCtx = this.canvas.getContext('2d');
    this.setState({ canvasCtx: canvasCtx})
    this.draw()
    this.drawBalls
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.state.request);
  }

  componentDidUpdate() {
    this.draw()

  }

  // keyDown = (e) => {
  //   console.log("hi")
  //   if (e.keyCode === 37) {
  //     this.setState({
  //       keyLeft: true,
  //     })
  //   } else if (e.keyCode === 39) {
  //     this.setState({
  //       keyRight: true,
  //     })
  //   } else if (e.keyCode === 38) {
  //     this.setState({
  //       keyUp: true,
  //     })
  //   } else if (e.keyCode === 40) {
  //     this.setState({
  //       keyDown: true,
  //     })
  //   }  
  // }

  // keyUp = (e) => {
  //   this.setState({
  //     keyLeft: false,
  //     keyRight: false,
  //     keyUp: false,
  //     keyDown: false,
  //   })
  // }

  drawBall = () => {
    let ctx = this.canvas.getContext('2d');
    enemiesJSX.forEach(enemy => {
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI*2);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.closePath();
    })
  }

  draw = () => {
    const { x, y } = this.state.position
    const enemy = this.state.enemy
    let canvasCtx = this.canvas.getContext('2d');
    // let drawVisual = requestAnimationFrame(this.draw);

    //redraw background
    canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    canvasCtx.fill();

    //draw player
    canvasCtx.fillStyle = 'rgb(255, 255, 255)';
    canvasCtx.fillRect(x, y, 20, 20);
    canvasCtx.fill();


    this.drawBall()
    enemiesJSX.forEach(enemy => {
      if((  x >= enemy.x - 10 && x <= enemy.x + 10) && (y >= enemy.y - 10 && y <= enemy.y + 10)) {
        console.log('you lose!')
      }
      if(enemy.x > 700 || enemy.x < 0) {
        enemy.x = Math.floor(Math.random() * 700)
        enemy.y = 0
      } else {
        
        enemy.x += enemy.dx;
      }
      if(enemy.y > 700 || enemy.y < 0) {
        enemy.x = Math.floor(Math.random() * 700)
        enemy.y = 0
      } else {
        enemy.y += enemy.dy;
      }
    })

    // canvasCtx.moveTo(enemy.x,enemy.y+7);
    // //enemy  
    // canvasCtx.fillStyle = 'pink';
    // canvasCtx.arc(enemy.x,enemy.y,20,0,2*Math.PI)
    
    requestAnimationFrame(() => {this.draw()});
    // window.requestAnimationFrame(this.draw)
  }

  render() {
    return (
      <div onKeyDown={(e) => {this.keyDown}} onKeyUp={(e) => {this.keyUp}} {...ArrowKeysReact.events} tabIndex="1">
        <canvas ref={(self) => {this.canvas = self}}
          style={{backgroundColor: 'black'}}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    )
  }
}

export default GameSession;