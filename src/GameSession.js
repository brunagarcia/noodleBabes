import React, { Component } from 'react';
import ArrowKeysReact from 'arrow-keys-react';

var circle = {
  'x': 100,
  'y': 0,
  'radius': 20,
  'sAngle': 0,
  'eAngle': 0,
  'fill': 'white'
}
let enemies = Array.from({ length: 10 }, () => Math.floor(Math.random() * 700));
console.log(enemies)
// let rand = new Random();
// let enemies = Array.from({length: 10}, () => rand.nextInt(100) );
let enemiesJSX = enemies.map((x) => {
  return {
    x: x,
    y: 0,
    radius: 10,
    angle: 0,
    angles: Math.PI * 2,
    dx: Math.floor(Math.random() * 2),
    dy: 1,
  }
})
console.log(enemiesJSX)
var dx = 1;
var dy = 1;


var animate = function (prop, val, duration) {
  // The calculations required for the step function
  var start = new Date().getTime();
  var end = start + duration;
  var current = circle[prop];
  var distance = val - current;

  var step = function () {
    // Get our current progres
    var timestamp = new Date().getTime();
    var progress = Math.min((duration - (end - timestamp)) / duration, 1);

    // Update the square's property
    circle[prop] = current + (distance * progress);

    // If the animation hasn't finished, repeat the step.
    if (progress < 1) requestAnimationFrame(step);
  };

  // Start the animation
  return step();
};


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
    let canvasCtx = this.canvas.getContext('2d');
    this.setState({ canvasCtx: canvasCtx })
    // let canvasCtx = this.canvas.getContext(‘2d’);
    this.draw()
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.state.request);
  }

  // tick = () => {
  //   let { x, y } = this.state.enemy
  //   if (y < 400) {
  //     this.setState({
  //       request: requestAnimationFrame(this.tick),
  //       enemy: {
  //         x: x,
  //         y: y+5
  //         // y: y
  //       }
  //    });
  //    this.draw()
  //   } else {
  //     console.log('cancelled')
  //     cancelAnimationFrame(this.state.request)
  //   }
  // }

  componentDidUpdate() {
    this.draw()
    // this.drawBackground()
    // console.log(this.state.key)
  }

  animateEnemies() {
    const enemy = this.state.enemy
    let ctx = this.canvas.getContext('2d');
    ctx.rect(circle.x, circle.y, 10, 10)
    ctx.fillStyle = circle.fill;
    // ctx.fill();
    animate('y', 500, 5000);
    // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // requestAnimationFrame(this.drawEnemy);
  }

  drawBall = () => {
    let ctx = this.canvas.getContext('2d');
    enemiesJSX.forEach(enemy => {
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#0095DD";
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
    // console.log(parseInt(circle.y))
    if (parseInt(circle.x) === x && parseInt(circle.y) === y) {
      console.log('you lose!')
    }

    this.drawBall()
    enemiesJSX.forEach(enemy => {
      enemy.x += enemy.dx;
      enemy.y += enemy.dy;
    })

    // canvasCtx.moveTo(enemy.x,enemy.y+7);
    // //enemy  
    // canvasCtx.fillStyle = 'pink';
    // canvasCtx.arc(enemy.x,enemy.y,20,0,2*Math.PI)

    requestAnimationFrame(() => { this.draw() });
    // window.requestAnimationFrame(this.draw)
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