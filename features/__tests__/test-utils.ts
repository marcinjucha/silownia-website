export function randomInt(min: number = 10, max: number = 20): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomBool() {
  return randomInt(1, 2) === 1
}

function randomString(length: number = randomInt()): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }
  return result
}

export function randomEmail(): string {
  return `${randomString(10)}@${randomString(5)}.${randomString(3)}`
}

export const createDate = "2024-03-20T12:00:00Z"

export function createApolloResponse<T>(data: T) {
  return {
    data: {
      ...data,
    },
    loading: false,
    networkStatus: 7,
    errors: undefined,
  }
}

export function createURL(urlString: string, params?: Record<string, string>): URL {
  const url = new URL(urlString)

  if (!params) {
    return url
  }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  return url
}
