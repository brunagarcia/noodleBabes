import React, { Component } from 'react';

const maxEnemies = 20
const startingSpeedMax = 2
const increasingSpeedMax = 1.5

let keysPressed = []
let enemies = Array.from({length: maxEnemies}, () => Math.floor(Math.random() * 700));
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
  img.src = enemyImages[Math.floor(Math.random()*4)]
  console.log(img.src)
  return {
    x: x,
    y: 0,
    radius: 10,
    angle: 0,
    angles: Math.PI*2,
    dx: Math.floor((Math.random() * startingSpeedMax))*negative + 1*negative,
    dy: Math.floor((Math.random() * startingSpeedMax)) + 1,
    image:  img
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
        x: 220,
        y: 330,
      },
      key: this.props.keys,
      enemy: [{
        'x': 200,
        'y': 0,
        'width': 50,
        'height': 50,
        'fill': 'white'
      }],
      arrowDown: false,
      arrowUp: false,
      arrowLeft: false,
      arrowRight: false,
    }

  }
  componentDidMount() {
    // this.container.focus()
    let canvasCtx = this.canvas.getContext('2d');
    this.setState({ canvasCtx: canvasCtx})
    this.draw()
    this.audio.play();
  }

  componentWillUnmount() {
    cancelAnimationFrame(() => {this.draw()});
    // cancelAnimationFrame(this.state.request);
  }

  onKeyDown = (e) => {
    keysPressed[e.keyCode] = true
    const { x, y } = this.state.position
    const delta = 13
    //CONTROLS
    // let keyloop = () => {
      if (keysPressed[37]) { this.setState({position: {x: x-delta, y: y}}) } //Left
      if (keysPressed[39]) { this.setState({position: {x: x+delta, y: y}}) } //Right
      if (keysPressed[38]) { this.setState({position: {x: x, y: y-delta}}) } //Up
      if (keysPressed[40]) { this.setState({position: {x: x, y: y+delta}}) } //Down

      //RightUp
      if (keysPressed[39] && keysPressed[38]) { this.setState({position: {x: x+delta, y: y-delta}}) }
      //LeftUp
      if (keysPressed[37] && keysPressed[38]) { this.setState({position: {x: x-delta, y: y-delta}}) }
      //RightDown
      if (keysPressed[39] && keysPressed[40]) { this.setState({position: {x: x+delta, y: y+delta}}) }
      //LeftDown
      if (keysPressed[37] && keysPressed[40]) { this.setState({position: {x: x-delta, y: y+delta}}) }
      //LeftRight
      if (keysPressed[37] && keysPressed[39]) { this.setState({position: {x: x, y: y}}) }
      //UpDown
      if (keysPressed[38] && keysPressed[40]) { this.setState({position: {x: x, y: y}}) }
      
      //LeftUpRight
      if (keysPressed[37] && keysPressed[38] && keysPressed[39]) { this.setState({position: {x: x, y: y-delta}}) }
      //LeftDownRight
      if (keysPressed[37] && keysPressed[40] && keysPressed[39]) { this.setState({position: {x: x, y: y+delta}}) }
    // }
    // setInterval( keyloop, 100 );
    // e.preventDefault()
  }

  onKeyUp = (e) => {
    keysPressed[e.keyCode] = false
  }

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
    if (this.canvas) {
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
        if((  x >= enemy.x - 20 && x <= enemy.x + 20) && (y >= enemy.y - 30 && y <= enemy.y + 30)) {
          let negative = Math.floor(Math.random()*2) == 1 ? 1 : -1
          enemy.x = Math.floor(Math.random() * 700)
          enemy.y = 0
          enemy.dx += Math.floor((Math.random() * increasingSpeedMax))*negative
          enemy.dy += Math.floor((Math.random() * increasingSpeedMax))
          console.log('you lose!')
          this.props.lifeCounter()
        }
        if(enemy.x > 700 || enemy.x < -30) {
          let negative = Math.floor(Math.random()*2) == 1 ? 1 : -1
          enemy.x = Math.floor(Math.random() * 700)
          enemy.y = 0
          enemy.dx += Math.floor((Math.random() * increasingSpeedMax))*negative
          enemy.dy += Math.floor((Math.random() * increasingSpeedMax))
        } else {
          enemy.x += enemy.dx;
        }
        if(enemy.y > 700 || enemy.y < -20) {
          let negative = Math.floor(Math.random()*2) == 1 ? 1 : -1
          enemy.x = Math.floor(Math.random() * 700)
          enemy.y = 0
          enemy.dx += Math.floor((Math.random() * increasingSpeedMax))*negative
          enemy.dy += Math.floor((Math.random() * increasingSpeedMax))
        } else {
          enemy.y += enemy.dy;
        }
      })
      requestAnimationFrame(() => {this.draw()});
    }

  }

  render() {
    
    return (
      <div 
        tabIndex={-1}
        ref={(container) => {this.container = container}} 
        onKeyDown={this.onKeyDown} 
        onKeyUp={this.onKeyUp}
        style={{zIndex: 1}}
      >
        <canvas ref={(self) => {this.canvas = self}}
          style={{backgroundColor: 'black'}}
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <audio loop ref={audio => this.audio = audio}>
          <source src="playgame.mp3" />
        </audio>
      </div>
    )
  }
}

export default GameSession