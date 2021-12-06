const Token = artifacts.require('./SicilianToken.sol')

module.exports = async function (deployer){
    await deployer.deploy(Token)
}