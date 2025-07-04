FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY .env .env
RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
