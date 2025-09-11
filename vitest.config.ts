import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "**/*.stories.{js,ts,jsx,tsx}",
        "**/*.test.{js,ts,jsx,tsx}",
        "**/*.config.{js,ts}",
        "**/test-samples.ts",
        "**/*.d.ts",
        "**/types/**",
        "**/__tests__/**",
        "**/dist/**",
        "**/.next/**",
        "**/actions/*-schema.ts",
        "**/logic/*-type*.ts",
      ],
      include: [
        "features/**/logic/**",
        "features/**/actions/**",
        // "features/**/components/**",
      ],
      all: true,
    },
    globals: true,
    alias: {
      "@": resolve(__dirname, "./"),
    },
    testTimeout: 10000,
    benchmark: {
      include: ["**/*.{bench,benchmark}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
    clearMocks: true,
    bail: 1,
    reporters: ["verbose"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
    ],
    setupFiles: [resolve(__dirname, "./vitest.setup.ts")],
  },
})
