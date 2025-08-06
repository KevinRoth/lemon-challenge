# Lemon Challenge

## Descripción

LemonChallenge es un proyecto desarrollado como parte de un reto técnico. El objetivo es demostrar habilidades en desarrollo de software, siguiendo las especificaciones y buenas prácticas solicitadas.

## Demo

[Video demo](./docs/demo.mp4)

## Setup del proyecto

### Versiones de paquetes

- Node.js v20.10.0
- npm 10.2.3

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/KevinRoth/lemon-challenge
   cd LemonChallenge
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

### Comandos disponibles

Los siguientes comandos están definidos en el archivo `package.json`:

- `npm run android`: Ejecuta la app en un dispositivo o emulador Android.
- `npm run ios`: Ejecuta la app en un simulador iOS.
- `npm run lint`: Ejecuta el linter para verificar el estilo del código.
- `npm start`: Inicia el servidor Metro Bundler.
- `npm test`: Ejecuta los tests con Jest.

### Cómo correr el proyecto

Primero es necesario revisar el archivo .env-template, que es un template que me provee las distintas variables de entorno que tengo que usar:

Debes crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

- **COINGECKO_API_KEY**  
  Obtén tu API Key gratuita en [CoinGecko API](https://www.coingecko.com/es/api/documentation).  
  Ejemplo:

  ```
  COINGECKO_API_KEY=tu_api_key_de_coingecko
  ```

- **GOOGLE_SIGNIN_WEB_CLIENT_ID**  
  Este valor lo obtienes desde la consola de Google Cloud, en el proyecto donde configuras OAuth para Google Sign-In.  
  Ve a [Google Cloud Console](https://console.cloud.google.com/apis/credentials), crea un OAuth Client ID tipo "Web" y copia el valor de `Client ID`.  
  Ejemplo:

  ```
  GOOGLE_SIGNIN_WEB_CLIENT_ID=tu_client_id_web_google
  ```

- **OTRAS VARIABLES**  
  Si agregas otras integraciones (por ejemplo, endpoints personalizados), documenta aquí cómo y dónde obtenerlas.

> **Nota:**  
> Después de modificar el archivo `.env`, reinicia el servidor de desarrollo para que los cambios tengan efecto.

---

## Librerías utilizadas

A continuación se listan las librerías agregadas al proyecto (además de las que incluye React Native CLI) y su propósito:

- **@react-navigation/native, @react-navigation/native-stack, @react-navigation/bottom-tabs**  
  Para la navegación entre pantallas y tabs de la app.

- **@reduxjs/toolkit, react-redux**  
  Para manejo de estado global y slices (ej: autenticación, datos de usuario, etc).

- **@react-native-google-signin/google-signin**  
  Para implementar autenticación segura con Google.

- **@react-native-async-storage/async-storage**  
  Para almacenamiento local persistente (ej: historial de wallets escaneadas).

- **nativewind, tailwindcss**  
  Para estilos rápidos y consistentes usando utilidades tipo Tailwind adaptadas a React Native.

- **react-native-vector-icons**  
  Para mostrar íconos en botones, tabs y otros componentes visuales.

- **react-native-camera-kit**  
  Para escanear códigos QR de wallets usando la cámara del dispositivo.

- **react-native-dotenv**  
  Para cargar variables de entorno desde archivos `.env`.

- **react-native-reanimated, react-native-screens, react-native-safe-area-context, react-native-worklets**  
  Mejoras de performance, animaciones y manejo seguro de áreas de pantalla.

- **@types/\***  
  Paquetes de tipado TypeScript para las librerías utilizadas.

Estas librerías permiten construir una app moderna, segura y con buena experiencia de usuario, cubriendo autenticación, navegación, manejo de estado, escaneo de QR, almacenamiento local y estilos.
