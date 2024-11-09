// Zmiany na potrzeby prezenrtacji wizualnej dla klienta/ 1. Zakoemntowanie importu i funkcji fetchOfferlist. 2. Dodanie importu Cards.

// import { fetchOfferList } from "@/features/home/actions/fetch-offer-list"
import Cards from "@/features/layout/cards"

// Koniec zmoian
import HomeAboutDescription from "@/features/home/components/home-about-description"
import TitleDescriptionSection from "@/features/home/components/title-description-section"
import HomeHeader from "@/features/home/components/home-header"
import HomeOfferCard from "@/features/home/components/home-offer-card"

export default async function Home() {
  // Zakomentowana na potrzeby prezentacji dla klienta
  // const offers = await fetchOfferList()

  // koniec

  return (
    <>
      <HomeHeader />
      <TitleDescriptionSection title="O nas">
        <HomeAboutDescription />
      </TitleDescriptionSection>
      <TitleDescriptionSection
        title="Zobacz naszą ofertę"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt quis nemo placeat architecto earum magni esse harum repellat nostrum cum, iure error quos hic provident. Neque eaque asperiores sequi fugit?"
      >
        {/* zakomentowane na potrzeby prezentacji dla klienta i wstawiony komponent Cards */}

        {/* <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map(offer => (
            <HomeOfferCard key={offer.id} image={offer.image} buttonText={offer.buttonText} />
          ))}
        </div> */}
        <Cards />

        {/* koniec komentarza */}
      </TitleDescriptionSection>
      <TitleDescriptionSection title="Kontakt"></TitleDescriptionSection>
    </>
  )
}
