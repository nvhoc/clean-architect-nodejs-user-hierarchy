FROM node:lts

# create app directory
WORKDIR /usr/src/app

# install app dependencies
COPY package.json ./
RUN yarn

# copy app source code
COPY . .

# expose port and start application
EXPOSE 3000

RUN apt-get update && apt-get install -y wget

# install dockerize (to use the dockerize's wait in docker-compose.yml)
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
