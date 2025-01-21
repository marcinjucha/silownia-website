import { PurchaseOrderFormDTO } from "@/features/purchase/logic/purchase-type"
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"
import React from "react"
import config from "./tailwind.email.config"

const baseUrl = process.env.HOST_URL ? `${process.env.HOST_URL}` : ""

const PurchaseConfirmationEmail = ({ purchase }: { purchase: PurchaseOrderFormDTO }) => {
  const { email, firstName, lastName, paymentId, otherNotes, products } = purchase
  const logoURL = `${baseUrl}/images/logo_zlote.svg`

  const calculateTotal = () => {
    const productsTotal = products.reduce((total, product) => total + product.totalPrice, 0)

    return productsTotal.toFixed(2)
  }

  const previewText = `Potwierdzenie zamówienia nr ${paymentId}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind config={config}>
        <Body className="mx-auto my-auto bg-gray-50 px-4 font-sans">
          <Container className="mx-auto my-[40px] max-w-[600px] rounded border border-solid border-[#eaeaea] bg-white p-[30px]">
            {/* Logo */}
            <Section className="mb-6 text-center">
              <Img src={logoURL} alt="Logo Progress Gym" width="300" height="auto" />
            </Section>

            <Heading className="mx-0 my-16  p-0 text-center text-[24px] font-normal text-black">
              Zamówienie {paymentId}
            </Heading>

            <Text className="text-[14px] leading-5 text-black">
              Cześć {firstName} {lastName},
            </Text>
            <Text className="text-[14px] leading-5 text-black">
              Dziękujemy, że dołączyłeś do naszej społeczności{" "}
              <Link href={baseUrl} className="text-[16px] text-primary no-underline">
                Progress Gym Academy
              </Link>
              . Poniżej znajdują się szczegóły Twojego zamówienia.
            </Text>
            <Text className="text-[14px] leading-5 text-black">
              Teraz wystarczy, że przyjdziesz do nas z potwierdzeniem, a my zajmiemy się resztą. Do
              zobaczenia!
            </Text>

            <Section className="mt-12">
              <table className="w-full text-left text-sm text-gray-700">
                <thead>
                  <tr className="border-b font-semibold">
                    <th className="py-2">Produkt</th>
                    <th className="py-2">Cena</th>
                    <th className="py-2 text-center">Ilość</th>
                    <th className="py-2 text-center">Wartość</th>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <Hr className="my-[1px] border-t-2 border-gray-300" />
                    </td>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product, index) => (
                    <React.Fragment key={index}>
                      <tr className="border-b">
                        <td className="py-2">{product.name}</td>
                        <td className="py-2">{product.price.toFixed(2)}zł</td>
                        <td className="py-2 text-center">{product.quantity}</td>
                        <td className="py-2 text-center">{product.totalPrice.toFixed(2)}zł</td>
                      </tr>

                      <tr>
                        <td colSpan={4}>
                          <Hr className="my-[1px] border-t-2 border-gray-300" />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </Section>

            <Section className="m text-right">
              <Text className="text-lg font-semibold">
                Wartość zamówienia: <span className="ml-4">{calculateTotal()} zł</span>
              </Text>
              <Hr className="my-[16px] border-t-2 border-gray-300" />
            </Section>

            <Section className="text-xs">
              <Heading as="h2" className="">
                Dane zamawiającego:
              </Heading>
              <Text className="">
                Imię: {firstName}
                <br />
                Nazwisko: {lastName}
                <br />
                Email: {email}
              </Text>
            </Section>

            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Section className="my-6 text-xs">
              <Text>
                Jeśli potrzebujesz pomocy lub masz jakiekolwiek pytania, skontaktuj się z nami{" "}
                <Link href="tel:+48500500500" className="text-primary no-underline">
                  +48 500-500-500
                </Link>{" "}
                lub napisz do nas na{" "}
                <Link href="mailto:biuro@progressgym.pl" className="text-primary no-underline">
                  biuro@progressgym.pl
                </Link>
              </Text>
            </Section>
            <Section className="text-center">
              <table className="w-full">
                <tr className="w-full">
                  <td align="center">
                    <Img src={logoURL} alt="Logo Progress Gym" width="180" height="auto" />
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <Row className="table-cell h-[44px] w-[56px] align-bottom">
                      <Column className="pr-[8px]">
                        <Link href="https://www.facebook.com/">
                          <Img
                            alt="Facebook"
                            height="36"
                            src="https://react.email/static/facebook-logo.png"
                            width="36"
                          />
                        </Link>
                      </Column>
                      <Column className="pr-[8px]"></Column>
                      <Column>
                        <Link href="https://www.instagram.com/">
                          <Img
                            alt="Instagram"
                            height="36"
                            src="https://react.email/static/instagram-logo.png"
                            width="36"
                          />
                        </Link>
                      </Column>
                    </Row>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <Link
                      href="https://maps.app.goo.gl/4YoQqrxbzPLv2Yda8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary no-underline"
                    >
                      ul. Wrocławska 9, 00-000 Wrocław
                    </Link>
                  </td>
                </tr>
              </table>
              <Text className="text-sm">
                Dodatkowe informacje znajdziesz na naszej stronie internetowej{" "}
                <Link href={baseUrl} className="text-primary no-underline">
                  www.progressgymacademy.pl .
                </Link>
              </Text>
              <Hr className="my-[16px] border-t-2 border-gray-300" />
              <Text className="text-center text-xs text-muted">
                Prosimy nie odpowiadać na tego maila. Został wygenerowany automatycznie przez
                system.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

PurchaseConfirmationEmail.PreviewProps = {
  purchase: {
    paymentId: "123456",
    checksum: "12312312",
    firstName: "Jan",
    lastName: "Kowalski",
    email: "jan.kowalski@example.com",
    otherNotes: undefined,
    products: [
      { name: "Karnet miesięczny", price: 120, quantity: 1, totalPrice: 120 * 1 },
      { name: "Karnet ", price: 110, quantity: 1, totalPrice: 110 * 1 },
      { name: "Trening personalny", price: 250, quantity: 2, totalPrice: 250 * 2 },
    ],
  } satisfies PurchaseOrderFormDTO,
}

export default PurchaseConfirmationEmail
