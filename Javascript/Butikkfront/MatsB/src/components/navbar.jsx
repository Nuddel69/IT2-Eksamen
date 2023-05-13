import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const NavLink = styled(Link)`
  color: #000000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`;

class NavItem extends Component {
  render() {
    return (
      <div className="navbar-item is-size-6">
        <NavLink to={this.props.path}>{this.props.children}</NavLink>
      </div>
    );
  }
}

export default class Navbar extends Component {
  state = {
    categories: [
      {
        name: "Dakimakura",
        path: "/dakimakura",
        id: 0,
      },
      {
        name: "Kigurumi",
        path: "/kigurumi",
        id: 1,
      },
      {
        name: "Figurines",
        path: "/figurines",
        id: 2,
      },
      {
        name: "Doujinshi",
        path: "/doujinshi",
        id: 3,
      },
      {
        name: "Sukis",
        path: "/sukis",
        id: 4,
      },
    ],
  };
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-brand">
            <div className="navbar-item title is-2">
              <NavLink to="/home">Downbad Inc.</NavLink>
            </div>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              <NavItem path="/home">Home</NavItem>
              <NavItem path="/featured">Featured</NavItem>

              <div className="navbar-item has-dropdown is-hoverable is-size-5">
                <a className="navbar-link is-size-6"> Categories </a>

                <div className="navbar-dropdown">
                  {this.state.categories.map((category) => (
                    <NavItem
                      key={category.id}
                      path={"/categories" + category.path}
                    >
                      {category.name}
                    </NavItem>
                  ))}
                </div>
              </div>

              <NavItem path="/contact">Contact</NavItem>
              <NavItem path="/about">About</NavItem>
              <NavItem path="/product">[TEMP] Products</NavItem>
            </div>

            <div className="navbar-end">
              <div className="navbar-item has-dropdown is-hoverable is-size-5">
                <a className="navbar-link"> Profile </a>
                <div className="navbar-dropdown">
                  <NavItem path="/orders">Order History</NavItem>
                  <NavItem path="/payment">Card and payment</NavItem>
                </div>
              </div>
              <a className="navbar-item">
                <NavItem path="/cart">
                  <span className="icon">
                    <FontAwesomeIcon icon="cart-shopping" />
                  </span>
                  <br />
                  Shopping Cart
                </NavItem>
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
