import React, { Component } from "react";
import { render } from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

class App extends Component {
  state = {
    layoutName: "default",
    inputName: "input1",
    input: {},
    disableCaretPositioning: true
  };

  onChangeAll = inputObj => {
    this.setState({
      input: inputObj
    });

    console.log("Input changed", inputObj);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = event => {
    let inputVal = event.target.value;

    let updatedInputObj = {
      ...this.state.input,
      [this.state.inputName]: inputVal
    };

    this.setState(
      {
        input: updatedInputObj
      },
      () => {
        this.keyboard.setInput(inputVal);
      }
    );
  };

  setActiveInput = inputName => {
    if (inputName === "input1") {
      this.setState({ disableCaretPositioning: true });
    } else {
      this.setState({ disableCaretPositioning: false });
    }
    this.setState(
      {
        inputName: inputName
      },
      () => {
        console.log("Active input", inputName);
      }
    );
  };

  render() {
    return (
      <div>
        <input
          onFocus={() => this.setActiveInput("input1")}
          value={this.state.input["input1"] || ""}
          placeholder={"Input 1"}
          onChange={e => this.onChangeInput(e)}
        />
        <input
          onFocus={() => this.setActiveInput("input2")}
          value={this.state.input["input2"] || ""}
          placeholder={"Input 2"}
          onChange={e => this.onChangeInput(e)}
        />
        <Keyboard
          ref={r => (this.keyboard = r)}
          inputName={this.state.inputName}
          layoutName={this.state.layoutName}
          onChangeAll={inputObj => this.onChangeAll(inputObj)}
          onKeyPress={button => this.onKeyPress(button)}
          disableCaretPositioning={this.state.disableCaretPositioning}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
