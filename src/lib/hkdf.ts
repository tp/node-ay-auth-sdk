/**
 * Ported from npm package https://registry.yarnpkg.com/hkdf/-/hkdf-0.0.2.tgz#2f8db615fdef870201f82d2b619ca6d347d0647e"
 *
 * Under the Apache License 2.0 license, according to https://www.npmjs.com/package/hkdf
 */

//
// a straightforward implementation of HKDF
//
// https://tools.ietf.org/html/rfc5869
//

import * as crypto from 'crypto';

function zeros(length: number): Buffer {
  return Buffer.alloc(length, 0);
}

export class HKDF {
  private readonly hashLength: number;
  private readonly prk: Buffer;

  // imk is initial keying material
  constructor(
    private readonly hashAlg: string,
    private readonly salt: Buffer,
    private readonly ikm: string,
  ) {
    this.hashAlg = hashAlg;

    // create the hash alg to see if it exists and get its length
    var hash = crypto.createHash(this.hashAlg);
    this.hashLength = hash.digest().length;

    this.salt = salt || zeros(this.hashLength);
    this.ikm = ikm;

    // now we compute the PRK
    var hmac = crypto.createHmac(this.hashAlg, this.salt);
    hmac.update(this.ikm);
    this.prk = hmac.digest();
  }

  public derive(infoString: string, size: number): Buffer {
    let prev = Buffer.alloc(0);
    const buffers = [];
    const num_blocks = Math.ceil(size / this.hashLength);
    const info = Buffer.from(infoString);

    for (var i = 0; i < num_blocks; i++) {
      var hmac = crypto.createHmac(this.hashAlg, this.prk);
      hmac.update(prev);
      hmac.update(info);
      hmac.update(Buffer.from([i + 1]));
      prev = hmac.digest();
      buffers.push(prev);
    }
    const output = Buffer.concat(buffers, size);

    return output;
  }
}
