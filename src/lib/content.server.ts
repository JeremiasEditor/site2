import * as fs from "fs";
import * as path from "path";
import { SiteContent, defaultContent, deepMerge } from "./content";

export const contentJsonPath = path.join(process.cwd(), "data", "content.json");

/** Lê o conteúdo do site do arquivo, com fallback para os padrões. */
export function getContent(): SiteContent {
  try {
    if (fs.existsSync(contentJsonPath)) {
      const raw = fs.readFileSync(contentJsonPath, "utf-8");
      const saved = JSON.parse(raw);
      return deepMerge(defaultContent, saved);
    }
  } catch (error) {
    console.error("Error reading content.json:", error);
  }
  return defaultContent;
}

/** Grava o conteúdo do site em disco (merge sobre os padrões). */
export function saveContent(partial: unknown): SiteContent {
  const merged = deepMerge(defaultContent, partial);
  const dataDir = path.dirname(contentJsonPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(contentJsonPath, JSON.stringify(merged, null, 2), "utf-8");
  return merged;
}
