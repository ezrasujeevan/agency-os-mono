# Base image for development
FROM node:14 AS development

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Start development server
CMD ["npm", "run", "dev"]

# Base image for production
FROM node:14 AS production

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy built files from development stage
COPY --from=development /app/dist ./dist

# Set environment variables
ENV NODE_ENV=production

# Start production server
CMD ["npm", "start"]