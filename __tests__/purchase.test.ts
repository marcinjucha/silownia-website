import { espagoChecksumProvider } from "@/features/purchase/logic/purchase-repo"
import { calculateChecksumUseCase } from "@/features/purchase/logic/purchase-use-case"
import { createHash } from "crypto"

describe("Purchase order", () => {
  it("compute checksum", () => {
    const appId = "appid"
    const sessionId = "session_id"
    const amount = "10.10"
    const currency = "PLN"
    const secretKey = process.env.ESPAGO_SECRET_KEY

    const checksumData = `${appId}|${sessionId}|${amount}|${currency}|${secretKey}`
    const checksum = createHash("md5").update(checksumData).digest("hex")

    const result = calculateChecksumUseCase(
      { espageChecksumProvider: espagoChecksumProvider },
      { appId, amount, currency, sessionId },
    )

    if (result.success) expect(result.value).toEqual(checksum)
    else fail()
  })
})
