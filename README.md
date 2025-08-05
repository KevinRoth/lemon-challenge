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
  Obtén tu API Key gratuita en [CoinGecko API

  ](https://docs.coingecko.com/reference/setting-up-your-api-key)

- **COINGECKO_API**
  La url es https://pro-api.coingecko.com/api/v3/
- **GOOGLE_SIGNIN_WEB_CLIENT_ID**
  Este valor lo obtienes desde la consola de Google Cloud, en el proyecto donde configuras OAuth para Google Sign-In.Ve a [Google Cloud Console](https://console.cloud.google.com/apis/credentials), crea un OAuth Client ID tipo "Web" y copia el valor de `Client ID`.
- **GOOGLE_IOS_CLIENT_ID**
  Este valor lo obtienes desde la consola de Google Cloud, en el proyecto donde configuras OAuth para Google Sign-In.Ve a [Google Cloud Console](https://console.cloud.google.com/apis/credentials), crea un OAuth Client ID tipo "IOS" y copia el valor de `Client ID`.

Nota: si tienes un problema con los url schemes, es necesario realizar esta [configuración en xCode](https://react-native-google-signin.github.io/docs/setting-up/ios#xcode-configuration)

#### iOS

1. Instala las dependencias de CocoaPods:
   ```bash
   npx pod-install
   ```
2. Corre la app en el simulador iOS:
   ```bash
   npm run ios
   ```

#### Android

1. Corre la app en un dispositivo o emulador Android:
   ```bash
   npm run android
   ```

#### Metro Bundler

Para iniciar el servidor Metro Bundler manualmente:

```bash
npm start
```

#### Tests y Lint

Para ejecutar los tests:

```bash
npm test
```

Para verificar el estilo del código:

```bash
npm run lint
```

#### Crear build en android

`cd android && ./gradlew clean && ./gradlew assembleRelease | ./gradlew assembleDebug`
