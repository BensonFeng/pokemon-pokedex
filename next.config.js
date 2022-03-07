/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };
const nextConfig = {
  images: {
    domains: ["https://jherr-pokemon.s3.us-west-1.amazonaws.com"],
  },
};
module.exports = nextConfig;
