import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { ImageDTO } from "@/features/common/dtos"

interface ImageCarouselProps {
  images: ImageDTO[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Carousel className="my-6 w-full max-w-full">
      <CarouselContent className="-ml-1 flex">
        {images.map((image, index) => (
          <CarouselItem key={index} className="lg:basis-1/s pl-1 md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className=" flex aspect-video h-full w-full items-center justify-center p-0">
                  <Image
                    src={image.url}
                    alt={image.alternativeText}
                    width={image.width}
                    height={image.height}
                    layout="responsive"
                    objectFit="cover"
                    className="object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
