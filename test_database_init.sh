#!/usr/bin/env bash
echo "Creating mongo users..."
mongo admin --host localhost -u root -p root --eval "
db = db.getSiblingDB('test');
db.createUser({
  user: 'test',
  pwd: 'test',
  roles: [{ role: 'readWrite', db: 'test' }, { role: 'dbAdmin', db: 'test' }]
});"
echo "Mongo users created."
