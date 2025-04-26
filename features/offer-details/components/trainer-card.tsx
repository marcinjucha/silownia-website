import ImageControl, { ImageControlDTO } from "@/components/controls/image"
import TextControl, { TextControlDTO } from "@/components/controls/text"
import { Card } from "@/components/ui/card"

type TrainerCardProps = {
  image: ImageControlDTO
  title: TextControlDTO
  description: TextControlDTO
}

export default function TrainerCard({ image, title, description }: TrainerCardProps) {
  return (
    <Card className="bg-background my-2 flex flex-col items-center overflow-hidden rounded-lg border-none p-2">
      <div className="overflow-hidden">
        <ImageControl {...image} />
      </div>
      <div className="p-2">
        <TextControl className="text-primary my-2" {...title} />
        <TextControl {...description} />
      </div>
    </Card>
  )
}
