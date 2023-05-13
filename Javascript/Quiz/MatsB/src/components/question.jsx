import React, { Component } from "react";

export default class Question extends Component {
  state = {
    triggered: false,
    options: this.props.options,
    correct: this.props.correct,
    id: this.props.id,
  };

  handleOption = (chosen) => {
    var options = this.state.options;
    if (!this.state.triggered) {
      if (chosen == options[this.state.correct - 1]) {
        document.getElementById(chosen + this.state.id).className +=
          " is-success";
        console.log("Riktig!");
        this.props.onScore(this.props.score);
      } else {
        document.getElementById(chosen + this.state.id).className +=
          " is-danger";
        document.getElementById(
          this.props.options[this.state.correct - 1] + this.state.id
        ).className += " is-success is-light is-outlined";
      }
      this.setState({ triggered: true });
    }
  };

  render() {
    var questionClasses =
      "my-5 has-text-centered is-family-primary box is-radiusless";
    var btnClasses = "button mx-1 mt-2";
    var titleClasses = "title is-5";

    return (
      <div className={questionClasses}>
        <span className={titleClasses}>{this.props.children}</span>
        <p>
          {this.props.category} ({this.props.score}p)
        </p>
        <br />
        {this.state.options.map((option) => (
          <button
            className={btnClasses}
            onClick={() => this.handleOption(option)}
            key={option}
            id={option + this.state.id}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }
}
