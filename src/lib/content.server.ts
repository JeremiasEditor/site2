import * as fs from "fs";
import * as path from "path";
import { SiteContent, defaultContent, deepMerge } from "./content";
import { dbEnabled, ensureSchema, getPool } from "./db";

/**
 * Leitura/escrita do conteúdo do site (textos, links, portfólio, serviços...).
 *
 * Em produção (Railway, com DATABASE_URL) tudo fica numa tabela do PostgreSQL.
 * Localmente, sem banco, cai no fallback de arquivo JSON em data/content.json,
 * para permitir desenvolvimento sem um banco rodando.
 */

export const contentJsonPath = path.join(process.cwd(), "data", "content.json");

/** Lê o conteúdo do site (merge sobre os valores padrão). */
export async function getContent(): Promise<SiteContent> {
  if (dbEnabled()) {
    try {
      await ensureSchema();
      const { rows } = await getPool().query<{ data: unknown }>(
        "SELECT data FROM site_content WHERE id = 1"
      );
      if (rows.length > 0) {
        return deepMerge(defaultContent, rows[0].data);
      }
    } catch (error) {
      console.error("Erro ao ler conteúdo do banco:", error);
    }
    return defaultContent;
  }

  // Fallback: arquivo local (desenvolvimento).
  try {
    if (fs.existsSync(contentJsonPath)) {
      const raw = fs.readFileSync(contentJsonPath, "utf-8");
      return deepMerge(defaultContent, JSON.parse(raw));
    }
  } catch (error) {
    console.error("Erro ao ler content.json:", error);
  }
  return defaultContent;
}

/** Grava o conteúdo do site (merge sobre os padrões) e devolve o resultado. */
export async function saveContent(partial: unknown): Promise<SiteContent> {
  const merged = deepMerge(defaultContent, partial);

  if (dbEnabled()) {
    await ensureSchema();
    await getPool().query(
      `INSERT INTO site_content (id, data, updated_at)
       VALUES (1, $1, now())
       ON CONFLICT (id) DO UPDATE
         SET data = EXCLUDED.data, updated_at = now()`,
      [JSON.stringify(merged)]
    );
    return merged;
  }

  // Fallback: arquivo local (desenvolvimento).
  const dataDir = path.dirname(contentJsonPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(contentJsonPath, JSON.stringify(merged, null, 2), "utf-8");
  return merged;
}
