// MARK: Error Handler

export type ClientResult<T> =
  | { success: true; isFailure: false; value: T }
  | { success: false; isFailure: true; error: string }

export function clientResult<T>(result: ExecutionResult<T, Error>): ClientResult<T> {
  if (result.success) {
    return {
      success: true,
      isFailure: false,
      value: result.value,
    }
  }

  return {
    success: false,
    isFailure: true,
    error: result.error.message,
  }
}

export function clientValue<T>(value: T): ClientResult<T> {
  return {
    success: true,
    isFailure: false,
    value,
  }
}
export function clientError<T>(msg: string): ClientResult<T> {
  return {
    success: false,
    isFailure: true,
    error: msg,
  }
}

export type ExecutionResult<T, E> =
  | {
      success: true
      isFailure: false
      value: T
    }
  | {
      success: false
      isFailure: true
      error: E
    }

export async function executePromise<T, E = Error>(
  fn: () => Promise<T>,
): Promise<ExecutionResult<T, E>> {
  try {
    const result = await fn()
    return { success: true, isFailure: false, value: result }
  } catch (error) {
    console.error("Execute promise error: ", error)
    return { success: false, isFailure: true, error: error as E }
  }
}

export function execute<T, E = Error>(fn: () => T): ExecutionResult<T, E> {
  try {
    const result = fn()
    return { success: true, isFailure: false, value: result }
  } catch (error) {
    console.error("Execute error: ", error)
    return { success: false, isFailure: true, error: error as E }
  }
}

export function executeValue<T, E = Error>(value: T): ExecutionResult<T, E> {
  return {
    success: true,
    isFailure: false,
    value,
  }
}

export function executeError<T, E = Error>(error: E): ExecutionResult<T, E> {
  return {
    success: false,
    isFailure: true,
    error,
  }
}
