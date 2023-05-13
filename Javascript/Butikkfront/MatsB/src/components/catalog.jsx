import React, { Component } from "react";
import Product from "./product";

export default class Catalog extends Component {
  renderTile = () => {
    return (
      <div class="columns">
        <div class="column is-one-third">
          <Product />
        </div>
      </div>
    );
  };
  render() {
    let tiles = [];
    for (let i = 0; i < 3; i++) {
      tiles.push(this.renderTile());
    }
    return tiles;
  }
}
