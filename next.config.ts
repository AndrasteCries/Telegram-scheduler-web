import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5238',
                pathname: '/api/attachments/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5238',
                pathname: '/api/media/**',
            },
        ],
    },
};

export default nextConfig;
