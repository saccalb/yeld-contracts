const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = "424377a7ed22481bbeb34bac96967b7b";
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const provider = new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${infuraKey}`)
const web3 = new Web3(provider)

const yeldOracleAddress = '0xDA014c50762A97824b28AAc490953381049F1a50'
const yeldOracleAbi = require('./build/contracts/YeldOracle.json').abi
let yeldOracle = {}
let counter = 0
let account

const start = async () => {
  account = (await web3.eth.getAccounts())[0]
  yeldOracle = new web3.eth.Contract(yeldOracleAbi, yeldOracleAddress)
  rebalance()
}
const rebalance = async () => {
  console.log('Rebalancing... ' + counter)
  yeldOracle.methods.rebalance().send({
    from: account,
  })
  counter++
}

start()

setInterval(() => {
  rebalance()
}, 24 * 60 * 60 * 1e3)