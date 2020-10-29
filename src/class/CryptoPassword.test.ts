import { CryptoPassword } from "./CryptoPassword";
import { CryptoAssertError } from "../error";

describe("CryptoPassword.ts", () => {
  let instance: CryptoPassword;
  let signature: string;

  beforeEach(async () => {
    instance = new CryptoPassword({
      aesSecret: "mock-secret",
      shaSecret: "mock-secret",
    });
    signature = await instance.encrypt("string");
  });

  test("should verify", async () => {
    await expect(instance.verify("string", signature)).resolves.toBe(true);
  });

  test("should reject", async () => {
    await expect(instance.verify("wrong", signature)).resolves.toBe(false);
  });

  test("should assert", async () => {
    await expect(instance.assert("string", signature)).resolves.toBe(undefined);
  });

  test("should throw error", async () => {
    await expect(instance.assert("wrong", signature)).rejects.toStrictEqual(expect.any(CryptoAssertError));
  });
});
