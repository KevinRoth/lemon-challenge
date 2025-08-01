### Mobile Challenge - Lemon

#### Objetivo

#####Desarrollar una aplicación mobile en React Native CLI (sin Expo) que permita:

- Autenticación mediante Google.
- Visualización de una lista de cryptos con filtros y ordenamientos.
- Conversión crypto ↔ fiat usando datos en tiempo real.
- Escaneo de direcciones de wallets (QR).

### Pantalla 1 – Login con Google

- Diseñar una interfaz intuitiva y segura para el login.
- Implementar el login utilizando Google SignIn y buenas prácticas respecto al manejo de sesiones.
- Gestionar la navegación post-login correctamente, dirigiendo al usuario al listado de criptomonedas.
- Manejar los estados de loading, error y éxito de la autenticación.

### Pantalla 2 – Listado de cryptos

- Mostrar una pantalla que contenga un listado de criptomonedas.
- Incluir información relevante: nombre, símbolo, imagen, precio actual y variación porcentual en 24hs.
- Implementar paginado.
- Agregar un buscador.
- Incluir ordenamientos (asc/desc).
- Incluir filtros (por ejemplo, por rango de precio o variación positiva/negativa).
- Incluir un mecanismo de actualización.
- Tener en cuenta performance y UX/UI.

API a usar: [CoinGecko API](https://docs.coingecko.com/reference/introduction)

### Pantalla 3 – Exchange (Crypto ↔ Fiat)

Una pantalla de conversión de moneda donde el usuario pueda:

1. Seleccionar una criptomoneda (BTC, ETH, USDT, etc.).
2. Ingresar un monto (por ejemplo: 0.5 BTC).
3. Ver el equivalente en moneda fiat (USD, EUR, ARS, PEN).
4. Cambiar la dirección del flujo (fiat → crypto). Ejemplo: convertir de ARS a BTC.

API a usar: [CoinGecko API](https://docs.coingecko.com/reference/introduction)

### Cosas a tener en cuenta:

- Mostrar selector de criptomoneda y de moneda fiat.
- El listado de monedas debe estar disponible de forma accesible y clara; podés presentarlo mediante un BottomSheet u otra solución que consideres adecuada. Cada moneda debe mostrar su cotización actual y la variación porcentual en las últimas 24 horas.
- Soportar conversión bidireccional (crypto → fiat y fiat → crypto).
- Mecanismo para actualizar los precios o mantenerlos actualizados.
- Manejar loading y errores correctamente.

### Pantalla 4 – Scanner de Wallet (QR)

Una funcionalidad que permita:

- Usar la cámara para escanear un QR con dirección de wallet.
- Extraer la dirección de la wallet escaneada (por ejemplo: dirección BTC, ETH).
- Mostrar los datos escaneados en una pantalla de resumen.
- Guardar el historial de wallets escaneadas (localmente).
- Permitir marcar direcciones favoritas.

Librerías sugeridas

- react-native-camera-kit o react-native-vision-camera

Evaluación

| Criterio           | Detalle                                           |
| ------------------ | ------------------------------------------------- |
| Funcionalidad      | Cumple con los requisitos, sin errores.           |
| UX/UI              | Interfaz clara, ordenada, intuitiva.              |
| Calidad del código | Estructura limpia, reusable, sin lógica acoplada. |
| Manejo de estado   | Correcto uso de loading, error, persistencia.     |
| Creatividad        | Valor agregado.                                   |

Entrega

- Repositorio público en GitHub.
- README con:
  - Descripción
  - Setup del proyecto
  - Librerías utilizadas
  - Instrucciones para correrlo.

El proyecto debe poder correr en Android e iOS. No es necesario testear en iOS si no se cuenta con Mac, pero el código debe ser compatible con ambas plataformas.

- Se descartan challenges que no se pueden correr

Notas

- No se permite usar Expo.
- Usar TypeScript.

\*\*
