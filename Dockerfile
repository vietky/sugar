FROM node:10.16.3-alpine
WORKDIR /app/
COPY package.json package-lock.json /app/
RUN npm i
COPY . /app/
EXPOSE 3000
ENTRYPOINT ["node", "index.js"]