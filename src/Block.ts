import { createHash }  from 'crypto';

import Transaction from './Transaction';

export default class Block {

  // basic Proof of Work system
  public nonce = Math.round(Math.random() * 99999999);

  constructor(
    public prevHash: string | null,
    public transaction: Transaction,
    public ts = Date.now()
  ) {}

  get hash() {
    const str = JSON.stringify(this);
    // create hash function that uses SHA256 algorithm
    const hash = createHash('SHA256');
    // hash the block
    hash.update(str).end();
    // return hash value (link to the previous transaction)
    return hash.digest('hex');
  }
}