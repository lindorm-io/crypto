import { ExtendableError } from "@lindorm-io/core";

export class CryptoAssertError extends ExtendableError {
  constructor() {
    super("Invalid value provided");
  }
}
