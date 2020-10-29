import { ExtendableError } from "@lindorm-io/global";

export class CryptoAssertError extends ExtendableError {
  constructor() {
    super("Invalid value provided");
  }
}
