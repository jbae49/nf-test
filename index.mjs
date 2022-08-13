import Nf3 from '../nightfall_3/cli/lib/nf3.mjs';
import { generateMnemonic } from 'bip39';
// const chalk = require('chalk');
import chalk from 'chalk';


const test = async() => {
    
    const nf3user1 = new Nf3('0x4775af73d6dc84a0ae76f8726bda4b9ecf187c377229cb39e1afa7a18236a69e', {
        clientApiUrl: "http://localhost:8080",
        optimistApiUrl: "http://localhost:8081",
        optimistWsUrl: "ws://localhost:8082",
        web3WsUrl: "ws://localhost:8546",
      });

      const nf3user2 = new Nf3('0xd42905d0582c476c4b74757be6576ec323d715a0c7dcff231b6348b7ab0190eb', {
        clientApiUrl: "http://localhost:8080",
        optimistApiUrl: "http://localhost:8081",
        optimistWsUrl: "ws://localhost:8082",
        web3WsUrl: "ws://localhost:8546",
      });
   
    console.log(`${chalk.bold.bgGreenBright('Creating an account...')}\n`);
    await nf3user1.init('trip differ bamboo bundle bonus luxury strike mad merry muffin nose auction');
    console.log(nf3user1.zkpKeys);

    // console.log(`${chalk.cyan("Step 1: ")} Creating a source/destination account`);
    await nf3user2.init('control series album tribe category saddle prosper enforce moon eternal talk fame');
    // console.log(nf3user2.zkpKeys);
    console.log(`\n${chalk.bold.yellow('Wallet Created!')}\n`)
    

    const erc20Address = await nf3user1.getContractAddress('ERC20Mock');

    console.log(`\n${chalk.bold.cyan('----------- Current balance of a source account -----------')}`)
    let balance1 = await nf3user1.getLayer2Balances();
    console.log(balance1);

    console.log(`\n${chalk.bold.red('Depositing...')}\n`);
    await nf3user1.deposit(erc20Address, 'ERC20', 3000000, 0, 1);
    // await nf3user1.deposit(erc20Address, 'ERC20', 1000000, 0, 1);
    // await nf3user2.deposit(erc20Address, 'ERC20', 1000000, 0, 1);
    await nf3user2.deposit(erc20Address, 'ERC20', 1000000, 0, 1);
    
    console.log(`\n${chalk.bold.bgRed('Deposited!')}\n`);
    console.log(balance1);
    

    console.log(`\n${chalk.bold.magenta('----------- Current balance of a recipient account -----------')}`)
    let balance = await nf3user2.getLayer2BalancesUnfiltered();
    console.log(balance);


    console.log(`\n${chalk.bold.bgMagenta('Transferring...')}\n`);
    const res = await nf3user1.transfer(false, erc20Address, 'ERC20', 1000000, 0, '0x8b1cd14f2defec7928cc958e2dfbc86fbd3218e25a10807388a5db4b8fa4837e', 1);
    // console.log(res);  

    console.log(`\n${chalk.bold.bgRed('Transferred!')}\n`)
    // console.log(`\n${chalk.bold.magenta('----------- Updated balance of a recipient account -----------')}`)
    // console.log('-------------------------------------------------------------------------------------------')
    // console.log(balance);

  }

test()