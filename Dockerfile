FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 9000

CMD ["npx", "http-server", "docs"]