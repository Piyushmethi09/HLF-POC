/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
const channelName = "mychannel";
const contractName="basic"

exports.createAssets = async function (req, res, next) {
    let assetId = 'asset'+Math.floor(Math.random() * 90 + 10)
    console.log("---->add--",req.body,"----")
    let colour = req.body.colour
    let size = req.body.size
    let name=req.body.name
    let appraisedValue=req.body.appraisedValue
    if(!assetId || !colour || !size || !name || !appraisedValue){
        res.send({status:400,msg:"keys are missing"})
    }
     let args = [assetId, colour, size, name, appraisedValue];

     Invoke("CreateAsset", args, res);
}
exports.updateAssets = async function (req, res, next) {
    let assetId = req.params.id
   console.log("---->updat--",req.body,"----")
    let colour = req.body.colour
    let size = req.body.size
    let name=req.body.name
    let appraisedValue=req.body.appraisedValue
    if(!assetId || !colour || !size || !name || !appraisedValue){
        res.send({status:400,msg:"keys are missing"})
    }else{
     let args = [assetId, colour, size, name, appraisedValue];

     Invoke("UpdateAsset", args, res);
    }
}
exports.InitNetwork = async function (req, res, next) {
	
    Invoke("InitLedger", [],res);
}

exports.getList = async function (req, res, next) {
    
    QueryAll("GetAllAssets",res);
}
exports.getAssetsById = async function (req, res, next) {
   if(req.params.id){
   
    let args = [req.params.id ];

    Query("ReadAsset",args,res)
   }else{
    res.send({status:400,msg:"Id is missing"})
   }
}
async function Invoke(funcName,args,res){
   
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('user');
        if (!identity) {
            console.log(`An identity for the user user does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(contractName);
         if(args.length == 0){
  
            await contract.submitTransaction(funcName);   
        } 
        else if(args.length == 5){
           
            await contract.submitTransaction(funcName,args[0],args[1],args[2],args[3],args[4]);
        }  
        console.log({message:'Success'});
         res.send({status:200,message:'Success'});

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`failure from Invoke: ${error}`);
        res.send(`error: ${error}`);

    }
}
async function QueryAll(funcName,res){
   
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('user');
        if (!identity) {
            console.log(`An identity for the user user does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(contractName);

            
        let result = await contract.evaluateTransaction(funcName);
 result = JSON.parse(result)
        
        res.send({status:200,data:result});

    } catch (error) {
        console.error(`failure at QueryAll : ${error}`);
        res.send({status:500,msg:"Something went wrong at server side"});

    }
}
async function Query(funcName,args,res){
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('user');
        if (!identity) {
            console.log(`An identity for the user user1does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(contractName);

        if(args.length == 1 ){
           
        const result = await contract.evaluateTransaction(funcName,args[0]);
       
       let data= JSON.parse(result)
      
        res.send({status:200,data});
        }

    } catch (error) {
        console.error(`failure from Query : ${error}`);
        res.send({status:500,error:error});

    }
}