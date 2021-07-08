FROM node:erbium-alpine3.11
WORKDIR /src/app
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "index.js"]