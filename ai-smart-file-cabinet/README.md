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

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.