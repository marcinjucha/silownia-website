import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function clone(value: any) {
  return JSON.parse(JSON.stringify(value))
}

// MARK: Error Handler

export type ExecutionResult<T, E extends Error> =
  | { success: true; value: T }
  | { success: false; error: E }

export function errorResult<T>(msg: string) {
  console.error("Error result: ", msg)

  return {
    success: false,
    error: new Error(msg),
  } satisfies ExecutionResult<T, Error>
}

export function successResult<T>(value: T) {
  return {
    success: true,
    value,
  } satisfies ExecutionResult<T, Error>
}

export async function executePromise<T, E extends Error>(
  fn: () => Promise<T>,
): Promise<ExecutionResult<T, E>> {
  try {
    const result = await fn()
    return { success: true, value: result }
  } catch (error) {
    console.error("Execute promise error: ", error)
    return { success: false, error: error as E }
  }
}

export function execute<T, E extends Error>(fn: () => T): ExecutionResult<T, E> {
  try {
    const result = fn()
    return { success: true, value: result }
  } catch (error) {
    console.error("Execute error: ", error)
    return { success: false, error: error as E }
  }
}
