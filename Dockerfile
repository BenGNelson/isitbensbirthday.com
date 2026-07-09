# Apache + PHP — matches the production droplet (Apache2 + mod_php),
# so the Monday login logger (site/api/log.php) runs locally too.
FROM php:8.3-apache

# Match the droplet's module set. mod_php is enabled by default in this image;
# prod additionally has deflate (gzip) + rewrite + ssl loaded. Locally we only
# need deflate (gzip); ssl/rewrite are prod-only (TLS + HTTPS redirect).
RUN a2enmod deflate

# Custom vhost. Mirrors prod: gzip via mod_deflate, no cache headers, no SPA
# fallback. mod_php executes site/api/log.php.
COPY apache/000-default.conf /etc/apache2/sites-available/000-default.conf

# Bake the site into the image for standalone / prod-like builds.
# In local dev, docker-compose mounts ./site over this for hot-reload.
COPY site/ /var/www/html/

# The PHP logger writes to /var/www/logs/debug.log (../../logs relative to
# site/api/). Create it now so www-data can write even without a mount.
RUN mkdir -p /var/www/logs && chown www-data:www-data /var/www/logs

# Expose port 80 (docker-compose maps this to host port 8080)
EXPOSE 80
