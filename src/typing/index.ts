export interface ICryptoAESOptions {
  secret: string;
}

export interface ICryptoArgonOptions {
  hashLength?: number;
  memoryCost?: number;
  parallelism?: number;
  salt?: string;
  saltLength?: number;
  secret?: string;
  timeCost?: number;
}

export interface ICryptoSHAOptions {
  secret: string;
}

export interface ICryptoLayeredOptions {
  aes: ICryptoAESOptions;
  argon?: ICryptoArgonOptions;
  sha: ICryptoSHAOptions;
}

export interface ICryptoSecretOptions {
  aes: ICryptoAESOptions;
  sha: ICryptoSHAOptions;
}
