# Real Market

Aplicación para la visualización de tenencias de los usuarios de la corredora de bolsa de Rosario https://realmarket.com.ar/

El sistema se compone de un backend [NodeJS](https://nodejs.org/) con [Nest](https://nestjs.com/) y una mobile app hecha con [React Native](https://reactnative.dev/) y [Expo](https://expo.dev/).

Los datos se consumen mayormente de la API de [Rosval](https://www.rosval.com.ar/), aunque el sistema también guarda datos de usuarios en una base de datos [MongoDB](https://www.mongodb.com/).
 
<!-- TODO: especificar versiones de dependencias a instalar localmente (ej. NodeJS) -->

## Entorno local

En el directorio raíz, instalar `yarn` con `corepack` para poder luego instalar las distintas dependencias.

```bash
corepack enable
yarn install 
```

### Backend

En el directorio `backend/`, correr `yarn install` para instalar las dependencias.

También es necesario contar con el archivo `.env` correctamente configurado dicho directorio:
- pedírle el mismo a alguna otro colega que haya trabajado en el proyecto
- asegurarse que este configurado `SERVER_PORT=8000`
- asegurarse que las variables de tipo `SSL_*` estén comentadas para evitar warnings de SSL


<!-- TODO: se podría levantar el `.env` siguiendo la recomendación oficial de usar [@nestjs/config](https://docs.nestjs.com/techniques/configuration), o usando la flag [`--env-file`](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs) de NodeJS, en vez de la librería [dotenv](https://www.npmjs.com/package/dotenv). -->


Luego, para levantar el servidor local
```bash
yarn run start
```

Alternativamente, en caso de necesitar debuggear el código con VS Code, usar el siguiente comando asegurándose previamente que `Debug: Auto Attach` este configurado como `Only With Flag`.

```bash
yarn run start:debug
```

El backend cuenta con [Swagger](https://swagger.io/). Para acceder a su UI, visite la ruta `/explorer/`.

### Base de datos

Probablemente notarás que las variables de entorno en tu archivo `.env` apuntan a una base de datos en la nube. Actualmente se usa única base de datos [MongoDB Atlas](https://www.mongodb.com/atlas) para todos los desarrolladores, y los cambios en la misma se hacen de forma manual.

<!-- TODO: usar una base de datos local para evitar que el trabajo de un desarrollador pueda interferir con el de otro, y empezar a generar [migraciones con typeorm](https://typeorm.io/migrations#generating-migrations) -->

En dicha base de datos remota hay creados usuarios de prueba que puedes usar para iniciar sesión en la aplicación. Pídele las credenciales de acceso a algún otro colaborador. Las mismas suelen ser del tipo `realmarket@12345678`.


### Mobile App

En el directorio `mobile/`, correr `yarn install` para instalar las dependencias.

Luego, escanear el código QR con la aplicación Expo Go en tu celular.

Expo permite incluso depurar el código que corre en tu teléfono desde tu laptop (presionando la tecla `J`).


### Web App

El contenido de `app-test/` fue agregado como prueba pero no cuenta con ninguna funcionalidad útil de momento.

<!-- TODO: eliminar el directorio para evitar confusión -->
