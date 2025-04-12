import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach, vi } from "vitest"

// Automatyczne czyszczenie po każdym teście
afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

// Mock encryption
vi.mock("@/lib/encryption", () => ({
  encrypt: vi.fn((val: string) => val),
  decrypt: vi.fn((val: string) => val),
  md5: vi.fn((val: string) => val),
  verifyMd5: vi.fn((val: string, hash: string) => val === hash),
}))

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
  notFound: vi.fn(),
}))

// Mock GraphQL client
vi.mock("@/lib/graph-ql/client", () => {
  return {
    default: {
      query: vi.fn(),
      mutate: vi.fn(),
    },
    gql: vi.fn(),
  }
})

// Mock Next.js cookies
export const mockCookieStore = new Map<string, string>()
export const mockCookies = {
  get: vi.fn((key: string) => ({
    value: mockCookieStore.get(key) || "",
  })),
  set: vi.fn((key: string, value: string) => {
    mockCookieStore.set(key, value)
  }),
}

// Mock Next.js headers
vi.mock("next/headers", () => ({
  cookies: vi.fn(() => mockCookies),
}))

// Interfejs dla mocków storage'ów
export interface MockStorage extends Storage {
  getItem: ReturnType<typeof vi.fn>
  setItem: ReturnType<typeof vi.fn>
  clear: ReturnType<typeof vi.fn>
  removeItem: ReturnType<typeof vi.fn>
  key: ReturnType<typeof vi.fn>
}

// Funkcja tworząca mock storage'a
export const createStorageMock = (): MockStorage =>
  ({
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
    removeItem: vi.fn(),
    length: 0,
    key: vi.fn(),
  }) as MockStorage

// Mockowanie localStorage
export const localStorageMock = createStorageMock()
global.localStorage = localStorageMock

// Mockowanie sessionStorage
export const sessionStorageMock = createStorageMock()
global.sessionStorage = sessionStorageMock

// Typ dla mocka fetch
type FetchMock = typeof fetch & {
  mockResolvedValueOnce: (value: any) => void
  mockRejectedValueOnce: (error: any) => void
  mockImplementation: (impl: typeof fetch) => void
  mockClear: () => void
}

// Mockowanie fetch
export const fetchMock = vi.fn() as unknown as FetchMock
global.fetch = fetchMock

// Mockowanie window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mockowanie window.ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
