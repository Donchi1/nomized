

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env:{
    FIREBASE_KEY: process.env.FIREBASE_KEY,
    API_REQUEST_URL: process.env.API_REQUEST_URL
  },
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
       
      }
    ]
  }
}

module.exports = nextConfig