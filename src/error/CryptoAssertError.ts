import { ExtendableError } from "@lindorm-io/errors";

export class CryptoAssertError extends ExtendableError {
  constructor() {
    super("Invalid value provided");
  }
}
