#!/bin/bash

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M")
BACKUP_DIR="./backups"

mkdir -p "$BACKUP_DIR"

docker exec sentit-postgres-1 \
  pg_dump -U postgres -d sentit \
  | gzip > "$BACKUP_DIR/sentit_$TIMESTAMP.sql.gz"

echo "Backup created: $BACKUP_DIR/sentit_$TIMESTAMP.sql.gz"

find "$BACKUP_DIR" -type f -name "sentit_*.sql.gz" \
  -printf '%T@ %p\n' |
  sort -nr |
  tail -n +8 |
  cut -d' ' -f2- |
  xargs -r rm -f

echo "Backup cleanup complete. Keeping latest 7 backups."
