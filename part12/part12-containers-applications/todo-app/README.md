# 12.5 Connecting to backend 
```
╭─juha@JMS ~/fullstackopen/part12/part12-containers-applications/todo-app/todo-backend
╰─$ docker run -p 3000:3000 -e MONGO_URL="mongodb+srv://username:password@cluster0.featood.mongodb.net/?retryWrites=true&w=majority" -e REDIS_URL="red
is://default:password@redis-16556.c311.eu-central-1-1.ec2.cloud.redislabs.com:16556" todo-backend

> todo-express-backend@0.0.0 start
> node ./bin/www

(node:24) [DEP0170] DeprecationWarning: The URL mongodb://devjuhamikael:AGzhSYxEBP2UIVHM@ac-uhwzonm-shard-00-02.featood.mongodb.net:27017,ac-uhwzonm-shard-00-00.featood.mongodb.net:27017,ac-uhwzonm-shard-00-01.featood.mongodb.net:27017/?authSource=admin&replicaSet=atlas-r25ixs-shard-0&retryWrites=true&w=majority&ssl=true is invalid. Future versions of Node.js will throw an error.
(Use `node --trace-deprecation ...` to show where the warning was created)
GET / 200 1.895 ms - 254
GET / 200 0.514 ms - 254
GET / 200 0.342 ms - 254
GET / 200 0.219 ms - 254
GET / 200 0.252 ms - 254
GET / 200 0.318 ms - 254
```
