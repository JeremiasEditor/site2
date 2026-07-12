import { NextRequest } from "next/server";
import * as fs from "fs";
import { Readable } from "stream";
import { mediaFilePath } from "@/lib/media.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIME: Record<string, string> = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".m4v": "video/x-m4v",
  ".ogg": "video/ogg",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function contentType(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  const ext = dot >= 0 ? fileName.slice(dot).toLowerCase() : "";
  return MIME[ext] || "application/octet-stream";
}

// GET - Serve um arquivo de mídia do disco/volume, com suporte a Range
// (necessário para o player de vídeo permitir pular para outro trecho).
export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const filePath = mediaFilePath(decodeURIComponent(params.name));

  if (!fs.existsSync(filePath)) {
    return new Response("Arquivo não encontrado", { status: 404 });
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const type = contentType(filePath);
  const range = request.headers.get("range");

  if (range) {
    const match = /bytes=(\d*)-(\d*)/.exec(range);
    const start = match && match[1] ? parseInt(match[1], 10) : 0;
    const end = match && match[2] ? parseInt(match[2], 10) : fileSize - 1;

    if (start >= fileSize || end >= fileSize || start > end) {
      return new Response("Range inválido", {
        status: 416,
        headers: { "Content-Range": `bytes */${fileSize}` },
      });
    }

    const stream = fs.createReadStream(filePath, { start, end });
    return new Response(Readable.toWeb(stream) as ReadableStream, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": String(end - start + 1),
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  const stream = fs.createReadStream(filePath);
  return new Response(Readable.toWeb(stream) as ReadableStream, {
    status: 200,
    headers: {
      "Content-Length": String(fileSize),
      "Content-Type": type,
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
