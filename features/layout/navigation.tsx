"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import MenuBurgerButton from "./menu-burger-button"
import Image from "next/image"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathName = usePathname()

  const menuItems = [
    { name: "O nas", link: "/" },
    { name: "Oferta", link: "/oferta" },
    {
      name: "Kup karnet",
      link: "https://progressgymelitead-wroclaw.cms.efitness.com.pl/kalendarz-zajec?day=2025-06-03",
    },
  ]

  return (
    <nav className="bg-background sticky top-0 z-50 flex h-24 items-center justify-between p-8 md:bg-transparent">
      {/* Logo */}
      <div className="text-accent text-2xl font-bold">
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
      <div className="bg-background hidden rounded-full p-6 opacity-80 md:block">
        <ul className="text-border hidden space-x-8 text-lg font-bold md:flex">
          {menuItems.map(item => (
            <li
              key={item.link}
              className="hover:text-accent transition-colors duration-300 ease-in-out"
            >
              <Link
                href={item.link}
                className={`hover:text-accent transition-colors duration-300 ease-in-out ${
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
        <ul className="bg-background text-foreground absolute top-full left-0 flex w-full flex-col items-center px-0 pb-8 text-base">
          {menuItems.map(item => (
            <li key={item.link} className="py-4">
              <Link
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="hover:text-accent active:text-primary py-4 font-bold"
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
