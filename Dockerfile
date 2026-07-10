# Apache — matches the production droplet, which runs Apache2. The site is
# fully static (no server-side code), but we use the same server as prod so
# dev == prod. php:8.3-apache is the exact prod match (the droplet has mod_php
# enabled from earlier; nothing uses it now, and that's fine).
FROM php:8.3-apache

# gzip, matching the droplet's mod_deflate.
RUN a2enmod deflate

# Custom vhost. Mirrors prod: gzip via mod_deflate, no cache headers, no SPA fallback.
COPY apache/000-default.conf /etc/apache2/sites-available/000-default.conf

# Bake the site into the image for standalone / prod-like builds.
# In local dev, docker-compose mounts ./site over this for hot-reload.
COPY site/ /var/www/html/

# Expose port 80 (docker-compose maps this to host port 8080)
EXPOSE 80
