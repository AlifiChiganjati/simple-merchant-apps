### Create Migration

```
npx sequelize migration:generate --name Users
```

### Auto add Model and Migration at once

```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
atau
npx sequelize model:create --name User --attributes name:string,email:string,password:string,phone:string
```

### Auto Generate Database Tables

```
    npx sequelize-cli db:migrate
```

### Migrate Fresh

```
sequelize db:migrate:undo:all
sequelize db:migrate
```

### Sequelize Auto

```
sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect [dialect] -c [/path/to/config] -o [/path/to/models] -t [tableName]

sequelize-auto -o "./models" -d db_merchant -h localhost -u postgres -p 5432  -e postgres
```

### Middleware Pattern

-The middleware functions logger and authenticate wrap the route handler.
-They can execute logic before and after the route.
-The next() function passes control to the next middleware.
-app.use() mounts the middleware globally.
