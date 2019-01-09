#!/bin/bash
#
# based on --> https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec
# other: https://medium.freecodecamp.org/openssl-command-cheatsheet-b441be1e8c4a

echo 'generating CA.KEY:'
openssl genrsa -des3 -out certs/localhost_CA.key 2048
echo 'generating CA.PEM:'
openssl req -x509 -new -nodes -key certs/localhost_CA.key -sha256 -days 1024 -out certs/localhost_CA.pem -config ./gencerts_Config.cnf
echo 'generating server CSR:'
openssl req -new -sha256 -nodes -out certs/server.csr -newkey rsa:2048 -keyout certs/server.key -config <( cat ./gencerts_Config.cnf )
echo 'generating server CRT:'
openssl x509 -req -in certs/server.csr -CA certs/localhost_CA.pem -CAkey certs/localhost_CA.key -CAcreateserial -out certs/server.crt -days 500 -sha256 -extfile ./gencerts_X509v3.ext
