FROM node:16.16.0 AS build-step

WORKDIR /client
COPY package.json package-lock.json ./
RUN npm install

COPY . ./
CMD ["npm", "start"]