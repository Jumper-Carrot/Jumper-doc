# 👤 SCIM Provisioning

Jumper fully supports user and group provisioning via the **SCIM 2.0 (System for Cross-domain Identity Management)** protocol.

This feature allows you to **automatically synchronize users and groups** from your external Identity Provider (IdP) to Jumper, significantly simplifying user management, automating onboarding/offboarding, and ensuring that access rights are always current.

More information about the protocol can be found on the [official SCIM website](https://www.simplecloud.info/).

> [!TIP]
>  👉 Jumper plans to support LDAP/Active Directory for user provisioning in a future release. Stay tuned for updates\!

## 🔧 Configuring SCIM Provisioning

To enable and secure SCIM provisioning in Jumper, you need to configure the following environment variables in the Carrot server's `.env` file:

| Environment Variable | Description | Example |
| :--- | :--- | :--- |
| `SCIM_ENABLED` | **Master switch:** Enables or disables the SCIM provisioning feature. (Default: `False`) | `True` |
| `SCIM_BEARER_TOKEN` | The secure **Bearer Token** used for authenticating all SCIM requests from the Identity Provider. **This token must be kept highly secure.** | `your_scim_bearer_token` |
| `SCIM_ALLOW_USER_DELETION` | If set to `True`, allows the IdP to send deletion requests via SCIM, resulting in the corresponding user being deleted in Jumper. (Default: `False`) | `False` |
| `SCIM_ALLOW_USER_CREATION_CONFLITS` | Controls behavior when creating a user via SCIM if a user with the same email already exists in Jumper. If `True`, the existing user identity will be merged/linked with the IdP's identity. If `False` (default), the user creation will fail to prevent conflicts. | `False` |
| `ADMIN_GROUP` | The name of the IdP group that, when synchronized via SCIM, will automatically grant its members **administrative privileges** within Jumper. | `admins` |

### SCIM Endpoint

Once SCIM provisioning is enabled and configured, you can set up your Identity Provider to communicate with Jumper's SCIM endpoint:

```
https://<your-carrot-server>/scim/v2/
```
