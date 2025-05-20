import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Habilita el modo estricto de React
  images: {
    unoptimized: true, // Hace que las imágenes sean compatibles con exportaciones estáticas
  }
};

export default nextConfig;
