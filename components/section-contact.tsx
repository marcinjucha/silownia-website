import { Facebook, Twitter, Instagram } from "lucide-react"
const contactInformation = [
  {
    title: "Recepcja",
    phone: "+48 444 555 666",
    href: "tel:+48444555666",
  },
  {
    title: "Meneger siłowni",
    phone: "+48 333 444 999",
    href: "tel:+48333444999",
  },
  {
    title: "Strefa spa",
    phone: "+48 222 111 777",
    href: "tel:+48222111777",
  },
]

const socialMedia = [
  {
    href: "https://facebook.com",
    icon: <Facebook size={24} color="currentColor" />,
  },
  {
    href: "https://twitter.com",
    icon: <Twitter size={24} color="currentColor" />,
  },
  {
    href: "https://instagram.com",
    icon: <Instagram size={24} color="currentColor" />,
  },
]

const businessPartners = [
  {
    name: "Fundacja Sportu",
    href: "https://cnn.com/",
  },
  {
    name: "Centrum lekkoatletyczne",
    href: "https://cnn.com/",
  },
  {
    name: "Grupa XYZ",
    href: "https://cnn.com/",
  },
]

export default function SectionContact() {
  return (
    <div
      className="relative w-full bg-cover bg-center text-center text-background"
      style={{ backgroundImage: 'url("/silownia przyklad.jpeg")' }}
    >
      <div className="absolute inset-0 z-10 bg-muted opacity-70 mix-blend-multiply"></div>

      {/* Desktop */}
      <div className="relative hidden h-[80vh] overflow-hidden md:block">
        {/* Kontakt */}
        <div className="absolute left-[12%] top-1/2 z-20 -translate-y-1/2 transform rounded-2xl bg-black p-6 text-left opacity-90">
          <h3 className="my-2 text-2xl text-foreground">Dołącz do nas</h3>
          <address className="text-base not-italic text-muted ">
            <p className="underline">Progress Gym Academy</p>
            <p>ul. Robocza 10</p>
            <p>00-000 Wrocław</p>
          </address>
          <h3 className="my-2 text-2xl text-foreground">Kontakt:</h3>
          <p className="text-base">
            <a
              href="mailto:progressacademy@progress.pl"
              className="text-muted no-underline transition-colors duration-300 hover:text-primary"
            >
              progressacademy@progress.pl
            </a>
          </p>
          {contactInformation.map((contact, index) => (
            <div key={index}>
              <h4 className="my-3 text-lg text-foreground">{contact.title}</h4>
              <p className="text-base">
                <a
                  href={contact.href}
                  className="text-muted no-underline transition-colors duration-300 hover:text-primary"
                >
                  {contact.phone}
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div className="absolute bottom-[25%] right-[12%] z-20 rounded-2xl bg-background p-6 text-left opacity-80">
          <h3 className="mb-2 text-2xl text-foreground">Social Media</h3>
          <div className="mb-4 flex gap-4">
            {socialMedia.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-muted transition-colors duration-300 hover:text-primary"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <div>
            <h3 className="mb-2 text-2xl text-foreground">Nasi partnerzy</h3>
            {businessPartners.map((partner, index) => (
              <p key={index} className="text-base">
                <a
                  href={partner.href}
                  className="text-muted no-underline transition-colors duration-300 hover:text-primary"
                >
                  {partner.name}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-6 p-6 md:hidden">
        {/* Kontakt */}
        <div className="w-full max-w-md rounded-2xl bg-background p-4 text-left opacity-80">
          <h3 className="my-2 text-xl text-foreground">Dołącz do nas</h3>
          <address className="text-lg not-italic text-muted">
            <p>Progress Gym Academy</p>
            <p>ul. Robocza 10</p>
            <p>00-000 Wrocław</p>
          </address>
          <h3 className="my-2 text-xl text-foreground">Kontakt:</h3>
          <p className="text-lg">
            <a
              href="mailto:progressacademy@progress.pl"
              className="text-muted no-underline transition-colors duration-300 hover:text-primary"
            >
              progressacademy@progress.pl
            </a>
          </p>
          {contactInformation.map((contact, index) => (
            <div key={index}>
              <h4 className="my-3 text-lg text-foreground">{contact.title}</h4>
              <p className="text-lg">
                <a
                  href={contact.href}
                  className="text-muted no-underline transition-colors duration-300 hover:text-primary"
                >
                  {contact.phone}
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div className="w-full max-w-md rounded-2xl bg-background p-4 text-left opacity-80">
          <h3 className="mb-2 text-xl text-foreground">Social Media</h3>
          <div className="mb-4 flex gap-4">
            {socialMedia.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors duration-300 hover:text-primary"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <div>
            <h3 className="mb-2 text-xl text-foreground">Nasi partnerzy</h3>
            {businessPartners.map((partner, index) => (
              <p key={index} className="text-base">
                <a
                  href={partner.href}
                  className="text-muted no-underline transition-colors duration-300 hover:text-primary"
                >
                  {partner.name}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
