FROM node:10-alpine

WORKDIR /main
COPY ./backend/api/socket_service.js /main
COPY ./backend/package*.json /main/

RUN npm install

EXPOSE 4200

CMD ["node", "socket_service.js"]