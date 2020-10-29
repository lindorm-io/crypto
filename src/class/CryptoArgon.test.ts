import { CryptoArgon } from "./CryptoArgon";
import { CryptoAssertError } from "../error";

describe("CryptoArgon.ts", () => {
  let instance: CryptoArgon;
  let signature: string;

  describe("with default options", () => {
    beforeEach(async () => {
      instance = new CryptoArgon();
      signature = await instance.encrypt("string");
    });

    test("should generate signature", async () => {
      expect(signature.length).toBe(373);
    });

    test("should verify", async () => {
      await expect(instance.verify("string", signature)).resolves.toBe(true);
    });

    test("should reject", async () => {
      await expect(instance.verify("wrong", signature)).resolves.toBe(false);
    });

    test("should throw error", async () => {
      await expect(instance.assert("wrong", signature)).rejects.toStrictEqual(expect.any(CryptoAssertError));
    });
  });

  describe("with hashLength", () => {
    beforeEach(async () => {
      instance = new CryptoArgon({
        hashLength: 32,
      });
      signature = await instance.encrypt("string");
    });

    test("should generate signature", async () => {
      expect(signature.length).toBe(245);
    });

    test("should verify", async () => {
      await expect(instance.verify("string", signature)).resolves.toBe(true);
    });

    test("should reject", async () => {
      await expect(instance.verify("wrong", signature)).resolves.toBe(false);
    });

    test("should throw error", async () => {
      await expect(instance.assert("wrong", signature)).rejects.toStrictEqual(expect.any(CryptoAssertError));
    });
  });

  describe("with parallelism", () => {
    beforeEach(async () => {
      instance = new CryptoArgon({
        parallelism: 1,
      });
      signature = await instance.encrypt("string");
    });

    test("should generate signature", async () => {
      expect(signature.length).toBe(373);
    });

    test("should verify", async () => {
      await expect(instance.verify("string", signature)).resolves.toBe(true);
    });

    test("should reject", async () => {
      await expect(instance.verify("wrong", signature)).resolves.toBe(false);
    });

    test("should throw error", async () => {
      await expect(instance.assert("wrong", signature)).rejects.toStrictEqual(expect.any(CryptoAssertError));
    });
  });

  describe("with salt", () => {
    beforeEach(async () => {
      instance = new CryptoArgon({
        salt: "45d7ac72e76f242b20b77b9bf9bf9d5915894e669a24e6c6",
      });
      signature = await instance.encrypt("string");
    });

    test("should generate signature", async () => {
      expect(signature.length).toBe(266);
    });

    test("should verify", async () => {
      await expect(instance.verify("string", signature)).resolves.toBe(true);
    });

    test("should reject", async () => {
      await expect(instance.verify("wrong", signature)).resolves.toBe(false);
    });

    test("should throw error", async () => {
      await expect(instance.assert("wrong", signature)).rejects.toStrictEqual(expect.any(CryptoAssertError));
    });
  });

  describe("with saltLength", () => {
    beforeEach(async () => {
      instance = new CryptoArgon({
        saltLength: 32,
      });
      signature = await instance.encrypt("string");
    });

    test("should generate signature", async () => {
      expect(signature.length).toBe(245);
    });

    test("should verify", async () => {
      await expect(instance.verify("string", signature)).resolves.toBe(true);
    });

    test("should reject", async () => {
      await expect(instance.verify("wrong", signature)).resolves.toBe(false);
    });

    test("should throw error", async () => {
      await expect(instance.assert("wrong", signature)).rejects.toStrictEqual(expect.any(CryptoAssertError));
    });
  });

  describe("with secret", () => {
    beforeEach(async () => {
      instance = new CryptoArgon({
        secret: "secret",
      });
      signature = await instance.encrypt("string");
    });

    test("should generate signature", async () => {
      expect(signature.length).toBe(373);
    });

    test("should verify", async () => {
      await expect(instance.verify("string", signature)).resolves.toBe(true);
    });

    test("should reject", async () => {
      await expect(instance.verify("wrong", signature)).resolves.toBe(false);
    });

    test("should throw error", async () => {
      await expect(instance.assert("wrong", signature)).rejects.toStrictEqual(expect.any(CryptoAssertError));
    });

    test("should reject on wrong secret", async () => {
      const instance2 = new CryptoArgon({
        secret: "wrong",
      });

      await expect(instance2.verify("string", signature)).resolves.toBe(false);
    });
  });

  describe("with timeCost", () => {
    beforeEach(async () => {
      instance = new CryptoArgon({
        timeCost: 4,
      });
      signature = await instance.encrypt("string");
    });

    test("should generate signature", async () => {
      expect(signature.length).toBe(372);
    });

    test("should verify", async () => {
      await expect(instance.verify("string", signature)).resolves.toBe(true);
    });

    test("should reject", async () => {
      await expect(instance.verify("wrong", signature)).resolves.toBe(false);
    });

    test("should throw error", async () => {
      await expect(instance.assert("wrong", signature)).rejects.toStrictEqual(expect.any(CryptoAssertError));
    });
  });
});
