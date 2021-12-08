

App = {
  web3Provider: null,
  contracts: {},
  web3js: null,
  standardStake: 100,
  adminAddress:'0x73837d7d736E9190821c85D40Df54451c40Bcb1e',

  init: async function() {
    await window.ethereum.enable();
    App.eventListner();
    return App.initWeb3();
  },

  initWeb3: async function() {
    if (typeof window.ethereum !== 'undefined') {
      App.web3Provider = window['ethereum']
    }
    App.web3js = new Web3 (App.web3Provider)
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('../SicilianToken.json', function(data) {
      var SicilianTokenArtifact = data;
      App.contracts.SicilianToken = TruffleContract(SicilianTokenArtifact);
      App.contracts.SicilianToken.setProvider(App.web3Provider);
      return App.getBalances();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#transferButton', App.handleTransfer);
  },

  handleTransfer: function(event) {
    event.preventDefault();

    var amount = parseInt($('#SCTTransferAmount').val());
    var toAddress = $('#SCTTransferAddress').val();

    console.log('Transfer ' + amount + ' SCT to ' + toAddress);

    var SicilianTokenInstance;

    App.web3js.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.SicilianToken.deployed().then(function(instance) {
        SicilianTokenInstance = instance;

        return SicilianTokenInstance.transfer(toAddress, amount, {from: account, gas: 100000});
      }).then(function(result) {
        alert('Transfer Successful!');
        return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getBalances: function() {
    console.log('Getting balances...');
    var SicilianTokenInstance;
    console.log(App.web3js.eth.accounts[0])
    App.web3js.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.SicilianToken.deployed().then(function(instance) {
        SicilianTokenInstance = instance;
        return SicilianTokenInstance.balanceOf(account);
      }).then(function(result) {
        balance = result.c[0];
        $('#SCTBalance').text(balance);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  eventListner: function(){
    $(document).on('click', '#stakeButton', function(){
      // console.log('hi')
      // window.location = "/game";
      App.stakeToken();
    });

    $(document).on('click', '#findGame', function(){
      // console.log('hi')
      window.location = "/game";
    });


  },

  stakeToken: function(){
    event.preventDefault();

    var SicilianTokenInstance;

    App.web3js.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.SicilianToken.deployed().then(function(instance) {
        SicilianTokenInstance = instance;

        return SicilianTokenInstance.transfer(App.adminAddress, App.standardStake, {from: account, gas: 100000});
      }).then(function(result) {
        alert('Transfer Successful!');
        return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
