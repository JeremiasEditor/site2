import { Pool } from "pg";

/**
 * Conexão com o PostgreSQL (banco de dados do Railway).
 *
 * O Railway injeta a variável de ambiente `DATABASE_URL` automaticamente
 * quando você adiciona um banco PostgreSQL ao projeto. Localmente, se essa
 * variável não existir, o site continua funcionando lendo/gravando em
 * arquivos JSON (ver content.server.ts e videos.server.ts) — assim dá para
 * desenvolver sem precisar de um banco rodando na sua máquina.
 */

let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

/** Retorna true se um banco PostgreSQL está configurado (produção/Railway). */
export function dbEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/** Obtém (criando na primeira vez) o pool de conexões com o Postgres. */
export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Conexões pela rede interna do Railway não usam SSL. Se você conectar
      // pela URL pública (proxy), defina DATABASE_SSL=true no ambiente.
      ssl:
        process.env.DATABASE_SSL === "true"
          ? { rejectUnauthorized: false }
          : undefined,
      max: 5,
    });
  }
  return pool;
}

/**
 * Cria as tabelas necessárias, uma única vez por processo.
 * É idempotente (usa CREATE TABLE IF NOT EXISTS).
 */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const p = getPool();
      await p.query(`
        CREATE TABLE IF NOT EXISTS site_content (
          id INTEGER PRIMARY KEY DEFAULT 1,
          data JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          CONSTRAINT site_content_singleton CHECK (id = 1)
        );
      `);
      await p.query(`
        CREATE TABLE IF NOT EXISTS videos (
          id BIGINT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT DEFAULT '',
          client TEXT DEFAULT '',
          type TEXT DEFAULT '',
          file_name TEXT NOT NULL,
          url TEXT NOT NULL,
          thumbnail TEXT DEFAULT '',
          uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `);
      // Garante a coluna em bancos que já existiam antes deste campo.
      await p.query(
        `ALTER TABLE videos ADD COLUMN IF NOT EXISTS thumbnail TEXT DEFAULT ''`
      );
    })().catch((err) => {
      // Se falhar, permite tentar de novo na próxima chamada.
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}
