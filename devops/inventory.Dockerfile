FROM node:10-alpine

WORKDIR /main
COPY ./backend/api/inventory_service.js /main
COPY ./backend/package*.json /main/

RUN npm install

EXPOSE 4001

CMD ["node", "inventory_service.js"]