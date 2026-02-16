# Informe de entrega - Prueba Trimestral 2 (Despliegue)

## Portada

- Módulo: Despliegue de Aplicaciones Web
- Prueba: Trimestral 2
- Alumno: <tu nombre>
- Fecha: <dd/mm/aaaa>
- Repositorio: <URL GitHub>
- Dominio: examen.tudominio.com

## Índice

1. Introducción
2. Repositorio y control de versiones
3. Pipeline CI/CD con GitHub Actions
4. Despliegue en VPS con Apache + DNS
5. Evidencias de funcionamiento
6. Conclusiones

## 1. Introducción

Breve objetivo de la práctica: automatizar el despliegue de una app Angular estática desde GitHub a un VPS Ubuntu con Apache mediante GitHub Actions.

## 2. Repositorio y control de versiones

- Describe estructura del proyecto.
- Indica uso de rama principal `main`.
- Resume commits más importantes.

Capturas sugeridas:
- Vista principal del repositorio.
- Historial de commits.

## 3. Pipeline CI/CD con GitHub Actions

Explica el flujo definido en `.github/workflows/deploy.yml`:
- Trigger en `push` a `main`.
- `npm ci`.
- `ng build --configuration production`.
- Copia de `dist` al VPS por SSH/rsync.

Capturas sugeridas:
- YAML del workflow.
- Ejecución en verde (job completado).

## 4. Despliegue en VPS con Apache + DNS

- Servidor Ubuntu con Apache2.
- VirtualHost configurado para `examen.tudominio.com`.
- `DocumentRoot` en `/var/www/html/examen`.
- Registro DNS tipo A hacia IP pública del VPS.

Capturas sugeridas:
- Archivo de VirtualHost.
- Verificación DNS (`nslookup`).

## 5. Evidencias de funcionamiento

- Captura de navegador accediendo por dominio.
- (Opcional) contenido desplegado en `/var/www/html/examen`.

## 6. Conclusiones

Resumen breve de resultados y validación de automatización completa sin intervención manual.

---

## Formato requerido

- Extensión: 3 a 5 páginas.
- Fuente: Calibri, 11 pt.
- Interlineado: 1,5.
- Márgenes: 2,5 cm.
- Incluir portada e índice.
