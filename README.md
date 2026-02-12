# Tyndfed

Portfolio website built with Astro.

## Development

```bash
bun install
bun dev
```

## Build

```bash
bun run build
```

## Quality Check

```bash
bun run check
```

## Deploy

Push to GitHub - Vercel auto-deploys.

## Docker Image (GitHub Actions)

This repository now includes a workflow at `.github/workflows/docker-image.yml` that builds and pushes a Docker image to GitHub Container Registry (`ghcr.io`) on:

- Push to `main`
- Git tags matching `v*`
- Manual `workflow_dispatch`

The published image name is:

`ghcr.io/<github-owner>/<repo>`

## Run on your server with Docker Compose

1. Copy `docker-compose.yml` and `.env.example` to your server.
2. Create `.env` from the example and set your image info:

```bash
cp .env.example .env
# edit .env values
```

3. Start it:

```bash
docker compose pull
docker compose up -d
```

If the repository/image is private, log in on the server first:

```bash
echo <github_pat_with_read_packages> | docker login ghcr.io -u <github-username> --password-stdin
```

## Stack

- Astro 5
- React 19 (islands)
- TypeScript
