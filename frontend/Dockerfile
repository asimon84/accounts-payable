# Use a Node.js image for building the React application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install frontend dependencies
RUN npm cache clean --force
RUN rm -rf node_modules package-lock.json
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the React application
RUN npm run build

# Use an Nginx image for serving the built React application
FROM nginx:stable-alpine

# Copy the built React application into Nginx's web root
COPY --from=build /app/build /usr/share/nginx/html

# Copy a custom Nginx configuration (optional, but recommended for SPAs)
# Create a file named 'nginx.conf' in the same directory as your Dockerfile
# with content like:
# server {
#     listen 80;
#     location / {
#         root /usr/share/nginx/html;
#         index index.html index.htm;
#         try_files $uri $uri/ /index.html;
#     }
# }
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (default for Nginx)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]