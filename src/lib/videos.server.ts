import * as fs from "fs";
import * as path from "path";
import { dbEnabled, ensureSchema, getPool } from "./db";

/**
 * Metadados dos vídeos do portfólio (título, cliente, tipo, URL...).
 *
 * Em produção ficam numa tabela do PostgreSQL. Os ARQUIVOS de vídeo em si
 * ficam no Volume (ver media.server.ts) — aqui guardamos só as informações.
 * Sem banco (dev local), cai no fallback data/videos.json.
 */

export interface VideoRecord {
  id: number;
  title: string;
  description: string;
  client: string;
  type: string;
  fileName: string;
  url: string;
  uploadedAt: string;
}

const videosJsonPath = path.join(process.cwd(), "data", "videos.json");

/** Lista todos os vídeos, do mais recente para o mais antigo. */
export async function listVideos(): Promise<VideoRecord[]> {
  if (dbEnabled()) {
    await ensureSchema();
    const { rows } = await getPool().query(
      `SELECT id, title, description, client, type,
              file_name AS "fileName", url, uploaded_at AS "uploadedAt"
         FROM videos
        ORDER BY uploaded_at DESC`
    );
    return rows.map((r) => ({
      ...r,
      id: Number(r.id),
      uploadedAt: new Date(r.uploadedAt).toISOString(),
    }));
  }

  // Fallback local.
  try {
    if (fs.existsSync(videosJsonPath)) {
      return JSON.parse(fs.readFileSync(videosJsonPath, "utf-8"));
    }
  } catch (error) {
    console.error("Erro ao ler videos.json:", error);
  }
  return [];
}

/** Adiciona um novo vídeo e devolve o registro criado. */
export async function addVideo(video: VideoRecord): Promise<VideoRecord> {
  if (dbEnabled()) {
    await ensureSchema();
    await getPool().query(
      `INSERT INTO videos
         (id, title, description, client, type, file_name, url, uploaded_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        video.id,
        video.title,
        video.description,
        video.client,
        video.type,
        video.fileName,
        video.url,
        video.uploadedAt,
      ]
    );
    return video;
  }

  // Fallback local.
  const videos = await listVideos();
  videos.push(video);
  writeLocal(videos);
  return video;
}

/** Remove um vídeo pelo id e devolve o fileName removido (se existia). */
export async function deleteVideo(id: number): Promise<string | null> {
  if (dbEnabled()) {
    await ensureSchema();
    const { rows } = await getPool().query(
      "DELETE FROM videos WHERE id = $1 RETURNING file_name AS \"fileName\"",
      [id]
    );
    return rows.length > 0 ? rows[0].fileName : null;
  }

  // Fallback local.
  const videos = await listVideos();
  const found = videos.find((v) => v.id === id);
  writeLocal(videos.filter((v) => v.id !== id));
  return found ? found.fileName : null;
}

function writeLocal(videos: VideoRecord[]): void {
  const dir = path.dirname(videosJsonPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(videosJsonPath, JSON.stringify(videos, null, 2), "utf-8");
}
