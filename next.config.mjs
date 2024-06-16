/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
	},
}

module.exports = {
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
}

export default nextConfig
