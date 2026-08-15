/** @type {import('next').NextConfig} */
const apiBaseUrl = process.env.API_URL || 'http://localhost:3001';

const nextConfig = {
  reactStrictMode: true,

  // The developer platform had no Next config at all, so it inherited the
  // defaults and every page failed on the design system's CSS modules.
  //
  // Transpiled, not externalised: a server-external package resolves its own
  // React, which breaks prerendering with a null dispatcher, and Next cannot
  // process CSS modules it does not own.
  transpilePackages: ['@kannan19302/shared', '@kannan19302/ui', '@kannan19302/framework'],

  experimental: {
    // Meant for large third-party barrel packages. Applying it to a local
    // workspace package alongside transpilePackages produced duplicate module
    // instances and null-hook crashes in web; do not add @kannan19302/* here.
    optimizePackageImports: ['lucide-react'],
  },

  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...(config.watchOptions || {}),
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };
    }
    return config;
  },

  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiBaseUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
