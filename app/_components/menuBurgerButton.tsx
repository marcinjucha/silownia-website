import React from "react"

interface BurgerBtnProps {
  isOpen: boolean
}

export default function MenuBurgerButton({ isOpen }: BurgerBtnProps) {
  return (
    <div className="flex h-10 w-10 flex-col items-center justify-between p-3">
      <span
        className={`block h-1 w-10 bg-background transition-transform ${
          isOpen ? "translate-y-1.5 rotate-45" : ""
        }`}
      ></span>
      <span
        className={`block h-1 w-10 bg-background transition-opacity ${isOpen ? "opacity-0" : ""}`}
      ></span>
      <span
        className={`block h-1 w-10 bg-background transition-transform ${
          isOpen ? "-translate-y-1.5 -rotate-45" : ""
        }`}
      ></span>
    </div>
  )
}
