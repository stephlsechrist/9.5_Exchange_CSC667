# gateway-img
FROM node:10-alpine

WORKDIR /main
COPY ./backend/gateway.js /main
COPY ./backend/api /main/api
COPY ./backend/package*.json /main/

RUN npm install

EXPOSE 3004

CMD ["node", "gateway.js"]