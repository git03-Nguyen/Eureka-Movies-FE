# Step 1: Use the official Node.js image as the base image
FROM node:20.17.0 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Copy the rest of the application files into the container
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Serve the React app with a simple HTTP server (can use serve or any similar tool)
FROM nginx:alpine

# Step 8: Copy the built React app to the Nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80 for HTTP traffic
EXPOSE 80

# Step 10: Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
