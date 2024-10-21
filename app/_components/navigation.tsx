"use client"
import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import MenuBurgerButton from "./menuBurgerButton"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathName = usePathname()

  const menuItems = [
    { name: "O nas", link: "/" },
    { name: "Oferta", link: "/oferta" },
    { name: "Galeria", link: "/galeria" },
    { name: "Kup karnet", link: "/kupKarnet" },
  ]

  return (
    <nav className="relative sticky top-0 flex h-32 items-center justify-between bg-foreground p-8">
      {/* Logo */}
      <div className="text-2xl font-bold text-background">
        <Link href="/">LOGO</Link>
      </div>

      {/* Navigation desktop */}
      <ul className="hidden space-x-8 text-lg font-bold text-background md:flex">
        {menuItems.map(item => (
          <li
            key={item.link}
            className="transition-colors duration-300 ease-in-out hover:text-destructive"
          >
            <Link
              href={item.link}
              className={`transition-colors duration-300 ease-in-out hover:text-destructive ${
                pathName === item.link ? "text-destructive" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Menu Burger Button */}
      <div className="mr-4 md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <MenuBurgerButton isOpen={isOpen} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <ul className="absolute left-0 top-full flex w-full flex-col items-center bg-foreground text-base text-background">
          {menuItems.map(item => (
            <li key={item.link} className="py-2">
              <Link
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="py-4 font-bold active:text-destructive"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
