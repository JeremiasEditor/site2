import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import { isAuthenticated } from "@/lib/auth.server";

// Pasta pública onde os uploads (ex.: vídeo de fundo) são armazenados
const uploadsDir = path.join(process.cwd(), "public", "uploads");

function ensureDir() {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
}

// POST - Faz upload de um arquivo (vídeo) vindo do computador do admin
export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    ensureDir();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("video/")) {
      return NextResponse.json(
        { error: "O arquivo precisa ser um vídeo" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = `${Date.now()}-${safeName}`;
    fs.writeFileSync(path.join(uploadsDir, fileName), buffer);

    return NextResponse.json(
      { url: `/uploads/${fileName}`, fileName },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Falha ao enviar arquivo" },
      { status: 500 }
    );
  }
}
