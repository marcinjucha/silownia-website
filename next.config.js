require("dotenv")

const awsURL = new URL(process.env.AWS_MEDIA_URL || "")
const placeholdURL = new URL("https://placehold.co")
const cmsURL = new URL(process.env.CMS_BASE_URL || "http://localhost:1337")

module.exports = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: placeholdURL.protocol.slice(0, -1),
        hostname: placeholdURL.hostname,
        port: placeholdURL.port,
        pathname: "/**",
      },
      {
        protocol: cmsURL.protocol.slice(0, -1),
        hostname: cmsURL.hostname,
        port: cmsURL.port,
        pathname: "/**",
      },
      {
        protocol: awsURL.protocol.slice(0, -1),
        hostname: awsURL.hostname,
        port: awsURL.port,
        pathname: "/**",
      },
    ],
  },
}
