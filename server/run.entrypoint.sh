# npm run rollback-all
# npm run migrate

run.prod.sh &
run.prod.sh email-worker
# & ./run.prod.sh email-cron
