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
