import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { setupCoreServices } from "./core/SetupCoreServices";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { AuthenticationProvider } from './auth/AuthenticationProvider';

// Use this to setup some standard Core Servers.
setupCoreServices();
ReactDOM.render(
    <AuthenticationProvider>
        <App />
    </AuthenticationProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
