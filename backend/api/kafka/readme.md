npm i

## Getting started
get latest images
```
docker-compose pull 
```

## Start services
```
docker swarm init
docker stack deploy -c docker-compose.yml kafka-demo
```

## Run demo apps
```
node consumerTest.js
node ProducerTest.js (in frontend/src/components)
```

## Stop services
docker stack remove kafka-demo
docker swarm leave