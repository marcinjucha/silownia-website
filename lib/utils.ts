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

// MARK: Error Handler

export type ClientResult<T, E> = { success: true; value: T } | { success: false; error: E }

export function clientResult<T>(result: ExecutionResult<T, Error>) {
  if (result.success) {
    return result as ClientResult<T, string>
  }

  return {
    success: false,
    error: result.error.message,
  } satisfies ClientResult<T, string>
}
export function clientValue<T>(value: T) {
  return {
    success: true,
    value,
  } satisfies ClientResult<T, string>
}
export function clientError<T>(msg: string) {
  return {
    success: false,
    error: msg,
  } satisfies ClientResult<T, string>
}

export type ExecutionResult<T, E> = { success: true; value: T } | { success: false; error: E }

export async function executePromise<T, E = Error>(
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

export function execute<T, E = Error>(fn: () => T): ExecutionResult<T, E> {
  try {
    const result = fn()
    return { success: true, value: result }
  } catch (error) {
    console.error("Execute error: ", error)
    return { success: false, error: error as E }
  }
}

export function executeValue<T, E = Error>(value: T) {
  return {
    success: true,
    value,
  } satisfies ExecutionResult<T, E>
}

export function executeError<T, E = Error>(error: E) {
  return {
    success: false,
    error,
  } satisfies ExecutionResult<T, E>
}
