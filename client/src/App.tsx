import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { useAuthentication } from "./auth/AuthenticationProvider";
import LoginStatus from "./auth/LoginStatus";
import FetchData from "./components/FetchData";

const App: React.FC = () => {
    const { isAuthenticated, user } = useAuthentication();

    useEffect(() => console.log("hi"), [user]);

    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header"></header>
                <article>
                    <LoginStatus />
                    <div>Authenticated: {`${isAuthenticated}`}</div>
                    <Switch>
                        {/* <Route
                            path="/signin-oidc"
                            exact={true}
                            component={SignIn}
                        /> */}
                    </Switch>
                    <FetchData user={user} />
                    <pre>{JSON.stringify(user, null, 4)}</pre>
                </article>
            </div>
        </BrowserRouter>
    );
};

export default App;
