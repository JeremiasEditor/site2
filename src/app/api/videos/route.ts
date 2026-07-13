import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth.server";
import { saveMediaFile, deleteMediaFile } from "@/lib/media.server";
import {
  listVideos,
  addVideo,
  deleteVideo,
  VideoRecord,
} from "@/lib/videos.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET - Listar todos os vídeos
export async function GET() {
  try {
    return NextResponse.json(await listVideos());
  } catch (error) {
    console.error("Error reading videos:", error);
    return NextResponse.json([]);
  }
}

// POST - Salvar novo vídeo (arquivo no Volume, metadados no banco)
export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = (formData.get("description") as string) || "";
    const client = (formData.get("client") as string) || "";
    const type = (formData.get("type") as string) || "";
    const thumbFile = formData.get("thumbnail") as File | null;

    if (!file || !title) {
      return NextResponse.json(
        { error: "File and title are required" },
        { status: 400 }
      );
    }

    // Grava o arquivo de vídeo no diretório de mídia (Volume).
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = `${Date.now()}-${safeName}`;
    const url = saveMediaFile(fileName, buffer);

    // Miniatura opcional (imagem escolhida pelo admin).
    let thumbnail = "";
    if (thumbFile && thumbFile.size > 0 && thumbFile.type.startsWith("image/")) {
      const tBytes = await thumbFile.arrayBuffer();
      const tSafe = thumbFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const tName = `thumb-${Date.now()}-${tSafe}`;
      thumbnail = saveMediaFile(tName, Buffer.from(tBytes));
    }

    const newVideo: VideoRecord = {
      id: Date.now(),
      title,
      description,
      client,
      type,
      fileName,
      url,
      thumbnail,
      uploadedAt: new Date().toISOString(),
    };

    await addVideo(newVideo);

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json(
      { error: "Failed to upload video" },
      { status: 500 }
    );
  }
}

// DELETE - Remover vídeo (metadados do banco + arquivo do Volume)
export async function DELETE(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { id } = await request.json();
    const removed = await deleteVideo(Number(id));

    if (removed) {
      deleteMediaFile(removed.fileName);
      if (removed.thumbnail) deleteMediaFile(removed.thumbnail);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting video:", error);
    return NextResponse.json(
      { error: "Failed to delete video" },
      { status: 500 }
    );
  }
}
