import { Nf3 } from 'nf3';

console.log(Nf3)

const nf3 = new Nf3('0x4775af73d6dc84a0ae76f8726bda4b9ecf187c377229cb39e1afa7a18236a69e', {
  clientApiUrl: "http://localhost:8080",
  optimistApiUrl: "http://localhost:8081",
  optimistWsUrl: "ws://localhost:8082",
  web3WsUrl: "ws://localhost:8546",
});

const start = () => {
  try {
    console.log('hello');
    await nf3.init(
      'trip differ bamboo bundle bonus luxury strike mad merry muffin nose auction',
      'optimist',
    );

    const erc20Address = await nf3.getContractAddress('ERC20Mock');
    let balance = await nf3.getLayer2Balances();
    console.log(balance);

    await nf3.deposit(erc20Address, 'ERC20', 1, 0, 1);

    balance = await nf3.getLayer2Balances();
    console.log(balance);


  } catch (err) {
    console.log(err);
  }
};

start()