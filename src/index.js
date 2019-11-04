import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Navbar from "./navbar.js"

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: true,
            username: "maticpeco",
            actions: {
                "FNT": [{
                    action: "buy",
                    actionPrice: 10,
                    actionUnits: 3
                }],
                "G2G": [{
                    action: "buy",
                    actionPrice: 20,
                    actionUnits: 5
                }]},
            ownedStock: {},
            stockValue: 0
        };
        this.calcStockValue = this.calcStockValue.bind(this);
        this.calcOwnedStock = this.calcOwnedStock.bind(this);
      };

    componentDidMount() {
        this.calcOwnedStock();
        this.calcStockValue();
    };
    
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
        this.state.ownedStock = ownStock;
    }

    calcStockValue() {
        const stocks = this.state.ownedStock;
        const stockKeys = Object.keys(stocks);
        let value = 0;

        for (let i = 0; i < stockKeys.length; i++) {
            value += 10*stocks[stockKeys[i]];
            console.log(value)
        }
        this.setState({
            stockValue: value
        })
    }

    render() {
      return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xs-2">
                </div>
                <div className="col-xs-8" id="main">
                    <Navbar dataFromParent={this.state} className="text-right"/>
                </div>
                <div className="col-xs-2">
                </div>
            </div>
        </div>
      );
    };
  };

ReactDOM.render(<App />, document.getElementById('root'))