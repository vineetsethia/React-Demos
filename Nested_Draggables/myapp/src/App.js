import React, { Component } from "react";
import Draggable from "react-draggable";
import "./index.css";

class MyDraggable extends Component{

  constructor (props){
    super(props);
    this.state = {defaultPosition: ""};
  }

  onStop = (e, data) => {
    console.log("In onStop");
    console.log(data.node);
   
    var heightStr = data.node.style.height;
    var heightSubStr= heightStr.substring(0, heightStr.indexOf("px"));
    if(heightSubStr===""){
      heightSubStr="100";
    }
    var gp = (data.x).toString() + "," +(data.y).toString();

    console.log("gp = " + gp + " height = "+ heightSubStr);

    var map1 = new Map();
    if(this.state.defaultPosition!==""){
      map1 = this.state.defaultPosition;
    }
    map1.set(heightSubStr, gp); 
    this.setState({ defaultPosition: map1 });

    console.log(map1);
    console.log("outside onStop");
  };

componentWillMount = () => {
  console.log("In componentWillMount");
  var map1 = new Map();
  var gp = "0" + "," +"0";
  map1.set("100", gp);
  console.log(map1);
  this.setState({ defaultPosition: map1 });
  console.log("outside componentWillMount");
}

render = () => {

      const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
      
      const mystyle = {
        width: "180px",
        padding: "10px",
        border: "1px solid #999",
        margin: "2",
       };
      
      var k = this.props.componentNumber;
      var str = "";
      
      var map1 = new Map();
      var dataX;
      var dataY;
      var data1X;
      var data1Y;
      var gp;

      if(this.state.defaultPosition!==""){
        map1 = this.state.defaultPosition;
      }
      console.log("In render");
      console.log(map1);

      if(k===1){ 
        str = <Draggable defaultPosition={{x: 0, y: 0}}  bounds={{right: 300, bottom: 300, top:0, left:0}} handle=".drag1" {...dragHandlers}>
          <div className="box2 no-cursor">
            <p className="drag1" style={mystyle}>
              <center>Title Child 1</center>
            </p>
            <textarea style={mystyle} name="comment" placeholder="Enter text...">
            </textarea>
          </div>
        </Draggable>;
      } else{

          var i = 2;
          var handleStr = ".drag";
          var handleId = "drag";
          var titleString = "Title Child ";
          var sizeString = "";
          var boundString = "";
          var size = "100";
          var sizeValue;
          for(i=2;i<=k;i++){
            
             var sizeVal= parseInt(size) + 400;
             size = sizeVal.toString();
             console.log("size = " + size);

            var data2X;
            var data2Y;

            if(i!==k){
               sizeValue = map1.get(size);
               data2X = sizeValue.substring(0, sizeValue.indexOf(","));
               data2Y = sizeValue.substring(sizeValue.indexOf(",") +1 , sizeValue.length);
            } else{
                console.log("This is the topmost parent");
                console.log(map1);
                var sizeValue3 = parseInt(size) - 400;
                var sizeValue2 = sizeValue3.toString();
                sizeValue = map1.get(sizeValue2);
                data2X = sizeValue.substring(0, sizeValue.indexOf(","));
                data2Y = sizeValue.substring(sizeValue.indexOf(",") +1 , sizeValue.length);
            }
            dataX = parseInt(data2X);
            dataY = parseInt(data2Y);
            gp = dataX.toString() + "," +dataY.toString();
            map1.set(size, gp);
            console.log(gp);
            console.log(map1);

            if(i===k){
              boundString = "";
            } else{
              boundString = "parent";
            }
            
            if(i===2){
                 sizeValue = map1.get("100");
                 console.log(map1);
                 data2X= sizeValue.substring(0, sizeValue.indexOf(","));
                 data2Y = sizeValue.substring(sizeValue.indexOf(",") +1 , sizeValue.length);
                 data1X = parseInt(data2X);
                 data1Y = parseInt(data2Y);
                 sizeString = size+"px";
               
               if(k===2){  
               str = <Draggable defaultPosition={{x: dataX, y: dataY}} bounds={boundString} handle={handleStr.concat(i)} {...dragHandlers}>
                                  <div style={{height: sizeString, width: sizeString, position: 'relative'}}>
                                    <p className={handleId.concat(i)} style={{border: "1px solid #999", padding: "10px"}}>
                                          <center>{titleString.concat(i)}</center>
                                    </p>
                                    <div className="box" style={{height: sizeString, width: sizeString, position: 'relative'}}>  
                                      <Draggable defaultPosition={{x: data1X, y: data1Y}} handle=".drag1" bounds="parent" {...dragHandlers}>
                                        <div className="box2 no-cursor">
                                          <p className="drag1" style={mystyle}>
                                            <center>Title Child 1</center>
                                          </p>
                                          <textarea style={mystyle} name="comment" placeholder="Enter text...">
                                          </textarea>
                                        </div>
                                      </Draggable>
                                    </div>
                                  </div>
                       </Draggable>;
                } else{
                  var sizeNewString = (parseInt(size) + 400).toString()+"px";
                  str = <div className="box" style={{height: sizeNewString, width: sizeNewString, position: 'relative'}}>  
                                    <Draggable defaultPosition={{x: dataX, y: dataY}} bounds={boundString} handle={handleStr.concat(i)} {...dragHandlers}>
                                  <div style={{height: sizeString, width: sizeString, position: 'relative'}}>
                                    <p className={handleId.concat(i)} style={{border: "1px solid #999", padding: "10px"}}>
                                          <center>{titleString.concat(i)}</center>
                                    </p>
                                    <div className="box" style={{height: sizeString, width: sizeString, position: 'relative'}}>  
                                      <Draggable defaultPosition={{x: data1X, y: data1Y}} handle=".drag1" bounds="parent" {...dragHandlers}>
                                        <div className="box2 no-cursor">
                                          <p className="drag1" style={mystyle}>
                                            <center>Title Child 1</center>
                                          </p>
                                          <textarea style={mystyle} name="comment" placeholder="Enter text...">
                                          </textarea>
                                        </div>
                                      </Draggable>
                                    </div>
                                  </div>
                              </Draggable>    
                                  </div>;
                }
              
              } else if(k===3){
                sizeString = size + "px";
                str = <Draggable defaultPosition={{x: dataX, y: dataY}} bounds={boundString} handle={handleStr.concat(i)} {...dragHandlers}>
                                <div style={{height: sizeString, width: sizeString, position: 'relative'}}>
                                    <p className={handleId.concat(i)} style={{border: "1px solid #999", padding: "10px"}}>
                                          <center>{titleString.concat(i)}</center>
                                    </p>
                                  
                                        {str}
                                </div>

                       </Draggable>;

              } else{
                sizeString = size + "px";
                str = <Draggable defaultPosition={{x: dataX, y: dataY}} bounds={boundString} handle={handleStr.concat(i)} {...dragHandlers}>
                                <div style={{height: sizeString, width: sizeString, position: 'relative'}}>
                                    <p className={handleId.concat(i)} style={{border: "1px solid #999", padding: "10px"}}>
                                          <center>{titleString.concat(i)}</center>
                                    </p>
                                  <div className="box" style={{height: sizeString, width: sizeString, position: 'relative'}}>  
                                        {str}
                                  </div>
                                </div>

                       </Draggable>;
              }
            }
        }
      return (str);
    };
}


export default class App extends Component {
 
  shoot(){
    var value2 = this.state.val2 + 1;
    this.setState({val2: value2});      
    return;
  }

  constructor (props){
    super(props);
    this.state = {val2: 1};
    this.shoot = this.shoot.bind(this);
  }

  render = () => {
    return (
          <div className="container">
             <button className="mystyle2" type="button" onClick={this.shoot}>Add Parent!</button> 
             <div>
                 <MyDraggable componentNumber={this.state.val2} />
              </div>
          </div>
        );
  };
}