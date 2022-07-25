import React, { Component } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";

class App extends Component {
  state = {
    cursor: {
      x: null,
      y: null
    },
    rectangles: []
  };
  handleClick = (e) => {
    const newRect = {
      width: 100,
      height: 100,
      fill: Konva.Util.getRandomColor(),
      x: e.target.getStage().getPointerPosition().x,
      y: e.target.getStage().getPointerPosition().y
    };
    const rectangles = [...this.state.rectangles, newRect];
    this.setState({ rectangles });
  };
  handleMouseMove = (e) => {
    var stage = e.currentTarget;
    stage = this.stageRef.getStage();
    stage = e.target.getStage();
    this.setState({
      cursor: stage.getPointerPosition()
    });
  };

  render() {
    const text = `cursor position : ${this.state.cursor.x}, ${this.state.cursor.y}`;
    return (
      <Stage
        onMouseDown={this.handleClick}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseMove={this.handleMouseMove}
        ref={(ref) => {
          this.stageRef = ref;
        }}
      >
        <Layer>
          <Text text={text} x={50} y={100} fontSize={20} />
          {this.state.rectangles.map((shape) => (
            <Rect {...shape} />
          ))}
        </Layer>
      </Stage>
    );
  }
}

render(<App />, document.getElementById("root"));
