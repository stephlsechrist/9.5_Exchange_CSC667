# FROM node:10-alpine
# frontend-img
FROM express-gateway

WORKDIR /main
COPY ./frontend /main/frontend
COPY ./frontend/public /main/public
COPY ./frontend/src /main/src
COPY ./package*.json /main/
RUN npm install
COPY ./frontend/package*.json /main/frontend/
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]