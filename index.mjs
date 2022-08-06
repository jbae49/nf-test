import {Nf3} from 'nf3';


const nf3 = new Nf3('0x4775af73d6dc84a0ae76f8726bda4b9ecf187c377229cb39e1afa7a18236a69e', {
    clientApiUrl: "http://localhost:8080",
    optimistApiUrl: "http://localhost:8081",
    optimistWsUrl: "ws://localhost:8082",
    web3WsUrl: "ws://localhost:8546",
  });
  
const test = async()=>{
const Nf3ins = nf3.init();
}
test()