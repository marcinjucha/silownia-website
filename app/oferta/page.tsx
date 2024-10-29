import ImageWithButton from "../../components/image-with-button"
import ImageText from "../../components/image-text"
import { fetchSports } from "./_action/fetch-sports"

export default function Home() {
  const sports = fetchSports()

  return (
    <>
      <div>
        {sports.map((sport, index) => (
          <ImageText
            key={sport.id}
            title={sport.title}
            subtitle={sport.subtitle}
            text={sport.text}
            imageSrc={sport.imageSrc}
            buttonLabel="Dowiedz się więcej..."
            linkUrl={`/oferta/${sport.id}`}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>

      <ImageWithButton alt="sport" buttonLabel="Kup karnet" imageSrc="/sp9.jpg" linkUrl="/oferta" />
    </>
  )
}
