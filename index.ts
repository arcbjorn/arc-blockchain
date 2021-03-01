import Chain from './src/Chain';
import Wallet from './src/Wallet';

const dmitry = new Wallet();
const arc = new Wallet();
const x = new Wallet();

dmitry.sendMoney(5, arc.publicKey);
arc.sendMoney(10, x.publicKey);
x.sendMoney(15, arc.publicKey);

console.log(Chain.instance);
