import React, { Component } from 'react';

class Enemies extends Component {
  constructor() {
    super()

    this.state ={
      position:{
        x: 15,
        y: 20
      },

    }



    movement = () => {
      let id = setInterval(frame, 10);
      setInterval(() => { 
        this.setState({
          position:{
            x: this.state.position.x,
            y: this.state.position.y + 5
          }
        })
      }, 1000);
      }
    }


    draw = () => {
      let canvasCtx = this.canvas.getContext('2d');
      let drawVisual = requestAnimationFrame(this.draw);
   
      const { x, y } = this.state.position

      //draw player
      canvasCtx.fillStyle = 'rgb(255, 255, 255)';
      canvasCtx.fillCirc(this.state.position.x, this.state.position.y, 20, 20);

      canvasCtx.arc(x, y, 10, 0, 2 * Math.PI, false);
      canvasCtx.fillStyle = 'pink';
    
   
      window.requestAnimationFrame(this.draw);
      movement();

    }
  }
    render(){
      return(
        <div>
          <canvas ref={(self) => {this.canvas = self}}
            style={{backgroundColor: 'black'}}
            width={window.innerWidth}
            height={window.innerHeight}
          />

        </div>
      )
    }
}
export default Enemies;
