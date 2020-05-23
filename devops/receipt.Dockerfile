# receipt-img
FROM node:10-alpine

WORKDIR /main
COPY ./backend/api/reciept_service.js /main
COPY ./backend/package*.json /main/

RUN npm install

EXPOSE 4004

CMD ["node", "reciept_service.js"]

