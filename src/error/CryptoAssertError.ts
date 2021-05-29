import { ExtendableError } from "@lindorm-io/errors";

export class CryptoAssertError extends ExtendableError {
  public constructor() {
    super("Invalid value provided");
  }
}
