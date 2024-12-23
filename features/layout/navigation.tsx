"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import MenuBurgerButton from "./menu-burger-button"
import Image from "next/image"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathName = usePathname()

  const menuItems: { name: string; link: string }[] = [
    // { name: "O nas", link: "/" },
    // { name: "Oferta", link: "/oferta" },
    // { name: "Kup karnet", link: "/kup-karnet" },
  ]

  return (
    <nav className="sticky top-0 z-50 flex h-24 items-center justify-between bg-background p-8 md:bg-transparent">
      {/* Logo */}
      <div className="text-2xl font-bold text-accent">
        <Link href="/">
          <Image
            src="/images/logo_zlote.svg"
            alt="Logo ProgressGym"
            width={180}
            height={90}
            priority
          />
        </Link>
      </div>

      {/* Navigation desktop */}
      <div className="hidden rounded-full bg-background p-6 opacity-80 md:block">
        <ul className="hidden space-x-8 text-lg font-bold text-border md:flex">
          {menuItems.map(item => (
            <li
              key={item.link}
              className="transition-colors duration-300 ease-in-out hover:text-accent"
            >
              <Link
                href={item.link}
                className={`transition-colors duration-300 ease-in-out hover:text-accent ${
                  pathName === item.link ? "text-accent" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Menu Burger Button */}
      <div className="mr-4 md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <MenuBurgerButton isOpen={isOpen} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <ul className="absolute left-0 top-full flex w-full flex-col items-center  bg-background px-0 pb-8 text-base text-foreground">
          {menuItems.map(item => (
            <li key={item.link} className="py-4">
              <Link
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="py-4 font-bold hover:text-accent active:text-primary"
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
