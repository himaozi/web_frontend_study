#!bin/bash
URL=http://localhost:3000/todo-item
curl -X POST -H 'Content-Type: application/json' -d '{"message":"curl"}' $URL
curl -X DELETE -H 'Content-Type: application/json' -d '{"id":"625abdad6e38de0ed361c8c5"}' $URL
curl -X PUT -H 'Content-Type: application/json' -d '{"id":"625abdad6e38de0ed361c8c5","star":true,"completed":false}' $URL
curl -X GET -H 'Content-Type: application/json'  http://localhost:3000/todo-items