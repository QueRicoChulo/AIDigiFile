FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
COPY worker/package*.json ./worker/

# Install backend dependencies
RUN cd backend && npm install

# Install frontend dependencies
RUN cd frontend && npm install

# Install worker dependencies
RUN cd worker && npm install

# Copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 3000

# Start the backend server
CMD ["node", "backend/src/server.js"]