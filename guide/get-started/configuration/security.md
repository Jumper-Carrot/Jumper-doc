# 🔒 Security Configuration

To secure the application data and ensure the integrity of your deployment, it is **highly recommended** to modify the following environment variables in the Carrot server configuration (`.env` file), especially in a **production environment**.

## 🔑 Mandatory Encryption Variables

These keys and credentials are vital for cryptographic operations.

| Environment Variable | Description | How to Generate (Example) |
| :--- | :--- | :--- |
| `SECRET_KEY` | The secret key used by the application (Django) for various cryptographic operations, including session hashing. **Use a long, complex, random string.** | `openssl rand -base64 50` |
| `SIGNING_KEY_FILE` | Path to the **Private Key** file used to **sign** JWT tokens (RS256 algorithm). The path must be accessible from within the Docker container. By default, Carrot expects the key at `/etc/keys/jwt_rs256_signing_key.pem`. | `openssl genpkey -algorithm RSA -out jwt_rs256_signing_key.pem -pkeyopt rsa_keygen_bits:2048` |
| `VERIFYING_KEY_FILE` | Path to the **Public Key** file used to **verify** JWT tokens. The path must be accessible from within the Docker container. By default, Carrot expects the key at `/etc/keys/jwt_rs256_verifying_key.pem`. | `openssl rsa -in jwt_rs256_signing_key.pem -pubout -out jwt_rs256_verifying_key.pem` |
| `POSTGRES_PASSWORD` | The password used by Carrot to access the PostgreSQL database. **Use a strong, unique password.** | `openssl rand -base64 32` |

> [!WARNING] 
> ⚠️ Default value placeholders are provided in the _.env.sample_ file and encryption keys are automatically generated if not present, which simplifies the initial setup. **You must change these default values before deploying to production.**


## 👤 Default Administrator Account

By default, Carrot creates an initial administrator account with the following credentials:

* Email: `admin@mail.com`
* Username: `admin`
* Password: `admin`

You can modify these default values **before** the first execution of Carrot by defining the following environment variables in your `.env` file:

| Environment Variable | Description |
| :--- | :--- |
| `ADMIN_EMAIL` | The email address for the default administrator account. |
| `ADMIN_USERNAME` | The username for the default administrator account. |
| `ADMIN_PASSWORD` | The password for the default administrator account. **Must be a strong password.** |
