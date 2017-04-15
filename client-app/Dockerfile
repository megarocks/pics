FROM node:7

RUN npm install -g serve

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

EXPOSE 5000
CMD serve build


