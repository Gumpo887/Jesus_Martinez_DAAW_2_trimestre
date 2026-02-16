#!/usr/bin/env bash
set -euo pipefail

sudo apt update
sudo apt install -y apache2 rsync
sudo mkdir -p /var/www/html/examen
sudo chown -R www-data:www-data /var/www/html/examen
sudo chmod -R 755 /var/www/html/examen

echo "Recuerda copiar apache/examen.conf a /etc/apache2/sites-available/examen.conf"
echo "Luego: sudo a2ensite examen.conf && sudo systemctl reload apache2"
