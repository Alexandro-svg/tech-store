import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["127.0.0.1", "localhost"], // 🔥 разрешаем Django
  },
};

export default nextConfig;