import React from "react";
import { translation } from "../core/i18n/I18nServices";
import { useAuthentication } from "./AuthenticationProvider";

const LoginStatus: React.FC = () => {
    const { isAuthenticated, login, logout } = useAuthentication();
    const loginUser = (event: React.MouseEvent) => {
        event.preventDefault();
        login({ url: window.location.pathname });
    };
    const logoutUser = (event: React.MouseEvent) => {
        event.preventDefault();
        logout();
    };
    if (!isAuthenticated) {
        return (
            <a className="login-status" href="login" onClick={loginUser}>
                {translation("login")}
            </a>
        );
    }

    return (
        <a className="login-status" href="logout" onClick={logoutUser}>
            {translation("logout")}
        </a>
    );
};

export default LoginStatus;
