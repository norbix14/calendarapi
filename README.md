# Calendar App API

API para **[Calendar](https://github.com/norbix14/calendar)** hecha en **React**

## Pasos

Modo de **[desarrollo](http://localhost:4000)**

		npm run dev

Ejecuta `nodemon ./index.js`

Modo de **[producción](http://localhost:4000)**

		npm start

Ejecuta `node ./index.js`

## Elementos necesarios

Variables de entorno

Para **[MongoDB](https://cloud.mongodb.com)**

		MONGODB_URL_REMOTE=""

Para **[JSON web token](https://jwt.io)**

		JWT_SECRET=""

## Atencion

Antes del despliegue

En el proyecto en React, ejecutar `npm run build` para el `build` de producción

Luego copiar todo dentro de esa carpeta dentro de `/public`

Preparar `git` para que tenga todo actualizado

Finalmente, `git push <heroku> <branch>` si se desea tenerlo desplegado en Heroku
