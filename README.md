# 🏆 jpsports

[![backend CI](https://github.com/jeronimo93/jpsports/actions/workflows/backend.yml/badge.svg)](https://github.com/jeronimo93/jpsports/actions/workflows/backend.yml)
[![.NET 10](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![latest backend](https://img.shields.io/github/v/tag/jeronimo93/jpsports?filter=backend-v*&label=backend&color=blue)](https://github.com/jeronimo93/jpsports/tags)

[![frontend CI](https://github.com/jeronimo93/jpsports/actions/workflows/frontend.yml/badge.svg)](https://github.com/jeronimo93/jpsports/actions/workflows/frontend.yml)
[![frontend live](https://img.shields.io/website?url=https%3A%2F%2Fjpsports-frontend-x2tq7.ondigitalocean.app%2Fhealthz&label=frontend%20live)](https://jpsports-frontend-x2tq7.ondigitalocean.app)
[![Expo 54](https://img.shields.io/badge/Expo-54-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![React Native Web](https://img.shields.io/badge/React_Native_Web-0.21-61DAFB?logo=react&logoColor=black)](https://necolas.github.io/react-native-web/)
[![latest frontend](https://img.shields.io/github/v/tag/jeronimo93/jpsports?filter=frontend-v*&label=frontend&color=orange)](https://github.com/jeronimo93/jpsports/tags)

[![last commit](https://img.shields.io/github/last-commit/jeronimo93/jpsports)](https://github.com/jeronimo93/jpsports/commits/main)

[![Built with Love](https://img.shields.io/badge/built%20with-%E2%9A%BD%20%F0%9F%8F%80%20%F0%9F%8F%88-ff4500?style=for-the-badge&labelColor=1a1a1a)](https://github.com/jeronimo93/jpsports)

> The ultimate sports app. No half-times. No time-outs. No substitutions.

## What is this?

`jpsports` is the sports app to end all sports apps — the final boss of the app store, the GOAT of the repo list, the champion that hoists itself.

Scores. Stats. Standings. Showdowns. All under one roof, all in one repo, all wired up with the kind of swagger usually reserved for walk-off home runs and last-second buzzer-beaters.

## Status

🚧 Training camp. The squad is warming up. Check back for tip-off.

## Structure

- `frontend/` — React Native web app (Expo, React Native for Web), served as static site via nginx.
- `backend/` — .NET backend service.

## Frontend: local dev

```sh
cd frontend
yarn install
yarn web           # dev server with hot reload
yarn build         # static export to frontend/dist/
```

### Smoke-test the container locally

```sh
cd frontend
docker build -t jpsports-web .
docker run --rm -p 8080:8080 jpsports-web
# open http://localhost:8080
```

## Frontend: deploy pipeline

Every push to `main` that touches `frontend/**` builds the image and pushes to DigitalOcean Container Registry (`registry.digitalocean.com/princeyscr/frontend`) via `.github/workflows/frontend.yml`. Tags matching `frontend-v*` publish a versioned tag alongside `:latest`.

The only GitHub secret required is `DIGITALOCEAN_ACCESS_TOKEN` (already set).

### Pull the published image

```sh
doctl registry login
docker pull registry.digitalocean.com/princeyscr/frontend:latest
```

## Hosting (DigitalOcean App Platform)

- **Live**: https://jpsports-frontend-x2tq7.ondigitalocean.app
- **App ID**: `a47de75e-0f76-4107-b313-d5bf5a624c62`

One App Platform app, two services:

| Service | Public | Image | Role |
|---|---|---|---|
| `web` | Yes, served at `/` | `registry.digitalocean.com/princeyscr/frontend` | nginx + SPA; reverse-proxies `/api/*` to the `api` service |
| `api` | **No** — internal only | `registry.digitalocean.com/princeyscr/backend` | .NET backend, reached via service DNS `http://api:8080` |

The spec lives at `.do/app.yaml`. `deploy_on_push` on each service means a DOCR push for either image triggers a per-service rolling update — frontend and backend deploy independently at runtime even though they share an app.

Browsers reach the backend only through the frontend's nginx proxy, so the backend is not on the public internet.

### One-time provisioning (~$10/month — two `basic-xxs` containers)

```sh
doctl apps create --spec .do/app.yaml
doctl apps list   # note the Default Ingress URL
```

Existing app? Apply spec changes in place:

```sh
doctl apps update <app-id> --spec .do/app.yaml
```

### Rollback

App Platform records the **image digest** of every deployment per service. Roll back by setting `image.tag` to a specific `sha-<short>` in the spec and `doctl apps update`, or use the Deployments tab in the DO dashboard.

## License

Wide open — like a fast break.
