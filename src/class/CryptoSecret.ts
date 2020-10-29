import { CryptoAES } from "./CryptoAES";
import { CryptoAssertError } from "../error";
import { CryptoSHA } from "./CryptoSHA";
import { baseHash, baseParse, stringComparison } from "@lindorm-io/common";

export interface ICryptoSecretOptions {
  aesSecret: string;
  shaSecret: string;
}

export class CryptoSecret {
  private aes: CryptoAES;
  private sha: CryptoSHA;

  constructor(options: ICryptoSecretOptions) {
    this.aes = new CryptoAES({
      secret: options.aesSecret,
    });

    this.sha = new CryptoSHA({
      secret: options.shaSecret,
    });
  }

  public encrypt(input: string): string {
    const sha = this.sha.encrypt(input);
    const aes = this.aes.encrypt(sha);

    return baseHash(aes);
  }

  public verify(input: string, signature: string): boolean {
    const sha = this.sha.encrypt(input);
    const aes = baseParse(signature);
    const hash = this.aes.decrypt(aes);

    return stringComparison(sha, hash);
  }

  public assert(input: string, signature: string): void {
    if (this.verify(input, signature)) {
      return;
    }

    throw new CryptoAssertError();
  }
}
