import React, { useState, useEffect, createContext, useContext } from "react";
import { User, UserManager } from "oidc-client";
import { isObjectDefined } from "../core/object/ObjectCheck";
import { createLogger } from "../core/logger/create/CreateLogger";
import { checkAuthenticationRedirection } from './CheckAuthentication';
import {
    addAuthenticationChangedListener,
    getAuthUser,
    removeAuthenticationChangedListener,
} from "./CheckAuthentication";
import {
    checkAuthentication,
    loginUser,
    logoutUser,
} from "./CheckAuthentication";

interface IContextState {
    isAuthenticated: boolean;
    user: User | undefined;
    login: ({ url }: { url?: string }) => void;
    logout: () => void;
}

export const AuthenticationContext = createContext<IContextState>({
    isAuthenticated: false,
    user: undefined,
    login: _ => {},
    logout: () => {},
});
export const useAuthentication = () =>
    useContext<IContextState>(AuthenticationContext);
export const AuthenticationProvider = ({ children }: any) => {
    const logger = createLogger("AuthenticationProvider");
    const [user, setUser] = useState<User | undefined>(getAuthUser());
    const [isAuthenticated, setIsAuthenticated] = useState(
        isObjectDefined(user)
    );

    useEffect(() => {
        addAuthenticationChangedListener(onAuthChanged, "Auth0Provider");
        checkAuthenticationRedirection();
        checkAuthentication().catch(reason => {
            logger.error("Failed to check status", reason);
            if (reason.error === "user_token_expired") {
                loginUser(window.location.pathname);
            }
        });

        function onAuthChanged() {
            console.log("onAuthChanged");
            setUser(getAuthUser());
        }
        return () => {
            console.log("removeAuthenticationChangedListener");
            removeAuthenticationChangedListener(onAuthChanged, "Auth0Provider");
        };
    }, []);

    useEffect(() => {
        setIsAuthenticated(isObjectDefined(user));
    }, [user]);

    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated,
                user,
                login: ({ url }) => loginUser(url),
                logout: () => logoutUser(),
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
