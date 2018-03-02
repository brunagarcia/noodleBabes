import React, { Component } from 'react';
import { Body, Sprite} from 'react-game-kit';
import Matter from 'matter-js'
const keys = []

  // left = 37
  // up = 38
  // right = 39
  // down = 40}


class Player extends Component {
  constructor() {
    super()
  }

  // move = (body, x) => {
  //   Matter.Body.setVelocity(body, { x, y: 0 });
  // };

  // update = () => {
  //   const { body } = this.body;
  //   // if (keys.isDown(keys.LEFT)) {
  //   //   this.move(body, -5);
  //   // } else if (keys.isDown(keys.RIGHT)) {
  //   //   this.move(body, 5);
  //   // }
  // };
  
  // componentDidMount() {
  //   Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  // }

  // componentWillUnmount() {
  //   Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  // }


  render() {
    return (
      <div >
        <Body
          args={[0, 200, 50, 50, { inertia: Infinity }]}
          ref={(b) => { this.body = b; }}
        >
          <Sprite
            repeat={false}
            src="player.png"
            scale={this.context.scale * 5}
            state={0}
            steps={[0]}
          />
        </Body>
      </div>
    )
  }
}

export default Player