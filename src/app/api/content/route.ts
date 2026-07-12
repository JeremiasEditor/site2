import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content.server";
import { isAuthenticated } from "@/lib/auth.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET - Retorna todo o conteúdo do site (textos, links, vídeo de fundo)
export async function GET() {
  try {
    return NextResponse.json(await getContent());
  } catch (error) {
    console.error("Error reading content:", error);
    return NextResponse.json(
      { error: "Failed to read content" },
      { status: 500 }
    );
  }
}

// PUT - Salva o conteúdo do site (protegido pelo middleware de admin)
export async function PUT(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    const body = await request.json();
    const saved = await saveContent(body);
    return NextResponse.json(saved);
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json(
      { error: "Failed to save content" },
      { status: 500 }
    );
  }
}
