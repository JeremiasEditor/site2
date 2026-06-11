"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play } from "lucide-react";

interface Video {
  id: number;
  title: string;
  description: string;
  client: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export default function PortfolioVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideos(data || []);
    } catch (error) {
      console.error("Error loading videos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || videos.length === 0) {
    return null;
  }

  return (
    <>
      {/* Seção de Vídeos */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(220,38,38,0.05)_0%,transparent_60%)]" />

        <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-red-500/80 font-medium">
              Vídeos em Destaque
            </span>
            <h3 className="text-3xl md:text-4xl font-bold mt-3">
              Portfólio de <span className="text-red-500">Vídeos</span>
            </h3>
          </motion.div>

          {/* Grid de Vídeos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => setSelectedVideo(video)}
                className="group relative cursor-pointer"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-800 hover:border-red-500/50 transition">
                  {/* Thumbnail com gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-slate-900/50 flex items-center justify-center group-hover:from-red-500/30 transition">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition" />
                    <Play
                      size={48}
                      className="text-white group-hover:scale-110 transition relative z-10"
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {video.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-2">
                      {video.client || video.type}
                    </p>
                    {video.description && (
                      <p className="text-white/60 text-xs line-clamp-2">
                        {video.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-white text-sm truncate">
                      {video.title}
                    </p>
                    {video.client && (
                      <p className="text-white/60 text-xs mt-1">{video.client}</p>
                    )}
                  </div>
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded whitespace-nowrap ml-2">
                    {video.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Vídeo */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl"
          >
            <div className="relative bg-slate-950 rounded-lg overflow-hidden">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 text-white hover:text-red-500 transition z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
              >
                ✕
              </button>

              <div className="aspect-video bg-black">
                <video
                  src={selectedVideo.url}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              </div>

              <div className="p-6 bg-gradient-to-b from-slate-900 to-slate-950">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedVideo.title}
                </h2>
                {selectedVideo.client && (
                  <p className="text-white/80 mb-2">👤 {selectedVideo.client}</p>
                )}
                <p className="text-white/60 mb-2">🏷️ {selectedVideo.type}</p>
                {selectedVideo.description && (
                  <p className="text-white/70">{selectedVideo.description}</p>
                )}
                <p className="text-white/40 text-sm mt-4">
                  Enviado em{" "}
                  {new Date(selectedVideo.uploadedAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
