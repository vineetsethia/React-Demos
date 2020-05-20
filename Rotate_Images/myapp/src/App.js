import React, { Component } from "react";
import "./index.css";

export default class App extends Component {
 
 
 constructor(props) {
    super(props);
    this.state = {
      rotation: 0,
      rotationStyle1: {transform: 'rotate(0deg)'},
      rotationStyle2: {transform: 'rotate(0deg)'},
      rotationStyle3: {transform: 'rotate(0deg)'},
      rotationStyle4: {transform: 'rotate(0deg)'},
    }
    this.rotateImage = this.rotateImage.bind(this);
  }

   rotateImage() {
    try {
       var angle = parseInt(this.refs.angle.value);
       if(isNaN(angle)){
          alert("Angle should be numeric. Please enter valid value to proceed further.");
       } else{
           console.log(angle);
           var newRotation = this.state.rotation + angle;
           if(newRotation >= 0){
              newRotation = newRotation % 360;
           } else{
              newRotation = Math.abs(newRotation);
              newRotation = newRotation % 360;
              newRotation = 360 - newRotation;
           }
           var rotationStr = "rotate("+ newRotation + "deg)";

           var rotationStyle1 = {transform: rotationStr, transformOrigin: "bottom right"};
           var rotationStyle2 = {transform: rotationStr, transformOrigin: "bottom left"};
           var rotationStyle3 = {transform: rotationStr, transformOrigin: "top right"};
           var rotationStyle4 = {transform: rotationStr, transformOrigin: "top left"};

          this.setState({
            rotation: newRotation,
            rotationStyle1: rotationStyle1,
            rotationStyle2: rotationStyle2,
            rotationStyle3: rotationStyle3,
            rotationStyle4: rotationStyle4,
          });
        }
    }
    catch(err) {
      alert("Something broke! please check console output.");
      console.log(err.message);
    }
     
  }

  render() {
    return (
      <div className="App">
          <div className="inputTag">
              Enter the angle: <input type="text" ref="angle" name="angle" id="angle"/>
              <button className="button" onClick={this.rotateImage}>Rotate</button>
          </div>
          <div className="container">
              <div className="row">
                <div className="column">
                    <img src="https://i.postimg.cc/FfpJBC0y/image-part-001.jpg" style={this.state.rotationStyle1} alt="Part1" />
                </div>
                <div className="column">
                    <img src="https://i.postimg.cc/QVwKwTKy/image-part-002.jpg" style={this.state.rotationStyle2} alt="Part2" />
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <img src="https://i.postimg.cc/njw9HsRM/image-part-003.jpg" style={this.state.rotationStyle3} alt="Part3" />
                </div>
                <div className="column">
                    <img src="https://i.postimg.cc/4nmhW5yc/image-part-004.jpg" style={this.state.rotationStyle4} alt="Part4" />
                </div>
            </div>
          </div>
      </div>
    );
  }
}