# EventHorizon Identity Demo

This project is an Identity Authorization PoC application, the main feature is testing the way the application can handle two different types of Authentication validation. The application supports two types of authorization, IdentityServer4 and Auth0/JwtBearer.

The front end of the application is a SPA created using Create React App, this application uses the "oidc-client" package to handle the authentication flows for both Auth0 and IdentityServer4.

You can checkout the "client/src/auth/CheckAuthentication.ts" for implementation details of how this is achieved.


## Configuration Examples 

Create an "appsettings.*.json" for your custom settings, below are some examples of configuration that can be used in the "Auth" configuration property.


This is an example the configuration used for Auth0:
~~~ json
{
    "Authority": "[[AUTH0:Authority]]",
    "Audience": "[[AUTH0:Audience]]",
    "ClientId": "[[AUTH0:ClientId]]",
    "RedirectUri": "https://localhost:5001/signin-oidc",
    "PostLogoutRedirectUri": "https://localhost:5001/"
}
~~~

This is an example the configuration used for IdentityServer4:
~~~ json
{
    "Authority": "[[IS4:Authority]]",
    "ClientId": "[[IS4:ClientId]]",
    "RedirectUri": "https://localhost:5001/signin-oidc",
    "PostLogoutRedirectUri": "https://localhost:5001/"
}
~~~