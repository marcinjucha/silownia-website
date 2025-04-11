import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function clone(value: any) {
  return JSON.parse(JSON.stringify(value))
}

export function unwrapData<T>(data?: T): NonNullable<T> {
  if (data) {
    return data
  }
  throw new Error("No data available")
}

export function stringify(data: any) {
  return JSON.stringify(data)
}

export const isServer = typeof window === "undefined"
export const isClient = typeof window !== "undefined"
