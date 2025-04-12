import { gql } from "@apollo/client"
import { Button } from "@/components/ui/button"
import {
  ImageControl,
  ImageControlDTO,
  ImageControlFields,
  ImageProps,
  mapToImageProps,
} from "@/components/controls/image"
import { cn } from "@/lib/utils"

export const ButtonControlFields = gql`
  fragment ButtonControlFields on ComponentControlsButton {
    __typename
    variant
    size
    text
    icon {
      ...ImageControlFields
    }
  }
`

export type ButtonVariant = "destructive" | "default" | "outline" | "secondary" | "ghost" | "link"
export type ButtonSize = "default" | "sm" | "lg" | "icon"

export type ButtonDTO = {
  variant: ButtonVariant
  size: ButtonSize
  text: string
  icon?: ImageControlDTO
}

export type ButtonProps = {
  variant: ButtonVariant
  size: ButtonSize
  text: string
  icon?: ImageProps
  className?: string
  onClick?: () => void
}

export function mapToButtonProps(dto: ButtonDTO): ButtonProps {
  return { ...dto, icon: dto.icon ? mapToImageProps(dto.icon) : undefined }
}

export function ButtonControl({ variant, size, text, icon, className, onClick }: ButtonProps) {
  return (
    <Button variant={variant} size={size} className={cn("gap-2", className)} onClick={onClick}>
      {icon && <ImageControl {...icon} />}
      {text}
    </Button>
  )
}

export default ButtonControl
