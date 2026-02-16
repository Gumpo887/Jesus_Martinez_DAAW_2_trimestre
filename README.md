# Despliegue Angular + CI/CD en VPS (Prueba Trimestral 2)

Proyecto preparado para desplegar automáticamente una app Angular en un VPS IONOS (Ubuntu 24.04) con Apache.

- Dominio: `examen.jesusma.dev`
- VPS: `217.154.180.178`
- DocumentRoot: `/var/www/html/examen`
- Trigger CI/CD: `push` a rama `main`

## 1) Requisitos locales

```bash
npm ci
npx ng build --configuration production
```

El build debe generar `dist/<app>/browser` o `dist/<app>`.

## 2) DNS en IONOS

Crear registro DNS tipo A:
- Tipo: `A`
- Nombre/Host: `examen`
- Valor: `217.154.180.178`
- TTL: por defecto (ej. 300)

Verificación:

```bash
nslookup examen.jesusma.dev
```

Debe resolver a `217.154.180.178`.

## 3) Preparar VPS (Ubuntu 24.04)

Conéctate al VPS:

```bash
ssh root@217.154.180.178
```

Instala Apache y rsync, y crea directorio de despliegue:

```bash
apt update
apt install -y apache2 rsync
mkdir -p /var/www/html/examen
chown -R www-data:www-data /var/www/html/examen
chmod -R 755 /var/www/html/examen
```

Copiar y habilitar VirtualHost:

```bash
cp /ruta/de/este/repo/apache/examen.conf /etc/apache2/sites-available/examen.conf
a2enmod rewrite
a2ensite examen.conf
apache2ctl configtest
systemctl reload apache2
```

Comprobación rápida en VPS:

```bash
ls -la /var/www/html/examen
curl -I http://localhost
```

## 4) Clave SSH para GitHub Actions (sin passphrase)

Genera una clave dedicada en tu equipo local:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ./github_actions_deploy -N ""
```

Esto crea:
- `github_actions_deploy` (clave privada)
- `github_actions_deploy.pub` (clave pública)

Añade la pública al VPS (usuario `root`):

```bash
type .\github_actions_deploy.pub | ssh root@217.154.180.178 "mkdir -p /root/.ssh && chmod 700 /root/.ssh && cat >> /root/.ssh/authorized_keys && chmod 600 /root/.ssh/authorized_keys"
```

## 5) GitHub Secrets obligatorios

En GitHub -> `Settings` -> `Secrets and variables` -> `Actions`, crear:

- `VPS_HOST` = `217.154.180.178`
- `VPS_USER` = `root`
- `VPS_PORT` = `22`
- `VPS_PATH` = `/var/www/html/examen`
- `VPS_SSH_KEY` = contenido completo de la clave privada OpenSSH (`github_actions_deploy`)

## 6) Workflow CI/CD

Archivo: `.github/workflows/deploy.yml`

Flujo al hacer push a `main`:
1. `npm ci`
2. `npx ng build --configuration production`
3. Detección robusta de salida en `dist`
4. `ssh-keyscan` para registrar host
5. `rsync -az --delete` al VPS

## 7) Verificación final

Tras un push a `main`:

```bash
nslookup examen.jesusma.dev
curl -I http://examen.jesusma.dev
ssh root@217.154.180.178 "ls -la /var/www/html/examen | head"
```

Si hay rutas SPA (ej. `/about`), verificar refresh sin 404:

```bash
curl -I http://examen.jesusma.dev/about
```

## 8) Evidencias para PDF

Capturas recomendadas:
- Repositorio GitHub (estructura y rama `main`).
- Ejecución en verde de GitHub Actions.
- Logs del step de deploy (`Deploy to VPS with rsync`).
- Navegador mostrando `http://examen.jesusma.dev`.
- Refresh en una ruta SPA sin error 404 (si aplica).
- Resultado de `nslookup examen.jesusma.dev`.

## 9) Commits sugeridos

1. `ci: robustecer workflow de build y deploy angular`
2. `ops: configurar virtualhost apache con rewrite para spa`
3. `docs: actualizar readme con dns, vps y secrets reales`
