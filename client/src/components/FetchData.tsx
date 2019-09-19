import React, { useEffect, useState, useLayoutEffect } from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { User } from "oidc-client";
import { useAuthentication } from "../auth/AuthenticationProvider";
import {
    isObjectDefined,
    isObjectNotDefined,
} from "../core/object/ObjectCheck";

interface IProps {
    user: User | undefined;
}

const FetchData: React.FC<IProps> = () => {
    const { user } = useAuthentication();
    const [forecasts, setForecasts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (isObjectNotDefined(user)) {
            return;
        }
        fetchProductsFromBackend(user)
            .then(result => setForecasts(result))
            .then(_ => setLoading(false))
            .catch(reason => console.log("ERROR", reason));
    }, [user]);

    return (
        <div className="App">
            <pre>{JSON.stringify({ loading, forecasts }, null, 4)}</pre>
        </div>
    );
};

const fetchProductsFromBackend = async (user: User) => {
    const response = await fetch("weatherforecast", {
        headers: {
            Authorization: `Bearer ${user.access_token}`,
        },
    });
    const data = await response.json();
    return data;
};

export default FetchData;
