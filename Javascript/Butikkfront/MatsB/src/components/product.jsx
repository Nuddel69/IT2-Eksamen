import React, { Component } from "react";

export default class Product extends Component {
  render() {
    return (
      <div className="grid__item grid-product small--one-half medium-up--one-fifth grid-product__has-quick-shop aos-init aos-animate">
        <div className="grid-product__content">
          <a className="grid-product__link" href="">
            <div className="grid-product__image-mask"></div>
            <div className="grid-product__meta"></div>
          </a>
        </div>
      </div>
    );
  }
}
