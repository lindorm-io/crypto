import { CryptoSHA } from "./CryptoSHA";
import { CryptoAssertError } from "../error";

describe("CryptoSHA.ts", () => {
  let instance: CryptoSHA;
  let signature: string;

  beforeEach(() => {
    instance = new CryptoSHA({
      secret: "mock-secret",
    });
    signature = instance.encrypt("string");
  });

  test("should verify", () => {
    expect(instance.verify("string", signature)).toBe(true);
  });

  test("should reject", () => {
    expect(instance.verify("wrong", signature)).toBe(false);
  });

  test("should assert", () => {
    expect(instance.assert("string", signature)).toBeUndefined();
  });

  test("should throw error", () => {
    expect(() => instance.assert("wrong", signature)).toThrow(expect.any(CryptoAssertError));
  });
});
