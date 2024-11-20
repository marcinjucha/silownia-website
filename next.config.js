require("dotenv")

const awsURL = new URL(process.env.AWS_MEDIA_URL || "")
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
        protocol: awsURL.protocol.replace(":", ""),
        hostname: awsURL.hostname,
        port: awsURL.port,
        pathname: "/**",
      },
      {
        protocol: cmsURL.protocol.replace(":", ""),
        hostname: cmsURL.hostname,
        port: cmsURL.port,
        pathname: "/",
      },
    ],
  },
}
