#!/bin/bash
#
# based on --> https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec
# other: https://medium.freecodecamp.org/openssl-command-cheatsheet-b441be1e8c4a

openssl genrsa -des3 -out localhost_CA.key 2048

openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rotCA.pem


openssl req -new -sha256 -nodes -out server.csr -newkey rsa:2048 -keyout server.key -config <( cat server.csr.cnf )

openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days 500 -sha256 -extfile v3.ext
