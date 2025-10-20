import HomeAboutDescription from "@/features/home/components/home-about-description"
import HomeHeader from "@/features/home/components/home-header"
import HomeOfferCardList from "@/features/home/components/home-offer-card-list"
import TitleDescriptionSection from "@/features/home/components/title-description-section"

export default async function Home() {
  return (
    <>
      <HomeHeader />
      <TitleDescriptionSection title="O nas">
        <HomeAboutDescription />
      </TitleDescriptionSection>
      <TitleDescriptionSection
        title="Progress Gym – Nowy Wymiar Treningu we Wrocławiu"
        description="Progress Gym to nowoczesny obiekt sportowy, który powstał z myślą o osobach szukających miejsca do kompleksowego i profesjonalnego treningu. Położony w północnej części Wrocławia, tuż przy autostradowej obwodnicy, zapewnia wygodny dojazd oraz duży, bezpłatny parking. To przestrzeń dla pasjonatów sportów walki, akrobatyki powietrznej, fitnessu, pole dance, crossfitu i siłowni – wszystko w jednym miejscu, na imponującej powierzchni 2500 m²."
      >
        <HomeOfferCardList />
      </TitleDescriptionSection>
      <TitleDescriptionSection title="Kontakt"></TitleDescriptionSection>
    </>
  )
}
