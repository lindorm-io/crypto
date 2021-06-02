export interface CryptoAESOptions {
  secret: string;
}

export interface CryptoArgonOptions {
  hashLength?: number;
  memoryCost?: number;
  parallelism?: number;
  salt?: string;
  saltLength?: number;
  secret?: string;
  timeCost?: number;
}

export interface CryptoSHAOptions {
  secret: string;
}

export interface CryptoLayeredOptions {
  aes: CryptoAESOptions;
  argon?: CryptoArgonOptions;
  sha: CryptoSHAOptions;
}

export interface CryptoSecretOptions {
  aes: CryptoAESOptions;
  sha: CryptoSHAOptions;
}
