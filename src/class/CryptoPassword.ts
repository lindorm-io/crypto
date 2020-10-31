import { CryptoAES } from "./CryptoAES";
import { CryptoArgon } from "./CryptoArgon";
import { CryptoAssertError } from "../error";
import { CryptoSHA } from "./CryptoSHA";
import { baseHash, baseParse } from "@lindorm-io/core";

export interface ICryptoPasswordOptions {
  aesSecret: string;
  shaSecret: string;
  hashLength?: number;
  memoryCost?: number;
  parallelism?: number;
  salt?: string;
  saltLength?: number;
  secret?: string;
  timeCost?: number;
}

export class CryptoPassword {
  private aes: CryptoAES;
  private sha: CryptoSHA;
  private argon: CryptoArgon;

  constructor(options: ICryptoPasswordOptions) {
    this.aes = new CryptoAES({
      secret: options.aesSecret,
    });
    this.sha = new CryptoSHA({
      secret: options.shaSecret,
    });
    this.argon = new CryptoArgon({
      hashLength: options.hashLength,
      memoryCost: options.memoryCost,
      parallelism: options.parallelism,
      salt: options.salt,
      saltLength: options.saltLength,
      secret: options.secret,
      timeCost: options.timeCost,
    });
  }

  public async encrypt(input: string): Promise<string> {
    const sha = this.sha.encrypt(input);
    const argon = await this.argon.encrypt(sha);
    const aes = this.aes.encrypt(argon);

    return baseHash(aes);
  }

  public async verify(input: string, signature: string): Promise<boolean> {
    const sha = this.sha.encrypt(input);
    const aes = baseParse(signature);
    const argon = this.aes.decrypt(aes);

    return this.argon.verify(sha, argon);
  }

  public async assert(input: string, signature: string): Promise<void> {
    if (await this.verify(input, signature)) {
      return;
    }

    throw new CryptoAssertError();
  }
}
