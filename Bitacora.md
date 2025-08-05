### Iniciar proyecto

Utilice este comando para crear el proyecto con React Native CLI

`npx @react-native-community/cli init LemonChallenge`

Levantar Android ok

Levantar Ios ok

### Instalar react-navigation

Sigo la guia https://reactnavigation.org/docs/getting-started

Instalo @react-navigation/native-stack para navegar por stack

Defino una navegacion dinamica, con esto creo el stack de navegacion y luego se lo paso al NavigationContainer que es un componente que gestiona nuestro árbol de navegación y contiene el [estado de navegación](https://reactnavigation.org/docs/navigation-state)

### Actualizo eslint

extendiendo config de prettier, agrego auto format cuando guardo

### Listado de coins

Cree api key en coingecko, previo cree mi cuenta free https://docs.coingecko.com/reference/setting-up-your-api-key

Busco esta api https://docs.coingecko.com/v3.0.1/reference/coins-markets

Instalo rtk query y react-redux

Agrego filtros

Agrego libreria de iconos

### Exchange

Agrego tab navigator

Creo apis para obtener monedas fiats, obtener lista de 100 criptos, obtener conversion de una cripto a fiat

Creo componente Coins con la lista de criptos para que sea reutilizable en el exchangeconverter y coinslist

Creo modal para mostrar listado de criptos / fiats

Agrego estado loading

QR Scanner

Agrego librerias async storage y react-native-camera-kit

creo pantalla walletscanner

creo componente WalletScanner

creo componente WalletHistory

Agrego validaciones
