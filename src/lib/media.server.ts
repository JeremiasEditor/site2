import * as fs from "fs";
import * as path from "path";

/**
 * Armazenamento dos ARQUIVOS de mídia (vídeos do portfólio e vídeo de fundo).
 *
 * No Railway, o sistema de arquivos do container é efêmero: tudo é apagado a
 * cada novo deploy. Por isso os arquivos ficam num diretório que deve ser
 * apontado para um "Volume" persistente do Railway.
 *
 * Configuração no Railway:
 *   1. Adicione um Volume ao serviço.
 *   2. Defina o Mount Path do Volume como  /app/data
 *      (assim o diretório abaixo, data/media, fica dentro do volume).
 *
 * Localmente, sem configuração nenhuma, os arquivos vão para
 * <projeto>/data/media — que é ignorado pelo git.
 */

const MEDIA_DIR =
  process.env.MEDIA_DIR || path.join(process.cwd(), "data", "media");

/** Garante que o diretório de mídia existe. */
export function ensureMediaDir(): void {
  if (!fs.existsSync(MEDIA_DIR)) {
    fs.mkdirSync(MEDIA_DIR, { recursive: true });
  }
}

/** Caminho absoluto no disco para um arquivo de mídia. */
export function mediaFilePath(fileName: string): string {
  // Impede path traversal (ex.: "../../etc/passwd").
  const safe = path.basename(fileName);
  return path.join(MEDIA_DIR, safe);
}

/** Grava um arquivo de mídia e devolve a URL pública para acessá-lo. */
export function saveMediaFile(fileName: string, buffer: Buffer): string {
  ensureMediaDir();
  const safe = path.basename(fileName);
  fs.writeFileSync(path.join(MEDIA_DIR, safe), buffer);
  return mediaUrl(safe);
}

/** Remove um arquivo de mídia (silencioso se não existir). */
export function deleteMediaFile(fileName: string): void {
  try {
    const p = mediaFilePath(fileName);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  } catch (error) {
    console.error("Erro ao remover arquivo de mídia:", error);
  }
}

/** URL pública servida pela rota /api/media/[name]. */
export function mediaUrl(fileName: string): string {
  return `/api/media/${encodeURIComponent(path.basename(fileName))}`;
}
