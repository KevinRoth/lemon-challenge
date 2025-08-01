# LemonChallenge

## Descripción

LemonChallenge es un proyecto desarrollado como parte de un reto técnico. El objetivo es demostrar habilidades en desarrollo de software, siguiendo las especificaciones y buenas prácticas solicitadas.

## Setup del proyecto

### Requisitos previos

- Node.js (versión recomendada: 16.x o superior)
- npm (Node Package Manager)

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/LemonChallenge.git
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
