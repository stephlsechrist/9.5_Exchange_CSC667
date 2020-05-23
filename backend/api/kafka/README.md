npm i

## Getting started
get latest images
```
docker-compose pull 
```

## Start services
```
docker swarm init
docker stack deploy -c docker-compose.yml project-demo
```

## Stop services
```
docker stack remove project-demo
docker swarm leave --force
```