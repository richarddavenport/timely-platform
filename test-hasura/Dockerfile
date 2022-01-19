FROM ubuntu:latest

RUN apt-get update -y && apt-get install -y curl socat
RUN curl -L -o /usr/local/bin/hasura https://github.com/hasura/graphql-engine/releases/download/v2.1.1/cli-hasura-linux-amd64
RUN chmod +x /usr/local/bin/hasura

WORKDIR /usr/src/hasura

COPY metadata metadata
COPY migrations migrations
COPY seeds seeds
COPY config.yaml config.yaml
COPY start.sh start.sh

RUN chmod +x ./start.sh

CMD ./start.sh
