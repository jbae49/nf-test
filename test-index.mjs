import Nf3 from '../nightfall_3/cli/lib/nf3.mjs';
import { generateMnemonic } from 'bip39';



const nf3 = new Nf3('0x4775af73d6dc84a0ae76f8726bda4b9ecf187c377229cb39e1afa7a18236a69e', {
    clientApiUrl: "http://localhost:8080",
    optimistApiUrl: "http://localhost:8081",
    optimistWsUrl: "ws://localhost:8082",
    web3WsUrl: "ws://localhost:8546",
  });


const test = async() => {
    await nf3.init('trip differ bamboo bundle bonus luxury strike mad merry muffin nose auction');
    // await nf3.init(generateMnemonic());
    console.log(nf3.zkpKeys);

    // let's say multiple user just signed up
    const nfInstances = [];
    const employeeWallets = [];
    const numUsers = 3;

    for (let i; i < numUsers; i++ ) {

      const mnemonic = generateMnemonic();
      console.log(mnemonic);
      nfInstances.append(nf3.init(mnemonic));

      const wAddress = await nf3.zkpKeys.compressedZkpPublicKey;
      employeeWallets.push(wAddress);
    }

    

    const mnemonic = generateMnemonic();
    console.log(mnemonic);
    await nf3.init(mnemonic);
    console.log(nf3.zkpKeys.compressedZkpPublicKey);


    // deposit to pay them
    const erc20Address = await nf3.getContractAddress('ERC20Mock');
    let balance = await nf3.getLayer2Balances();
    console.log(balance);
    await nf3.deposit(erc20Address, 'ERC20', 1000000, 0, 1);
    console.log(erc20Address);

    const wAddress = await nf3.setZkpKeysFromMnemonic(mnemonic, 0);
    console.log(wAddress);

    // console.log(employeeWallets);

    


    // async deposit(erc20Address, tokenType, value, tokenId, fee = this.defaultFee);
    await nf3.deposit(erc20Address, 'ERC20', 1000000, 0, 1);


    // they are the people getting paid at once at one moment
    for (let i; i < employeeWallets.length; i++) {
      const res = await nf3.transfer(false, erc20Address, 'ERC20', 1500000, 0, employeeWallets[i], 1);
    }
  
    // check whether their balances are updated accordingly 
    balance = await nf3.getLayer2Balances(['0xa319204f9e7b7ad44dc33f93fc43dc38e529a3c0c136ecf9cdf3a9c9ca64d738']);
    console.log(balance);



    // const mnemonic = generateMnemonic();
    // console.log(mnemonic);
    // const zkpkeys_n = await nf3.setZkpKeysFromMnemonic(mnemonic, 0);
    // console.log(zkpkeys_n);

    // const erc20Address = await nf3.getContractAddress('ERC20Mock');
    // let balance = await nf3.getLayer2Balances();
    // console.log(balance);
    // console.log(erc20Address);

    // async deposit(erc20Address, tokenType, value, tokenId, fee = this.defaultFee);
    // await nf3.deposit(erc20Address, 'ERC20', 1000000, 0, 1);

    // balance = await nf3.getLayer2Balances();
    // console.log(balance);

    // const res = await nf3.transfer(false, erc20Address, 'ERC20', 1500000, 0, '0xa319204f9e7b7ad44dc33f93fc43dc38e529a3c0c136ecf9cdf3a9c9ca64d738', 1);
    // // console.log(res);  

    // balance = await nf3.getLayer2Balances(['0xa319204f9e7b7ad44dc33f93fc43dc38e529a3c0c136ecf9cdf3a9c9ca64d738']);
    // console.log(balance);

    
  }

test()