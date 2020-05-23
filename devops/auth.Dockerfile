FROM node:10-alpine

WORKDIR /main
COPY ./backend/api/auth_service.js /main
COPY ./backend/package*.json /main/

RUN npm install

EXPOSE 4000

CMD ["node", "auth_service.js"]