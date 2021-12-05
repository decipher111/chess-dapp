const Token = artifacts.require('./TutorialToken.sol')

module.exports = async function (deployer){
    await deployer.deploy(Token)
}