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
      className="text-background relative w-full bg-cover bg-center text-center"
      style={{ backgroundImage: 'url("/silownia przyklad.jpeg")' }}
    >
      <div className="bg-muted absolute inset-0 z-10 opacity-70 mix-blend-multiply"></div>

      {/* Desktop */}
      <div className="relative hidden h-[65vh] overflow-hidden md:block">
        {/* Kontakt */}
        <div className="absolute top-1/2 left-[12%] z-20 -translate-y-1/2 transform rounded-2xl bg-black p-6 text-left opacity-90">
          <h3 className="text-foreground mt-2 mb-1 text-2xl">Dołącz do nas</h3>
          <address className="text-muted text-base not-italic">
            <p className="text-primary">Progress Gym Academy</p>
            <a
              href="https://maps.app.goo.gl/fYeeCqDVKYFzTsANA"
              target="_blank"
              rel="noopener noreferrer"
              className="text muted hover:text-primary no-underline transition-colors duration-300"
            >
              <p>ul. Robocza 10</p>
              <p>00-000 Wrocław</p>
            </a>
          </address>
          <h3 className="text-foreground mt-2 mb-1 text-2xl">Kontakt:</h3>
          <p className="text-base">
            <a
              href="mailto:progressacademy@progress.pl"
              className="text-muted hover:text-primary no-underline transition-colors duration-300"
            >
              progressacademy@progress.pl
            </a>
          </p>
          {contactInformation.map((contact, index) => (
            <div key={index}>
              <h4 className="text-foreground mt-3 mb-1 text-lg">{contact.title}</h4>
              <p className="text-base">
                <a
                  href={contact.href}
                  className="text-muted hover:text-primary no-underline transition-colors duration-300"
                >
                  {contact.phone}
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div className="bg-background absolute right-[12%] bottom-[25%] z-20 rounded-2xl p-6 text-left opacity-80">
          <h3 className="text-foreground mb-2 text-2xl">Social Media</h3>
          <div className="mb-4 flex gap-4">
            {socialMedia.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary text-xl transition-colors duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <div>
            <h3 className="text-foreground mb-2 text-2xl">Nasi partnerzy</h3>
            {businessPartners.map((partner, index) => (
              <p key={index} className="text-base">
                <a
                  href={partner.href}
                  className="text-muted hover:text-primary no-underline transition-colors duration-300"
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
        <div className="bg-background w-full max-w-md rounded-2xl p-4 text-left opacity-80">
          <h3 className="text-foreground my-2 text-2xl">Dołącz do nas</h3>
          <address className="text-muted text-lg not-italic">
            <p className="text-primary">Progress Gym Academy</p>
            <a
              href="https://maps.app.goo.gl/fYeeCqDVKYFzTsANA"
              target="_blank"
              rel="noopener noreferrer"
              className="text muted hover:text-primary no-underline transition-colors duration-300"
            >
              <p>ul. Robocza 10</p>
              <p>00-000 Wrocław</p>
            </a>
          </address>
          <h3 className="text-foreground mt-2 mb-1 text-xl">Kontakt:</h3>
          <p className="text-lg">
            <a
              href="mailto:progressacademy@progress.pl"
              className="text-muted hover:text-primary no-underline transition-colors duration-300"
            >
              progressacademy@progress.pl
            </a>
          </p>
          {contactInformation.map((contact, index) => (
            <div key={index}>
              <h4 className="text-foreground mt-3 mb-1 text-lg">{contact.title}</h4>
              <p className="text-lg">
                <a
                  href={contact.href}
                  className="text-muted hover:text-primary no-underline transition-colors duration-300"
                >
                  {contact.phone}
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Social Media */}
        <div className="bg-background w-full max-w-md rounded-2xl p-4 text-left opacity-80">
          <h3 className="text-foreground mb-2 text-xl">Social Media</h3>
          <div className="mb-4 flex gap-4">
            {socialMedia.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <div>
            <h3 className="text-foreground mb-2 text-xl">Nasi partnerzy</h3>
            {businessPartners.map((partner, index) => (
              <p key={index} className="text-base">
                <a
                  href={partner.href}
                  className="text-muted hover:text-primary no-underline transition-colors duration-300"
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
