# NodeJS, Typescript y Procedimientos almacenados SQL-Server 馃ぉ馃嚟馃嚦

Proyecto REST API NodeJS con Typscript para usar procedimientos almacenados con SQLServer

## Consideraciones

- Crear un usuario para acceder a la base de en datos SQL-Server( 贸 habilitar el usuario [sa](https://www.youtube.com/watch?v=wF1fnziprGc))
- Verificar que se tenga acceso via puerto TCP/IP habilitado para SQL-Server (
  [revisar](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/configure-a-server-to-listen-on-a-specific-tcp-port?view=sql-server-ver16))
- Verificar que los puertos no se generen de manera dinamica (SQL-Server)

- Instalar [NodeJS](https://nodejs.org/en/)

## Ambiente de desarrollo

Si usas VSCode como editor de c贸digo puedes instalar las siguientes extensiones para el formateo de c贸digo

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Formatear c贸digo al guardar cambios

- [Format on save VSCode](https://code.visualstudio.com/docs/getstarted/settings#_language-specific-editor-settings)

## Correr el ambiente local

### Configurar las variables de entorno

- Crear en el la ra铆z del directorio un archivo .env y colocar los valores correspondientes a las siguientes variables de entorno

```console
PORT=3000
DB_HOST=ejemplo
DB_USER=ejemplo
DB_PASSWORD=ejemlo
DB_DATABASE=ejemplo
DB_PORT=ejemplo
```

- Installar modulos, ejecutar el siguiente comando

```javascript
npm install
```

- Instalar dependencias globales

```javascript
npm install -g  nodemon typescript
```

- Ejecutar la aplicaci贸n

```javascript
npm run serve
```

## Probar API's

- Importar en postman las API's y los enviroments, que se encuentran en la ra铆z del projecto
- Seleccionar el enviroment y cambiar el puerto donde tiene ejecutanto la api
