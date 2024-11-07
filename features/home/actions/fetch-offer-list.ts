import { ImageDTO } from "@/features/common/dtos"

export function fetchOfferList() {
  const image = {
    url: "/images/oferta.jpg",
    altText: "image offer alt",
    height: 1280,
    width: 1920,
  } satisfies ImageDTO

  return [
    {
      id: 1,
      image,
      buttonText: "Zobacz 1",
    },
    {
      id: 2,
      image,
      buttonText: "Zobacz 2",
    },
    {
      id: 3,
      image,
      buttonText: "Zobacz 3",
    },
    {
      id: 4,
      image,
      buttonText: "Zobacz 4",
    },
    {
      id: 5,
      image,
      buttonText: "Zobacz 5",
    },
    {
      id: 6,
      image,
      buttonText: "Zobacz 6",
    },
    {
      id: 7,
      image,
      buttonText: "Zobacz 7",
    },
    {
      id: 8,
      image,
      buttonText: "Zobacz 8",
    },
  ]
}
