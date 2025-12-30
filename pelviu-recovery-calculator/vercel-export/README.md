# pelviU Recovery Calculator - Guía de Exportación y Uso

Este proyecto es una "Single Page Application" (SPA) contenida en un solo archivo HTML. Esto simplifica enormemente su despliegue y uso.

## Archivos Entregados
*   **pelviu-web-preview.html**: El archivo principal de la aplicación. (Puedes renombrarlo a `index.html` si vas a subirlo a un servidor).

## Cómo Usar (Local)
Simplemente haz doble clic en el archivo `pelviu-web-preview.html` para abrirlo en tu navegador web favorito (Chrome, Safari, Firefox).

## Cómo Desplegar (Online)
Como es un archivo estático, puedes alojarlo en cualquier servicio web básico.

### Opción A: Hosting Compartido / CPanel
1. Accede a tu administrador de archivos o FTP.
2. Sube el archivo `pelviu-web-preview.html` a tu carpeta `public_html`.
3. Renómbralo a `index.html` si quieres que sea la página principal.

### Opción B: Netlify / Vercel (Gratis)
1. Crea una carpeta nueva en tu ordenador llamada `pelviu-app`.
2. Mueve el archivo `pelviu-web-preview.html` dentro y renómbralo a `index.html`.
3. Arrastra esa carpeta al panel de subida de Netlify Drop.

## Configuración Importante
*   **Google Sheets**: La aplicación está conectada a la URL de script que proporcionaste. Si cambias de hoja de cálculo en el futuro, tendrás que actualizar esa URL dentro del código (búscalo al final del archivo HTML).
*   **Datos Locales**: Los datos del Dashboard se guardan en el navegador del dispositivo donde se usa. Si borras la caché del navegador, se perderá el historial local (pero la copia en Google Sheets seguirá segura).
