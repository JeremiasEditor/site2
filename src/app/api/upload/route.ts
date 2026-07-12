import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth.server";
import { saveMediaFile } from "@/lib/media.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST - Faz upload de um vídeo (ex.: vídeo de fundo) para o Volume persistente
export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

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
    const url = saveMediaFile(fileName, buffer);

    return NextResponse.json({ url, fileName }, { status: 201 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Falha ao enviar arquivo" },
      { status: 500 }
    );
  }
}
