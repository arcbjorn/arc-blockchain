import { generateKeyPairSync, createSign }  from 'crypto';

import Chain from './Chain';
import Transaction from './Transaction';

export default class Wallet {
  // for recieving
  public publicKey: string;
  // for spending
  public privateKey: string;

  constructor() {
    // full encrypt algo to encrypt/decrypt to create signature
    const keypair = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });

    this.privateKey = keypair.privateKey;
    this.publicKey = keypair.publicKey;
  }

  sendMoney(amount: number, payeePublicKey: string) {
    const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

    const sign = createSign('SHA256');
    sign.update(transaction.toString()).end();

    // signature is one time password
    const signature = sign.sign(this.privateKey);
    Chain.instance.addBlock(transaction, this.publicKey, signature);
  }
}