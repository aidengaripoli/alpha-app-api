#!/usr/bin/env bash
echo "Creating mongo users..."
mongo admin --host localhost -u mongoadmin -p adminpass --eval "
db = db.getSiblingDB('alpha');
db.createUser({
  user: 'node',
  pwd: 'secret',
  roles: [{
    role: 'readWrite',
    db: 'alpha'
  }]
});"
echo "Mongo users created."
