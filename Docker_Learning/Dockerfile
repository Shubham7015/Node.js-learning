# Use official Node.js LTS image as base
FROM node:22-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first (leverages Docker layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Start the application
CMD ["node", "index.js"]
