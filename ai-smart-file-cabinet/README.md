# AI Smart Digital File Cabinet

## Overview
The AI Smart Digital File Cabinet is a comprehensive solution designed to manage, ingest, and search digital files using advanced AI techniques. This project is structured into three main components: backend, frontend, and worker services, each serving a specific purpose in the overall architecture.

## Project Structure
```
ai-smart-file-cabinet
├── backend          # Backend server and API
│   ├── src
│   │   ├── server.ts               # Entry point for the backend application
│   │   ├── routes
│   │   │   └── api.ts              # API routes for file operations
│   │   ├── controllers
│   │   │   └── filesController.ts   # Handles file-related requests
│   │   ├── services
│   │   │   ├── ingestionService.ts   # Logic for ingesting files
│   │   │   ├── embeddingService.ts   # Manages embeddings for files
│   │   │   └── searchService.ts      # Provides search functionality
│   │   └── types
│   │       └── index.ts             # Type definitions
│   ├── package.json                  # Backend npm configuration
│   └── tsconfig.json                 # TypeScript configuration for backend
├── frontend         # Frontend application
│   ├── src
│   │   ├── App.tsx                   # Main component for the frontend
│   │   ├── pages
│   │   │   └── Dashboard.tsx         # Dashboard interface
│   │   ├── components
│   │   │   ├── FileList.tsx          # Displays list of uploaded files
│   │   │   └── UploadForm.tsx        # Form for uploading files
│   │   └── hooks
│   │       └── useSearch.ts          # Custom hook for search functionality
│   ├── package.json                   # Frontend npm configuration
│   └── tsconfig.json                  # TypeScript configuration for frontend
├── worker           # Background worker for file ingestion
│   ├── src
│   │   └── ingestWorker.ts            # Logic for processing ingestion tasks
│   ├── package.json                   # Worker npm configuration
│   └── tsconfig.json                  # TypeScript configuration for worker
├── services         # Additional services
│   ├── embeddings
│   │   └── README.md                  # Documentation for embeddings service
│   └── storage
│       └── README.md                  # Documentation for storage service
├── scripts          # Automation scripts
│   └── ingest.sh                       # Shell script for ingestion process
├── .devcontainer    # Development container configuration
│   └── devcontainer.json                # Settings for the development environment
├── docker-compose.yml                   # Docker configuration
├── Dockerfile                            # Instructions for building Docker image
├── .gitignore                            # Git ignore file
└── README.md                             # Project documentation
```

## Features
- **File Ingestion**: Seamlessly upload and store files in the digital cabinet.
- **AI-Powered Search**: Utilize embeddings to search through files efficiently.
- **User-Friendly Interface**: A responsive frontend that allows users to interact with the file cabinet easily.

## Getting Started
To get started with the AI Smart Digital File Cabinet, clone the repository and follow the setup instructions in the respective backend, frontend, and worker directories.

## Deploying to a VPS (one-line pull & deploy)

This repo includes `deploy.sh` and `update.sh` to make VPS deployment easy. The recommended flow on your VPS (replace values as needed):

1. Clone the repo on the VPS (if not already):

```bash
git clone <repo-url> ai-smart-file-cabinet
cd ai-smart-file-cabinet
```

2. Create a `.env` from `.env.example` and set these values:

```bash
cp .env.example .env
# Edit .env to set USE_EXTERNAL_PROXY=true and EXTERNAL_PROXY_PORT=8081
```

3. First deploy (build + run):

```bash
./deploy.sh
```

4. To update the code on the VPS and redeploy later, use:

```bash
./update.sh
```

Notes:
- If you run an external nginx proxy, set `USE_EXTERNAL_PROXY=true` and `EXTERNAL_PROXY_PORT` to the host port your proxy forwards to (e.g., 8081).
- If you prefer the repo to manage TLS via Caddy, set `USE_EXTERNAL_PROXY=false` and provide `DOMAIN` and `LETSENCRYPT_EMAIL` in `.env`.
- Ensure ports required by your chosen setup are open on the VPS (e.g., 8081 for external proxy, 80/443 for Caddy).

## Clone, run code checks, and deploy on a VPS (detailed)

Follow these commands on your VPS (216.219.90.60) to clone the repo, run TypeScript checks, and deploy. This assumes you have Docker and Docker Compose installed and the VPS user has permission to run Docker.

1) Clone the repository and change into the project folder:

```bash
# on the VPS
git clone <your-repo-url> ai-smart-file-cabinet
cd ai-smart-file-cabinet
```

2) Create the `.env` from the example and configure external proxy settings:

```bash
cp .env.example .env
# Edit .env and set the following for an external proxy setup:
# USE_EXTERNAL_PROXY=true
# EXTERNAL_PROXY_PORT=8081
# (If you want Caddy to manage TLS, set USE_EXTERNAL_PROXY=false and provide DOMAIN and LETSENCRYPT_EMAIL.)
```

3) (Optional but recommended) Run TypeScript checks locally on the VPS before building images. This will install the project dependencies for each subproject and run `tsc --noEmit`.

```bash
# Install backend and worker dependencies (frontend deps are installed during build)
npm install --prefix backend
npm install --prefix worker

# Run TypeScript checks
npx --prefix frontend tsc --noEmit -p frontend/tsconfig.json
npx --prefix backend tsc --noEmit -p backend/tsconfig.json
npx --prefix worker tsc --noEmit -p worker/tsconfig.json
```

If `tsc` reports errors (for example implicit `any` on route handlers or missing types), fix them before deploying or proceed if you accept the risk. Example common fixes:
- Add explicit types for Express handlers: `(req: Request, res: Response)` and import types from `express`.
- Ensure multer types are available or install `@types/multer` if using Multer.

4) Build and start the stack (this runs `docker-compose` and builds images):

```bash
chmod +x ./deploy.sh
./deploy.sh
```

5) If using an external nginx reverse proxy on another host (e.g. files.aiwonderagents.com -> 216.219.90.60:8081), open the VPS firewall port and ensure the proxy points to the VPS port:

```bash
# allow port 8081 through UFW (adjust if you use a different firewall)
sudo ufw allow 8081/tcp
# verify docker is listening on the port
sudo ss -ltnp | grep 8081 || sudo netstat -ltnp | grep 8081
```

6) To update later (pull and redeploy):

```bash
chmod +x ./update.sh
./update.sh
```

Troubleshooting & notes
- If `npm install` or `tsc` fail on the VPS, ensure the VPS has a compatible Node.js version (see each package.json `engines` field) and enough disk space.
- Do NOT commit or store API keys in the repository. Use the `.env` file or Docker secrets for production secrets.
- The repository includes `deploy.sh` which will either start Caddy for TLS (if `USE_EXTERNAL_PROXY=false`) or start only the backend+frontend and expose the frontend on `EXTERNAL_PROXY_PORT` (if `USE_EXTERNAL_PROXY=true`).

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.