import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to ACME Store
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                Discover our amazing products and experience the best in quality and design.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg">Get Started</Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Discover Our Products
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-xl">
            Explore our wide range of high-quality products designed to meet your needs.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["Product A", "Product B", "Product C"].map(product => (
              <Card key={product}>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold">{product}</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Product Gallery
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(item => (
              <Card key={item}>
                <CardContent className="p-0">
                  {/* <Image
                    src={`/placeholder.svg?height=200&width=300`}
                    alt={`Gallery item ${item}`}
                    className="h-[200px] w-full object-cover"
                  /> */}
                  <Image
                    src="/placeholder.svg"
                    alt={`Gallery item ${item}`}
                    width={300}
                    height={200}
                    className="h-[200px] w-full object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
