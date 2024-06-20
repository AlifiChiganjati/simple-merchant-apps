create migration
```
npx sequelize migration:generate --name Users
```

auto add model and migration at once
```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
atau
npx sequelize model:create --name User --attributes name:string,email:string,password:string,phone:string
```

auto generate database tables
```
    npx sequelize-cli db:migrate
```

migrate fresh
```
sequelize db:migrate:undo:all
sequelize db:migrate
```

sequelize auto
```
sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect [dialect] -c [/path/to/config] -o [/path/to/models] -t [tableName]

sequelize-auto -o "./models" -d db_merchant -h localhost -u postgres -p 5432  -e postgres 
```