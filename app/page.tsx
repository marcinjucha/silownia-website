import HomeAboutDescription from "@/features/home/components/home-about-description"
import TitleDescriptionSection from "@/features/home/components/title-description-section"
import HomeHeader from "@/features/home/components/home-header"
import HomeOfferCardList from "@/features/home/components/home-offer-card-list"

export default async function Home() {
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
        <HomeOfferCardList />
      </TitleDescriptionSection>
      <TitleDescriptionSection title="Kontakt"></TitleDescriptionSection>
    </>
  )
}
