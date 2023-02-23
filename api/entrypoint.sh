#!/bin/bash
set -e

rm -f /cloud-vision-sample/tmp/pids/server.pid

rails db:create
rails db:migrate
rails db:seed

exec "$@"