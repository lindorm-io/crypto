import { CryptoAssertError } from "../error";
import { ICryptoArgonOptions } from "../typing";
import { argon2id, hash, verify } from "argon2";

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
    const options: Record<string, unknown> = {
      type: argon2id,
      hashLength: this.hashLength,
      memoryCost: this.memoryCost,
      parallelism: this.parallelism,
      saltLength: this.saltLength,
      timeCost: this.timeCost,
      ...(this.salt ? { salt: this.salt } : {}),
      ...(this.secret ? { secret: this.secret } : {}),
    };

    return hash(input, options);
  }

  public async verify(input: string, signature: string): Promise<boolean> {
    const options: Record<string, unknown> = {
      ...(this.secret ? { secret: this.secret } : {}),
    };

    return verify(signature, input, options);
  }

  public async assert(input: string, signature: string): Promise<void> {
    if (await this.verify(input, signature)) {
      return;
    }

    throw new CryptoAssertError();
  }
}
