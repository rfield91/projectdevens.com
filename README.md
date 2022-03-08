# ProjectDevens.com

## Requirements

1. [Docker](https://www.docker.com/products/docker-desktop)

## Development Setup

### Configuration

Create a `.env` file with the following variables:

```
DEVELOPMENTPORT=
```

### Launching the site

1. `docker compose up -d`
2. `docker exec -it {container name} bash`
3. `npm install`
4. `npm start`

## Website Configuration

`staticwebapp.config.json` has some configuration to make things work right.

Specifically, it rewrites all requests to `index.html` to that react router works properly on page refresh.

From: https://www.youtube.com/watch?v=A70tGiaHCTE
