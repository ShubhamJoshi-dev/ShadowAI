import crypto from "node:crypto";

class CryptoHelper {
  private algorithm: string;

  constructor() {
    this.algorithm = "aes-256-cbc";
  }

  private createCiphertext(key: Buffer, iv: Buffer): crypto.Cipheriv {
    return crypto.createCipheriv(this.algorithm, key, iv);
  }
  private createDeCiphertext(key: Buffer, iv: Buffer): crypto.Decipheriv {
    return crypto.createDecipheriv(this.algorithm, key, iv);
  }

  public encryptKeys(text: string) {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = this.createCiphertext(key, iv);
    let encryptkeys = cipher.update(text, "utf-8", "hex");
    encryptkeys += cipher.final("hex");

    return {
      text: encryptkeys,
      key: key.toString("hex"),
      iv: iv.toString("hex"),
    };
  }
  public decryptKeys(text: string, keyhex: String, ivHex: string) {
    const key = Buffer.from(keyhex, "hex");
    const iv = Buffer.from(ivHex, "hex");

    const decipher = this.createDeCiphertext(key, iv);
    let decryptkeys = decipher.update(text, "hex", "utf-8");
    decryptkeys += decipher.final("utf-8");

    return decryptkeys;
  }
}
const cryptohelper = () => {
  return new CryptoHelper();
};

export default cryptohelper;
