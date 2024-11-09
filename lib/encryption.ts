import { createCipheriv, createDecipheriv, randomBytes } from "crypto"

const algorithm = "aes-256-ctr"
const secretKey = Buffer.from(process.env.ENCRYPT_SECRET_KEY || "", "hex")
const iv = Buffer.from(process.env.ENCRYPT_IV || "", "hex")

export function encrypt(text: string): string {
  const val = randomBytes(16)
  const cipher = createCipheriv(algorithm, secretKey, iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return encrypted.toString("hex")
}

export function decrypt(hash: string): string {
  const encrypted = Buffer.from(hash, "hex")
  const decipher = createDecipheriv(algorithm, secretKey, iv)
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
  return decrypted.toString()
}
