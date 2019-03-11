import React from 'react';
import { render } from 'react-dom';
import Web3Provider, { Connectors } from "web3-react";

import 'bootstrap/dist/css/bootstrap.css';
import MainConnedtors from './utils/setted-connectors'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


render(
    <Web3Provider connectors={MainConnedtors} libraryName="web3.js">
      <App/>
    </Web3Provider>
    , document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
