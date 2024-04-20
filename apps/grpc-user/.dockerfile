# Stage 1: Build stage
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:14 AS production

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --production

# Set the command to start the built application
CMD ["node", "dist/main"]

# Stage 3: Development stage
FROM build AS development

# Install additional development dependencies
RUN npm install --only=development

# Expose the port that the Nest.js application will run on
EXPOSE 3000

# Set the command to start the development server
CMD ["npm", "run", "start"]