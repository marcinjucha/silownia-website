require("dotenv")

const url = new URL(process.env.CMS_BASE_URL)

module.exports = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", ""),
        hostname: url.hostname,
        port: url.port,
        pathname: "**",
      },
    ],
  },
}
