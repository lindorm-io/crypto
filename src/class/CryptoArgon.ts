import { CryptoAssertError } from "../error";
import { TObject } from "@lindorm-io/global";
import { argon2id, hash, verify } from "argon2";

export interface ICryptoArgonOptions {
  hashLength?: number;
  memoryCost?: number;
  parallelism?: number;
  salt?: string;
  saltLength?: number;
  secret?: string;
  timeCost?: number;
}

export class CryptoArgon {
  private hashLength: number;
  private memoryCost: number;
  private parallelism: number;
  private salt: Buffer;
  private saltLength: number;
  private secret: Buffer;
  private timeCost: number;

  constructor(options?: ICryptoArgonOptions) {
    this.hashLength = options?.hashLength || 128;
    this.memoryCost = options?.memoryCost || 128;
    this.parallelism = options?.parallelism || 2;
    this.saltLength = options?.saltLength || 128;
    this.timeCost = options?.timeCost || 32;

    this.salt = options?.salt && Buffer.from(options.salt);
    this.secret = options?.secret && Buffer.from(options.secret);
  }

  public async encrypt(input: string): Promise<string> {
    const options: TObject<any> = {
      type: argon2id,
      hashLength: this.hashLength,
      memoryCost: this.memoryCost,
      parallelism: this.parallelism,
      saltLength: this.saltLength,
      timeCost: this.timeCost,
    };

    if (this.salt) options.salt = this.salt;
    if (this.secret) options.secret = this.secret;

    return hash(input, options);
  }

  public async verify(input: string, signature: string): Promise<boolean> {
    const options: TObject<any> = {};

    if (this.secret) options.secret = this.secret;

    return verify(signature, input, options);
  }

  public async assert(input: string, signature: string): Promise<void> {
    if (await this.verify(input, signature)) {
      return;
    }

    throw new CryptoAssertError();
  }
}
