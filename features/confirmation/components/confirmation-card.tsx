import Link from "next/link"
import * as React from "react"
import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ConfirmationCardProps {
  title: string
  subtitle: string
  secondarySubtitle?: string
  message?: string
  icon: LucideIcon
  buttonText: string
  buttonLink: string
  className?: string
}

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  title,
  subtitle,
  secondarySubtitle,
  message,
  icon: Icon,
  buttonText,
  buttonLink,
  className,
}) => {
  return (
    <div className="m-12 flex items-center justify-center">
      <Card className="flex w-full max-w-2xl flex-col rounded-lg p-8 text-center shadow-xl">
        <CardHeader>
          <div className={`my-2 flex flex-col items-center ${className}`}>
            <Icon className="mb-2 h-12 w-12" />
            <CardTitle className="text-3xl font-semibold">{title}</CardTitle>{" "}
          </div>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-xl text-primary">{subtitle}</CardDescription>{" "}
          {secondarySubtitle && (
            <CardDescription className="py-2">{secondarySubtitle}</CardDescription>
          )}{" "}
          {message && <p className="pt-8 ">{message}</p>}{" "}
        </CardContent>

        <CardFooter className="mt-4 flex justify-center">
          <Link href={buttonLink} passHref>
            <Button>{buttonText}</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ConfirmationCard
