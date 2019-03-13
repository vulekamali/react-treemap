import React, { Component } from 'react';
import data from "./data/test.json";

class TreeMap extends Component {
  constructor(props) {
    super(props);
    this.treemap = React.createRef();
    this.event = props.event;
    this.state = { data }
  }

  render() {
    return (
      <div id="viz" ref={this.treemap} style={{ height: "500px", width: "1000px" }}></div>
    )
  }

  initTreemap(data, event) {
    var visualization = window.d3plus.viz()
      .container("#viz")  
      .data(data)  
      .type("tree_map")   
      .id("name")         
      .size("budget")      
      .mouse({
        click: this.event
      })       // passing only Boolean value will toggle all mouse events
      .draw() 
  }

  componentDidMount() {
    this.initTreemap(this.state.data,this.event);
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null }
    this.eventHandler = this.eventHandler.bind(this);
  }
  render() {
    return (
      <div>
        <TreeMap event={this.eventHandler}/>
        <p>{JSON.stringify(this.state.selected)}</p>
      </div>
    );
  }

  eventHandler(e) {
    const { name, budget } = e;
    this.setState({ selected: { name, budget }});
  }
}

export default App;
