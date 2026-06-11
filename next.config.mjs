/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removido 'output: "export"' para permitir APIs dinâmicas
  // Se precisar de static export, use: output: "export"
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
