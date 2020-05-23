FROM node:10-alpine

WORKDIR /main
COPY ./backend/api/stats.js /main
COPY ./backend/package*.json /main/

RUN npm install

EXPOSE 3001

CMD ["node", "stats.js"]