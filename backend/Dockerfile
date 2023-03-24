FROM node:16-alpine

WORKDIR /app-folder

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD ["npm", "start"]