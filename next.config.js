const SITE = require('./src/config.js').SITE;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  trailingSlash: SITE.trailingSlash,
  basePath: SITE.basePathname !== '/' ? SITE.basePathname : '',

  swcMinify: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
  rewrites: [
    {
      source: "/api/graphql", // Replace `/api/:path*` with your API route
      destination: "https://www.vrbo.com/graphql", // Your backend API
    },
  ]
};
