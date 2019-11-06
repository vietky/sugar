FROM node:10.16.3-alpine
WORKDIR /app/
COPY package.json package-lock.json /app/
RUN npm i
COPY . /app/
ENTRYPOINT ["node", "index.js"]