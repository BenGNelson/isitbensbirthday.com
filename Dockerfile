FROM nginx:alpine

# Copy custom nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy static site files
COPY site/ /usr/share/nginx/html/

# Expose port 80 (docker-compose maps this to host port 8080)
EXPOSE 80
