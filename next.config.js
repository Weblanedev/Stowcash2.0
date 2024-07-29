const { createClient } = require('@sanity/client');

const client = createClient({
  dataset: 'production',
  projectId: 'sfpive8k',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2022-08-30',
});

// see breakdown of code bloat
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// get redirects from Sanity for Vercel
async function fetchSanityRedirects() {
  const redirectData = await client.fetch(`
    *[_type == "redirect"]{
      "source": "/" + from,
      "destination": "/" + to,
      "permanent": isPermanent
    }
  `);

  return redirectData;
}

module.exports = withBundleAnalyzer({
  swcMinify: true,
  async redirects() {
    const sanityRedirects = await fetchSanityRedirects();
    return sanityRedirects;
  },
  async headers() {
    return [
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "connect-src 'self';",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
});
