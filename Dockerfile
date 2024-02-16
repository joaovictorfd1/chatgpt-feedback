# Use the official Node.js image as base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files to the working directory
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the port on which Next.js will run
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "dev"]
