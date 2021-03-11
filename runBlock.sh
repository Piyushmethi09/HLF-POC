cd test-network
./network.sh down
./network.sh up createChannel -ca
./network.sh deployCC -ccn basic -ccl javascript

cd ..
cd asset-transfer-basic/application-javascript
rm -rf node_modules
npm install
rm -rf wallet
node enrollAdmin.js
node registerUser.js 
nodemon server.js 