# Getting started

Jumper fonctionne comme une application de bureau. 

Vous pouvez télécharger la dernière version de Jumper en cliquant sur ce lien.

Pour fonctionner Jumper a besoin d'être connecter à une application serveur, Carrot, chargé de centraliser les données pour ses différents utilisateur.

Une fois Carrot installer, vous pourez administrer les différents comptes utilisateurs et scripts executable directement depuis l'interface de jumper.

Cette page detaille l'installation et la configation de l'application Carrot, necessaire à l'utilisation de Jumper.

> [!INFO] 
> Noter que Jumper n'est pour le moment compatible qu'avec Windows.


## Installation de Carrot

## Pré-requis serveur

* Minimum 2 VCPU Cores
* 2 Go RAM minimum
* 50 Go d'espace disque minimum.

## Installation via Docker

Carrot est disponible sous forme d'image Docker sur Docker Hub. Nous recommandons cette méthode d'installation, ainsi que l'usage de Docker compose pour l'orchestration des services sur lequel s'appuie Carrot.

[INFO] Carrot s'appuie sur une base de donnée de type PostgresSQL, une base de donnée Redis pour la mise en cache, ainsi qu'un object strorage de type S3 (MinIO est utilisé ici) pour le stockage dans images.

* Assurez-vous que Docker est bien installer sur le serveur.

* A l'emplacement serveur où vous souhaitez installer l'application, télécharger les fichiers docker-compose.yml et .env.sample présent sur ce repository, avec la commande suivante:

```


```



```
services:
  carrot:
    image: antoinelibert/carrot:latest
    restart: always
    env_file:
      - .env
    ports:
      - 9890:9890
    environment:
      - 
    depends_on:
      - carrot-postgres
      - carrot-redis
      - carrot-minio
    volumes:
      - ./keys:/keys:ro

  carrot-postgres:
    image: postgres:${POSTGRES_IMAGE_VERSION:-15}
    restart: always
    environment:
      - POSTGRES_DB=${POSTGRES_DB:-carrot}
      - POSTGRES_USER=${POSTGRES_USER:-postgres}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-unsecurepassword}
    volumes:
      - db_data:/var/lib/postgresql/data

  carrot-redis:
    image: redis:${REDIS_IMAGE_VERSION:-latest}
    restart: always
    volumes:
      - redis_data:/data

  carrot-minio:
    image: minio/minio:${MINIO_IMAGE_VERSION:-RELEASE.2025-09-07T16-13-09Z}
    restart: always
    environment:
      - MINIO_ACCESS_KEY=${S3_ACCESS_KEY_ID:-minioaccesskey}
      - MINIO_SECRET_KEY=${S3_SECRET_ACCESS_KEY:-miniosecretkey}
    volumes:
      - minio_data:/data
    entrypoint: sh
    command: -c 'mkdir -p /data/${S3_BUCKET_NAME:-carrot} && /usr/bin/minio server /data'

volumes:
  db_data:
  redis_data:
  minio_data:
```

* Définisser un fichier .env dans le même dossier que le fichier docker-compose.yml avec le contenu suivant: 

```
###############
# DOCKER IMAGES
###############

# CARROT_IMAGE_VERSION=latest # https://hub.docker.com/r/antoinelibert/carrot/tags
# POSTGRES_IMAGE_VERSION=15 # https://hub.docker.com/_/postgres/tags
# REDIS_IMAGE_VERSION=latest # https://hub.docker.com/r/redis/redis/tags
# MINIO_IMAGE_VERSION=RELEASE.2025-09-07T16-13-09Z # https://hub.docker.com/r/minio/minio/tags

#############
# SECURE KEYS
#############

# WARNING: Required in production environment.
# WARNING: Need to be kept secret.
# use 'openssl rand -base64 50' to generate a secret key
DJANGO_SECRET_KEY=djangoSecretKey

# WARNING: Required in production environment.
# WARNING: Need to be kept secret.
# use 'openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048' to generate a private key
# use 'openssl rsa -pubout -in private_key.pem -out public_key.pem' to generate a public key
SIGNING_KEY_FILE=/keys/private_key.pem
VERIFYING_KEY_FILE=/keys/public_key.pem

#######
# DEBUG
#######

# DEBUG=False

##########
# STORAGES
##########

POSTGRES_PASSWORD=61mDRyuuyt6TuizJzzrea449Ce
# POSTGRES_USER=root
# POSTGRES_DB=carrot-db
# POSTGRES_HOST=carrot-postgres
# POSTGRES_PORT=5432

S3_ACCESS_KEY_ID=carrotaccesskey
S3_SECRET_ACCESS_KEY=MAY57yutu37L6PvcUs
# S3_BUCKET_NAME=carrot
# S3_ENDPOINT_HOST=carrot-minio
# S3_ENDPOINT_PORT=9000

################
# ADMIN SETTINGS
################

# ADMIN_EMAIL=admin@mail.com
# ADMIN_USERNAME=admin
# ADMIN_PASSWORD=admin

###########################
# AUTHENTICATION (OPTIONAL)
###########################

# If you use other authentication methods, like OpenID Connect,
# you can disable password authentication by setting this to False.
# JWT_ENABLED=True
# Lifetimes in minutes.
# ACCESS_TOKEN_LIFETIME=1440
# REFRESH_TOKEN_LIFETIME=43200

# OIDC SETTINGS (OPTIONAL)

# OIDC_ENABLED=False

# OIDC_RP_CLIENT_ID=
# OIDC_RP_CLIENT_SECRET=

# OIDC_OP_AUTHORIZATION_ENDPOINT=https://<auth-provider>/application/o/authorize/
# OIDC_OP_TOKEN_ENDPOINT=https://<auth-provider>/application/o/token/
# OIDC_OP_USER_ENDPOINT=https://<auth-provider>/application/o/userinfo/
# OIDC_OP_JWKS_ENDPOINT=https://<auth-provider>/application/o/<app>/jwks/
# OIDC_OP_LOGOUT_URL_METHOD=https://<auth-provider>/application/o/<app>/end-session/
# ALLOW_LOGOUT_GET_METHOD=False
# OIDC_RP_SIGN_ALGO=RS256

# Email attribute will be used as unique identifier for the user.
# Jumper will try to get username and avatar information from the OIDC provider.
# OIDC_RP_SCOPES='openid email profile'
# OIDC_USERNAME_ATTRIBUTE=preferred_username
# OIDC_AVATAR_ATTRIBUTE=picture

# Visual name of the OIDC provider, used in the frontend login page.
# OIDC_PROVIDER_NAME=

# LOGIN_URL='oidc_authentication_init'
# LOGIN_REDIRECT_URL=http://localhost:5173/
# LOGIN_REDIRECT_URL_FAILURE=http://localhost:5173/login
# LOGOUT_REDIRECT_URL=http://localhost:5173/login

# SCIM SETTINGS (OPTIONAL)

# SCIM_ENABLED=False
# Token to authenticate SCIM requests (WARNING: need to be kept secret).
# use 'openssl rand -base64 50' to generate a secret token.
# SCIM_BEARER_TOKEN=

# Jumper host where to redirect in SCIM provider.
# JUMPER_HOST=http://localhost
# JUMPER_PORT=9630

# If False, users will be desactivated instead of deleted,
# when deleted from the SCIM provider.
# SCIM_ALLOW_USER_DELETION=True

# By default, if the SCIM provider tries to create a user
# with an email that already exists in Carrot, an error is returned.
# If True, the user will be updated with the new information without error.
# SCIM_ALLOW_USER_CREATION_CONFLIT=False

#########################
# EMAILS - SMTP (OPTIONAL)
#########################
# required for recovery password email

# SMTP settings
# EMAIL_HOST=mail.provider.com
# EMAIL_PORT=25
# EMAIL_USE_TLS=True
# EMAIL_HOST_USER=
# EMAIL_HOST_PASSWORD=

# Email address to use as from email.
# DEFAULT_FROM_EMAIL=no-reply@something.com

# Gallery frontend where to redirect in email for password recovery.
# GALLERY_HOST=http://localhost:5173

####################
# LOGGING (OPTIONAL)
####################

# Log file where to write django application logs.
# DJANGO_LOG_FILE=
# Log level for django application logs. Default INFO.
# DJANGO_LOG_FILE_LEVEL=INFO

###############################
# FRONTEND - UPDATES (OPTIONAL)
###############################

# Allow Jumper frontend new version to be installed, if available.
# ALLOW_FRONTEND_UPDATES=True

# Limit the version of the Jumper frontend updates.
# By default, each version is automatically limited to bug fixes and security issues.
# You can specify only a major or minor version as limitation. Ex: 1, 1.3, etc.
# Use "*" to allow any version updates.
# MAX_ALLOWED_VERSION=X.Y.Z

# Jumper repository, where to find new released versions.
# JUMPER_REPOSITORY_URL=https://api.github.com/repos/LibertAntoine/Jumper
```

* Copier le fichier .env.sample en le nommant .env

* La valeur de certaines variables d'environnements de sécurité doivent être modifiée dans un contexte de production:
   * DJANGO_SECRET_KEY