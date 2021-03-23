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

export interface ICryptoPasswordOptions extends ICryptoArgonOptions {
  aesSecret: string;
  shaSecret: string;
}

export interface ICryptoSecretOptions {
  aesSecret: string;
  shaSecret: string;
}
