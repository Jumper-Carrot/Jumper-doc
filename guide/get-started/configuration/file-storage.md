# 💾 File Storage Configuration

By default, files uploaded through the Jumper application (such as Action thumbnails) are stored locally within the Carrot server's `/app/files` directory.

For production environments, **scalability**, and **resilience**, Carrot can be configured to use external **Object Storage** compliant with S3 or OpenStack Swift protocols.

This section details all available file storage configurations. To select your storage backend, set the `STORAGE` environment variable accordingly (e.g., `STORAGE=s3`).

## 📁 Local File Storage (`STORAGE=local`)

This is the default storage type. Files are stored directly on the server's local file system.

| Environment Variable | Description | Example |
| :--- | :--- | :--- |
| `LOCAL_MEDIA_ROOT` | The absolute path to the directory where files will be stored on the local file system. (Default: `/app/files`) | `/app/files` |

## ☁️ S3-Compatible Object Storage (`STORAGE=s3`)

This storage type is based on the S3 protocol, compatible with AWS S3, MinIO, or other S3-compliant providers.

| Environment Variable | Description | Example |
| :--- | :--- | :--- |
| `S3_ENDPOINT_URL` | The public URL of the S3 server. This URL must be accessible by both the Carrot Server and all Jumper Clients for direct file access. | `https://s3.your-provider.com` |
| `S3_SERVER_URL` | The S3 URL used **only by Carrot** to connect to the S3 server (e.g., an internal URL). If not defined, the value of `S3_ENDPOINT_URL` will be used. | `https://internal-s3.your-provider.com` |
| `S3_ACCESS_KEY_ID` | The Access Key ID for S3 authentication. | `your_access_key_id` |
| `S3_SECRET_ACCESS_KEY` | The Secret Access Key for S3 authentication. | `your_secret_access_key` |
| `S3_BUCKET_NAME` | The name of the S3 bucket where files will be stored. **The bucket must be created beforehand.** (Default: `carrot`) | `carrot` |
| `S3_REGION_NAME` | The region name of the S3 server. (Default: `us-east-1`) | `us-east-1` |
| `S3_USE_SSL` | Specifies whether the connection to the S3 server should use SSL/TLS (HTTPS). (Default: `True`) | `True` |
| `S3_VERIFY_SSL` | Specifies whether the SSL certificate of the S3 server should be verified. (Default: `True`) | `True` |
| `S3_PRESIGNED_URL_EXPIRES_IN` | The validity duration (in seconds) for the pre-signed URLs generated for file access by Jumper Clients. (Default: `3600`) | `3600` |

## 🚀 OpenStack Swift Storage (`STORAGE=swift`)

This storage type is based on the OpenStack Swift protocol.

| Environment Variable | Description | Example |
| :--- | :--- | :--- |
| `SWIFT_AUTH_URL` | The authentication URL for the Swift server (Keystone endpoint). | `https://swift.your-provider.com/auth/v1.0` |
| `SWIFT_USERNAME` | The username used to connect to the Swift server. | `your_username` |
| `SWIFT_PASSWORD` | The password for Swift authentication. | `your_password` |
| `SWIFT_CONTAINER_NAME` | The name of the Swift container where files will be stored. **The container will be created automatically if it does not exist.** (Default: `carrot`) | `carrot` |
| `SWIFT_REGION_NAME` | The region name of the Swift server. (Default: `RegionOne`) | `RegionOne` |
| `SWIFT_PROJECT_NAME` | The project (tenant) name used for connecting to the Swift server. | `your_project_name` |
| `SWIFT_PROJECT_DOMAIN_NAME` | The domain name of the project used for authentication. | `Default` |
| `SWIFT_USER_DOMAIN_NAME` | The domain name of the user used for authentication. | `Default` |
| `SWIFT_AUTH_VERSION` | The version of the Swift authentication system (Keystone version). (Default: `3`) | `3` |
| `SWIFT_TEMP_URL_KEY` | The secret key used to generate temporary (pre-signed) file access URLs. **Note:** This key must be set on the container using the OpenStack CLI: `openstack container set <container-name> --property Temp-URL-Key=<your-key>` | `your_temp_url_key` |
| `SWIFT_PRESIGNED_URL_EXPIRES_IN` | The validity duration (in seconds) for the temporary URLs generated for file access by Jumper Clients. (Default: `3600`) | `3600` |
