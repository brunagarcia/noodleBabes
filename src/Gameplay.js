import React, { Component } from 'react';
import {Level, TileMap, Body, Sprite} from 'react-game-kit';
import Player from './Player'

class Gameplay extends Component {
  constructor() {
    super()
    this.state = {
      position: {
        x: 0,
        y: 0
      }

    }
  }

  updatePosition = (x, y) => {
    this.setState({
      position: {
        x,
        y
      }
    })
  }

  render() {
    return (
      <div>
        <TileMap
          src=""
          tileSize={128}
          columns={20}
          rows={10}
          layers={[
            [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            ],
          ]}
        />
        <Player position={this.state.position} />
      </div>
    )
  }
}

export default Gameplay