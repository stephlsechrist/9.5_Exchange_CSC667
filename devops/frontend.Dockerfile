FROM node:10-alpine

WORKDIR /main
COPY ./frontend/public/ /main/public/
COPY ./src/ /main/src/
COPY ./package*.json/ /main/

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]