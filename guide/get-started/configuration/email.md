
# 📧 Email Configuration

Carrot utilizes email primarily to manage **password resets** by sending a One-Time Password (OTP) code to the user.

To enable this crucial functionality, you must configure an external SMTP server within your Carrot instance's `.env` file.

> [!WARNING]
> ⚠️
> If you do not configure an SMTP server, users will **not** be able to reset their own passwords via email. In this scenario, password resets can only be performed manually by administrators through Jumper administration interface.

## SMTP Server Configuration

To configure the SMTP server, modify the following environment variables in your `.env` configuration file:

| Environment Variable | Description | Example |
| :--- | :--- | :--- |
| `EMAIL_HOST` | The hostname or IP address of the SMTP server. | `smtp.mailprovider.com` |
| `EMAIL_PORT` | The port for the SMTP server connection. (Default: `587`) | `587` |
| `EMAIL_USER` | The username for SMTP authentication (often the sender email address). | `user@mailprovider.com` |
| `EMAIL_PASSWORD` | The password or application-specific token for SMTP authentication. | `your_secret_password` |
| `EMAIL_USE_TLS` | Specifies whether to use TLS (Transport Layer Security) for a secure connection. (Default: `True`) | `True` |
| `DEFAULT_FROM_EMAIL` | The email address used as the sender for all system-generated emails. | `jumper@company.com` |
