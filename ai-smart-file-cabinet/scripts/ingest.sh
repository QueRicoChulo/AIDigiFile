#!/bin/bash

# This script automates the ingestion process for files into the AI smart digital file cabinet.

# Define the directory where files are located
FILE_DIR="./files"

# Check if the directory exists
if [ ! -d "$FILE_DIR" ]; then
  echo "File directory does not exist: $FILE_DIR"
  exit 1
fi

# Loop through each file in the directory
for file in "$FILE_DIR"/*; do
  if [ -f "$file" ]; then
    echo "Ingesting file: $file"
    
    # Here you would call the backend API to ingest the file
    # Example: curl -X POST -F "file=@$file" http://localhost:3000/api/files/upload
    
    # Simulate a successful ingestion
    echo "File ingested successfully: $file"
  fi
done

echo "Ingestion process completed."