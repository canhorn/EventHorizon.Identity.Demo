import { UserManagerSettings, UserManager, User } from "oidc-client";
import { IEventService } from "../core/event/api/IEventService";
import { StandardEventService } from "../core/event/model/StandardEventService";
import { ConsoleLogger } from "../core/logger/model/ConsoleLogger";
import { createLogger } from "../core/logger/create/CreateLogger";

const STATE: {
    setup: boolean;
    manager: UserManager | undefined;
    user: User | undefined;
} = {
    setup: false,
    manager: undefined,
    user: undefined,
};

const eventService: IEventService = new StandardEventService(
    new ConsoleLogger("Views.CheckAuthentication")
);

interface AuthenticationConfiguration extends UserManagerSettings {
    audience: string;
}

const validProtocolBasedUrlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
const validHostUrl = (url: string) =>
    !validProtocolBasedUrlRegex.test(url) ||
    new URL(url).host === window.location.host;

/**
 * This will return the currently authenticated user, undefined if no user authenticated.
 */
export const getAuthUser = () => STATE.user;

/**
 * Hook into internal Authentication state changes.
 * @param listener Function to call when Authentication internal state changed.
 * @param context The context this function should be called against.
 */
export const addAuthenticationChangedListener = (
    listener: () => void,
    context: any
) => {
    eventService.on({ key: "ON_USER_CHANGED" }, listener, context);
};

/**
 *
 * @param listener Function that was to be called when Authentication internal state changed.
 * @param context The context that was used when listener was registered.
 */
export const removeAuthenticationChangedListener = (
    listener: () => void,
    context: any
) => {
    eventService.on({ key: "ON_USER_CHANGED" }, listener, context);
};

/**
 * This function will validate the URL for an authentication redirect,
 * and will redirect the user back to the returnUrl in the redirection state.
 */
export const checkAuthenticationRedirection = (): Promise<void> => {
    const logger = createLogger("checkAuthenticationRedirection");
    if (!window.location.search.includes("code=")) {
        return new Promise<void>(_ => {});
    }
    return new UserManager({ response_mode: "query" })
        .signinRedirectCallback()
        .then(result => {
            let redirectUrl = "/";
            if (
                result.state &&
                result.state.returnUrl !== window.location.pathname
            ) {
                redirectUrl = result.state.returnUrl;
            }
            if (!validHostUrl(redirectUrl)) {
                logger.error("Invalid Redirect Url", {
                    redirectUrl,
                    result,
                });
                redirectUrl = "/";
            }
            window.location.href = redirectUrl;
        });
};

/**
 * This will go and validate the Authentication state of the user if they are logged in or not.
 */
export const checkAuthentication = async () => {
    if (STATE.setup) {
        return;
    }
    Object.assign(STATE, {
        setup: true,
    });
    const authConfig: AuthenticationConfiguration = await (await fetch(
        "/api/_authentication/configuration"
    )).json();
    
    const manager = new UserManager({
        ...authConfig,
        extraQueryParams: {
            audience: authConfig.audience,
        },
    });
    // Update User Account
    Object.assign(STATE, {
        manager,
    });

    const user = await manager.getUser();
    if (user == null) {
        throw {
            message: "User Account not found",
            error: "user_not_found",
        };
    }
    if (user.expired) {
        throw {
            message: "User account is Expired.",
            error: "user_token_expired",
        };
    }
    // Update User Account
    Object.assign(STATE, {
        user,
    });
    // Publish Event
    eventService.publish({
        type: {
            key: "ON_USER_CHANGED",
        },
    });
};

/**
 * This will initiate a login against the Authentication State.
 * @param url The redirection url that should be used after successful login.
 */
export const loginUser = (url?: string) => {
    const { manager } = STATE;
    if (manager) {
        manager.signinRedirect({ state: { returnUrl: url } });
    }
};

/**
 * This will initiate a signout request.
 */
export const logoutUser = () => {
    const { manager } = STATE;
    if (manager) {
        manager.signoutRedirect().catch(reason => (window.location.href = "/"));
    }
};
