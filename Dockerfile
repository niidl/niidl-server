# Use the official Node.js 16 image as a parent image
FROM node:16

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install --production

# Copy the rest of the application files to the container
COPY . .
COPY package*.json ./

# Expose port 80 and 443 for external access
EXPOSE 80

ENV POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
ENV POSTGRES_DB: ${POSTGRES_DB}
ENV POSTGRES_USER: ${POSTGRES_USER}

# Run the Knex database migrations

  CMD npx prisma generate && \
  npx prisma migrate deploy && \
  npx prisma db seed  && \
  npm run start
