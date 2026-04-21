# 🏆 jpsports

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
docker run --rm -p 8080:80 jpsports-web
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

## License

Wide open — like a fast break.
