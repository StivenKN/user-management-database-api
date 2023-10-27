# user-management-database-api
An user (login, register) management database free api microservice to use in any project

## Tecnologies in use
> Typescript
> Express
> Node
> MySQL

# Instalation
1. Go to [Releases page](https://github.com/ConanGH-S/user-management-database-api/releases) and download the lastest version (Source code and Database).
2. Import `BU_user_management` folder into MySQL. Addionally, in the `source code` folder add an `.env` file with the next configuration (use your mysql credentials):
```
DB_HOST=mysqlhost
DB_USER=mysqluser
DB_PASSWORD=mysqlpassword
DB_DATABASE=mysqldatabasename
DB_PORT=mysqlport
PORT=apiport
PRIVATE_KEY=foo
```
3. In the source code folder cmd run `npm install`. Then, `npm run build` to convert Typescript code to Javascript Code and `npm run start` to use the API.

# Contributors
- [ConanGH-S](https://github.com/ConanGH-S)
