import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./main";
import Start from "./start";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      username: "maticpeco",
      actions: {
        FNT: [
          {
            action: "buy",
            actionPrice: 10,
            actionUnits: 3
          }
        ],
        G2G: [
          {
            action: "buy",
            actionPrice: 20,
            actionUnits: 5
          }
        ]
      },
      ownedStock: {},
      stockValue: 0
    };
    this.calcStockValue = this.calcStockValue.bind(this);
    this.calcOwnedStock = this.calcOwnedStock.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    this.calcOwnedStock();
  }

  calcOwnedStock() {
    let ownStock = {};
    const actions = this.state.actions;
    const stockKeys = Object.keys(actions);

    for (let i = 0; i < stockKeys.length; i++) {
      const actions_i = actions[stockKeys[i]];
      ownStock[stockKeys[i]] = 0;
      for (let j = 0; j < actions_i.length; j++) {
        if (actions_i[j].action === "buy") {
          ownStock[stockKeys[i]] += actions_i[j].actionUnits;
        } else {
          ownStock[stockKeys[i]] -= actions_i[j].actionUnits;
        }
      }
    }
    this.setState(
      {
        ownedStock: ownStock
      },
      () => this.calcStockValue()
    );
  }

  calcStockValue() {
    const stocks = this.state.ownedStock;
    const stockKeys = Object.keys(stocks);
    let value = 0;

    for (let i = 0; i < stockKeys.length; i++) {
      value += 10 * stocks[stockKeys[i]];
    }
    this.setState({
      stockValue: value
    });
  }

  onLogin(uname) {
    this.setState({
      authenticated: true,
      username: uname
    });
  }

  render() {
    if (this.state.authenticated) {
      return <Main data={this.state} />;
    } else {
      return <Start onLogin={this.onLogin} />;
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
