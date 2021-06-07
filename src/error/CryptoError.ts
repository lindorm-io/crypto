import { ExtendableError, ExtendableErrorOptions } from "@lindorm-io/errors";

export class CryptoError extends ExtendableError {
  public constructor(message: string, options?: ExtendableErrorOptions) {
    super(message, options);
  }
}
