import React, { Component } from 'react';
import ArrowKeysReact from 'arrow-keys-react';

let enemies = Array.from({length: 10}, () => Math.floor(Math.random() * 700));
const player = new Image()
player.src = 'anime-girl.svg'
const enemyImages = [
  'boiled-egg.svg',
  'naruto.svg',
  'naruto2.svg',
  'ramenbowl4.png',
  'ramenbowl5.svg',
]
let decreaseSpeed = 1
let enemiesJSX = enemies.map((x) => {
  let negative = Math.floor(Math.random()*2) == 1 ? 1 : -1
  let img = new Image()
  img.src = enemyImages[Math.floor(Math.random()*5)]
  return {
    x: x,
    y: 0,
    radius: 10,
    angle: 0,
    angles: Math.PI*2,
    dx: (Math.random() * 1)*negative,
    dy: 0.2,
    image:  img
  }
})
console.log(enemiesJSX)
var dx = 1;
var dy = 1;

let imageObj = new Image();
imageObj.src="ramenbowl4.png"

let keyPressed = false

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
      }]
    }
    ArrowKeysReact.config({
      left: () => {
        keyPressed = true
        this.setState({
          key: 'left',
          position: {
            x: this.state.position.x-5,
            y: this.state.position.y,
          }
        });
      },
      right: () => {
        keyPressed = true

        this.setState({
          key: 'right',
          position: {
            x: this.state.position.x+5,
            y: this.state.position.y,
          }

        });
      },
      up: () => {
        keyPressed = true

        this.setState({
          key: 'up',
          position: {
            x: this.state.position.x,
            y: this.state.position.y-5,
          }
        });
      },
      down: () => {
        keyPressed = true

        this.setState({
          key: 'down',
          position: {
            x: this.state.position.x,
            y: this.state.position.y+5,
          }
        })
      },
      notpressed: () => {
        this.setState({
          key: '',
        })
      },
    })
  }
  componentDidMount() {
    let canvasCtx = this.canvas.getContext('2d');
    this.setState({ canvasCtx: canvasCtx})
    this.draw()
    
    document.body.addEventListener('keyup', function(e) {
      keyPressed = false
      // console.log(keyPressed)
    })
  }

  componentWillUnmount() {
    cancelAnimationFrame(() => {this.draw()});
    // cancelAnimationFrame(this.state.request);
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
      ctx.drawImage(enemy.image,enemy.x,enemy.y,40,40)
    })
  }

  draw = () => {
    // console.log(this.props.gameOver)
    const { x, y } = this.state.position
    const enemy = this.state.enemy
    let canvasCtx = this.canvas.getContext('2d');

    //redraw background
    canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    canvasCtx.fill();

    //draw player
    canvasCtx.drawImage(player,x,y,40,40)
    // canvasCtx.fillStyle = 'rgb(255, 255, 255)';
    // canvasCtx.fillRect(x, y, 20, 20);
    // canvasCtx.fill();

    this.drawBall()
   
    enemiesJSX.forEach(enemy => {
      if((  x >= enemy.x - 20 && x <= enemy.x + 20) && (y >= enemy.y - 20 && y <= enemy.y + 20)) {
        console.log('you lose!')
        this.props.lifeCounter()
        let negative = Math.floor(Math.random()*2) == 1 ? 1 : -1
        enemy.x = Math.floor(Math.random() * 700)
        enemy.y = 0
        enemy.dx = (Math.random() * 1)*negative/2
        enemy.dy = 0.05
      }
      if(enemy.x > 700 || enemy.x < 0) {
        let negative = Math.floor(Math.random()*2) == 1 ? 1 : -1
        enemy.x = Math.floor(Math.random() * 700)
        enemy.y = 0
        enemy.dx = (Math.random() * 1)*negative/2
        enemy.dy = 0.2
      } else {
        // if(keyPressed === false) {
          enemy.x += enemy.dx;
          decreaseSpeed += 0.1
        // }
      }
      if(enemy.y > 700 || enemy.y < 0) {
        let negative = Math.floor(Math.random()*2) == 1 ? 1 : -1
        enemy.x = Math.floor(Math.random() * 700)
        enemy.y = 0
        enemy.dx = (Math.random() * 1)*negative/2
        enemy.dy = 0.2
      } else {
        // if(keyPressed === false) {
          enemy.y += enemy.dy;
          decreaseSpeed += 0.0001
        // }
      }
    })
    requestAnimationFrame(() => {this.draw()});
    // if(!this.props.gameOver) {
    //   requestAnimationFrame(() => {this.draw()});
    // } else {
    //   cancelAnimationFrame(() => {this.draw()});
    // }
    // window.requestAnimationFrame(this.draw)
  }

  render() {
    return (
      <div {...ArrowKeysReact.events}  tabIndex="1">
        <canvas ref={(self) => {this.canvas = self}}
          style={{backgroundColor: 'black'}}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    )
  }
}

export default GameSession