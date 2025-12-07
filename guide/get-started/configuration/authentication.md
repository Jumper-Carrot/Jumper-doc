# 🔑 Authentication

Jumper secures access to its APIs and user interfaces using a robust **JWT (JSON Web Token)**-based authentication system.

By default, users must authenticate by providing a valid email and password authenticate.

Jumper also supports OAuth 2.0 / OpenID Connect (OIDC) authentication through external identity providers (e.g., Keycloak, Azure AD, Google, Okta, etc.), for better enterprise integration.

This page details the configuration for JWT and OAuth2/OIDC.

## JSON Web Token (JWT) Configuration

You can customize the lifespan of the JWT tokens by modifying the following environment variables in the Carrot server's `.env` file:

| Environment Variable | Description | Default Value |
| :--- | :--- | :--- |
| `JWT_ACCESS_TOKEN_LIFETIME` | The lifespan of the JWT Access Token (in minutes). | `15` |
| `JWT_REFRESH_TOKEN_LIFETIME` | The lifespan of the JWT Refresh Token (in minutes). | `43200` |

## OAuth 2.0 / OpenID Connect (OIDC) Configuration

To enable authentication via an external OAuth2/OIDC provider, you must set the environment variable `OIDC_AUTHENTICATION=True` in the Carrot server's `.env` file.

Subsequently, configure the provider-specific settings using the following environment variables:

| Environment Variable | Description | Example |
| :--- | :--- | :--- |
| `OIDC_RP_CLIENT_ID` | The Client ID provided by your OAuth2 Identity Provider (IDP). | `your-client-id` |
| `OIDC_RP_CLIENT_SECRET` | The Client Secret provided by your IDP. **Must be kept secure.** | `your-client-secret` |
| `OIDC_OP_AUTHORIZATION_ENDPOINT` | The URL of the IDP's Authorization Endpoint. | `https://provider.com/oauth2/ authorize` |
| `OIDC_OP_TOKEN_ENDPOINT` | The URL of the IDP's Token Endpoint. | `https://provider.com/oauth2/ token` |
| `OIDC_OP_USER_ENDPOINT` | The URL of the IDP's User Info Endpoint, used to retrieve user details. | `https://provider.com/oauth2/ userinfo` |
| `OIDC_OP_JWKS_ENDPOINT` | The URL of the IDP's JWKS (JSON Web Key Set) Endpoint. | `https://provider.com/.well-known/jwks.json` |
| `OIDC_RP_SCOPES` | The requested scopes during OAuth2 authentication. (Default: `openid email profile`) | `openid email profile` |
| `OIDC_RP_SIGN_ALGO` | The signature algorithm used to verify the received JWT tokens (e.g., from the IDP). (Default: `RS256`) | `RS256` |
| `OIDC_USERNAME_ATTRIBUTE` | The attribute from the user information claim (e.g., from the `OIDC_OP_USER_ENDPOINT` response) to be used as the Jumper username. (Default: `preferred_username`) | `email` |
| `OIDC_PROVIDER_NAME` | The display name for the OAuth2 provider, shown on the Jumper login interface. (Default: OIDC) | `My Company SSO` |

Once OAuth2 authentication is configured, users will be able to log in to Jumper using their account credentials from the specified Identity Provider.

### Disabling Password Authentication

To disable the possibility of logging in using the traditional email and password method (forcing all users to use the configured OAuth2 provider), simply set the following environment variable:

```bash
PASSWORD_BASED_AUTHENTICATION=False
```