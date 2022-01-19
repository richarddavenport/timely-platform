#!/bin/bash

# Workaround for https://github.com/hasura/graphql-engine/issues/2824#issuecomment-801293056
socat TCP-LISTEN:8080,fork TCP:graphql-engine:8080 &
socat TCP-LISTEN:9695,fork,reuseaddr,bind=hasura-console TCP:127.0.0.1:9695 &
socat TCP-LISTEN:9693,fork,reuseaddr,bind=hasura-console TCP:127.0.0.1:9693 &
{
    # echo "Apply metadata changes"
    # hasura metadata apply || exit 1

    # echo "Apply migrations"
    # hasura migrate apply --all-databases || exit 1

    # echo "Reload metadata"
    # hasura metadata reload  || exit 1

    # echo "Apply seed data"
    # hasura seed apply || exit 1

    # Run console if specified
    echo "Starting console..."
    hasura console --log-level DEBUG --address "127.0.0.1" --no-browser || exit 1
}
