#!bin/bash
URL=http://localhost:3000/todo-item
curl -X POST -H 'Content-Type: application/json' -d '{"id":"12345678","message":"curl"}' $URL
curl -X GET -H 'Content-Type: application/json'  http://localhost:3000/todo-items
curl -X GET -H 'Content-Type: application/json'  http://localhost:3000/todo-item/12345678
curl -X PUT -H 'Content-Type: application/json' -d '{"id":"12345678","star":true,"completed":false}' $URL
curl -X DELETE -H 'Content-Type: application/json' http://localhost:3000/todo-item/1650682335490
