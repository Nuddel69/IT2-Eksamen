import React, { Component } from "react";
import Question from "./question";

export default class Questions extends Component {
  state = {
    score: 0,
    maxScore: 4,
    questions: [
      {
        id: 1,
        score: 1,
        question:
          "Hva kaller vi systemet som behandler alt som endres i et spill?",
        options: [
          "Event Handler",
          "InputControl",
          "Game Loop",
          "Renderer",
          "Class",
          "Canvas",
        ],
        correct: 1,
        category: "Spill programmering",
      },
      {
        id: 2,
        score: 1,
        question: "Hva er git?",
        options: [
          "Et fancy zip-arkiv",
          "Et versjonskontrollsystem",
          "En filopplastningsplatform",
          "Autofullføring av kode",
          "Et nettforum",
          "Et programmeringsspråk",
        ],
        correct: 2,
        category: "Planlegging og dokumentasjon",
      },
      {
        id: 3,
        score: 1,
        question: "Hva er hovedidéene bak objektorientert kode?",
        options: [
          "Klasser og objekter",
          "Hurtigere kjøretid",
          "Abstraksjon, polymorfisme, arv og innkapsling",
          "Abstraksjon, hurtighet, lesbarhet og polymorfisme",
          "Innkapsling og klasser",
          "Gjenbrukbarhet",
        ],
        correct: 3,
        category: "Objekt orientert programmering",
      },
      {
        id: 4,
        score: 1,
        question: "Hva kjennetegner cephalopoder av klassen coleoidea?",
        options: [
          "De har ti lemmer",
          "De er virvelløse dyr uten skjelett",
          "De justerer sin egen oppdrift",
          "De har åtte armer og to tentakler",
          "Celler kalt nematocyster lar dem skifte farge",
          "De har naturens eneste biologiske jet-motor",
        ],
        correct: 2,
        category: "Valgfri kategori: Blekkspruter",
      },
    ],
  };

  graderTilRadianer = (grader) => {
    return (Math.PI * (grader - 90)) / 180;
  };

  handleScore = (points) => {
    console.log("Event raised");
    this.setState({ score: this.state.score + points });
  };
  render() {
    var classes = "column is-one-third";
    return (
      <div className="columns">
        <div className={classes}></div>
        <div className={classes}>
          {this.state.questions.map((question) => (
            <Question
              score={question.score}
              onScore={this.handleScore}
              category={question.category}
              key={question.id}
              id={question.id}
              options={question.options}
              correct={question.correct}
            >
              {question.question}
            </Question>
          ))}
          <div>
            <h1 className="title is-3">
              Poeng: {this.state.score} av {this.state.maxScore}
            </h1>
            <canvas id="chart" width="300" height="300"></canvas>
          </div>
        </div>
      </div>
    );
  }
}
