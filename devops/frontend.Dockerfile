FROM node:10-alpine

WORKDIR /main
COPY ./frontend /main/frontend
COPY ./frontend/public /main/frontend/public
COPY ./frontend/src /main/frontend/src
COPY ./package*.json /main/

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]