# transaction-img
FROM node:10-alpine

WORKDIR /main
COPY ./backend/api/transaction_service.js /main
COPY ./backend/package*.json /main/

RUN npm install

EXPOSE 4002

CMD ["node", "transaction_service.js"]