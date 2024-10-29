import { fetchOfferDetailsFromCMS } from "@/repos/offer-details-repo"
import { fetchOfferDetailsUseCase } from "@/use-cases/offer-details-use-case"
import { redirect } from "next/navigation"

const sportsData = {
  mma: {
    id: "mma",
    sections: [
      {
        title: "MMA for Beginners",
        subtitle: "Start your journey",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageSrc: "/sp1.jpg",
      },
      {
        title: "Advanced MMA Classes",
        subtitle: "Push your limits",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageSrc: "/sp8.jpg",
      },
      {
        title: "Meet Our MMA Coach",
        subtitle: "Train with the best",
        text: "Our experienced coaches will guide you through every step...",
        imageSrc: "/sp9.jpg",
      },
    ],

    carouselImages: [
      { src: "/sp4.jpg", width: 500, height: 300, alt: "opis" },
      { src: "/sp9.jpg", width: 800, height: 400, alt: "opis-1" },
      { src: "/sp1.jpg", width: 500, height: 600, alt: "opis-2" },
      { src: "/sp5.jpg", width: 700, height: 400, alt: "opis-3" },
    ],
  },
  fitness: {
    id: "fitness",
    sections: [
      {
        title: "Advanced Fitness Classes",
        subtitle: "Push your limits",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
        imageSrc: "/sp9.jpg",
      },
      {
        title: "Fitness for Everyone",
        subtitle: "Stay in shape",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageSrc: "/sp6.jpg",
      },
    ],

    carouselImages: [
      { src: "/sp.jpg", width: 500, height: 300, alt: "opis" },
      { src: "/sp5.jpg", width: 800, height: 300, alt: "opis-1" },
      { src: "/sp7.jpg", width: 500, height: 600, alt: "opis-2" },
    ],
  },
  akrobatyka: {
    id: "akrobatyka",
    sections: [
      {
        title: "Akrobatyka",
        subtitle: "Start your journey",
        text: "Akrobatyka offers a unique way to build strength and flexibility...",
        imageSrc: "/sp.jpg",
      },
      {
        title: "Advanced Siłownia",
        subtitle: "Take it to the next level",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageSrc: "/sp6.jpg",
      },
    ],

    carouselImages: [
      { src: "/sp.jpg", width: 500, height: 300, alt: "opis" },
      { src: "/sp9.jpg", width: 800, height: 400, alt: "opis1" },
      { src: "/sp8.jpg", width: 500, height: 600, alt: "opis2" },
      { src: "/sp3.jpg", width: 700, height: 400, alt: "opis3" },
    ],
  },
  "pole-dance": {
    id: "pole-dance",
    sections: [
      {
        title: "Pole Dance",
        subtitle: "Start your journey",
        text: "Pole dance offers a unique way to build strength and flexibility...",
        imageSrc: "/sp3.jpg",
      },
      {
        title: "Advanced Pole Dance",
        subtitle: "Take it to the next level",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageSrc: "/sp5.jpg",
      },
    ],

    carouselImages: [
      { src: "/sp4.jpg", width: 500, height: 300, alt: "opis" },
      { src: "/sp6.jpg", width: 800, height: 300, alt: "opis-1" },
      { src: "/sp.jpg", width: 500, height: 600, alt: "opis-2" },
      { src: "/sp2.jpg", width: 500, height: 300, alt: "opis-3" },
      { src: "/sp9.jpg", width: 500, height: 600, alt: "opis-4" },
    ],
  },
  "kolo-gimnastyczne": {
    id: "kolo-gimnastyczne",
    sections: [
      {
        title: "Koło gimnastyczne",
        subtitle: "Master your skills",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageSrc: "/sp.jpg",
      },
      {
        title: "Advanced Gymnastics",
        subtitle: "Push beyond limits",
        text: "Our advanced gymnastics program is designed for those looking to perfect their routines...",
        imageSrc: "/sp4.jpg",
      },
      {
        title: "Meet the Coach",
        subtitle: "Train with a professional",
        text: "Our professional coaches will help you achieve your gymnastics goals a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageSrc: "/sp2.jpg",
      },
    ],

    carouselImages: [
      { src: "/sp1.jpg", width: 500, height: 300, alt: "mma-img1" },
      { src: "/sp8.jpg", width: 800, height: 400, alt: "opis" },
      { src: "/sp4.jpg", width: 500, height: 600, alt: "opisimg" },
    ],
  },
  silownia: {
    id: "silownia",
    sections: [
      {
        title: "Siłownia",
        subtitle: "Start your journey",
        text: "Siłownia offers a unique way to build strength and flexibility...",
        imageSrc: "/sp6.jpg",
      },
      {
        title: "Advanced Siłownia",
        subtitle: "Take it to the next level",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        imageSrc: "/sp.jpg",
      },
    ],

    carouselImages: [
      { src: "/sp4.jpg", width: 500, height: 300, alt: "opis" },
      { src: "/sp6.jpg", width: 800, height: 300, alt: "opis-1" },
      { src: "/sp.jpg", width: 500, height: 600, alt: "opis-2" },
      { src: "/sp2.jpg", width: 500, height: 300, alt: "opis-3" },
      { src: "/sp9.jpg", width: 500, height: 600, alt: "opis-4" },
    ],
  },
}

export function fetchOffer(id: string) {
  const result = fetchOfferDetailsUseCase(
    {
      fetch: fetchOfferDetailsFromCMS,
    },
    id,
  )

  // if (result.success) {
  //   // ofeta znaleziona
  //   return result.value
  // }
  // // przeniesienie do strony z ofertami, bo ktoś próbuje załadować
  // // ofertę która nie istnieje
  // // redirect("/oferty")

  return sportsData[id as keyof typeof sportsData] || null
}
