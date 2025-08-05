FROM node:22 AS development

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's build cache.
# If only these files change, npm install will re-run.
COPY package.json package-lock.json ./
RUN npm install

# No need to COPY the entire source code here, as it will be mounted via volume in docker-compose.yml.
# The 'npm run dev' command will pick up changes from the mounted volume.

# Expose the internal port the Vite development server will listen on
EXPOSE 5173

# Define the entry point for the container to run the Vite dev server
# The '-- --host 0.0.0.0' correctly passes the host argument to Vite.
ENTRYPOINT ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
