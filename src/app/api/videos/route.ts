import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

// Diretório para armazenar vídeos e dados
const dataDir = path.join(process.cwd(), "public", "portfolio-videos");
const videosJsonPath = path.join(process.cwd(), "data", "videos.json");

// Garantir que os diretórios existem
function ensureDirectories() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const dataFolder = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder, { recursive: true });
  }
}

// GET - Listar todos os vídeos
export async function GET() {
  try {
    ensureDirectories();
    
    if (!fs.existsSync(videosJsonPath)) {
      return NextResponse.json([]);
    }
    
    const data = fs.readFileSync(videosJsonPath, "utf-8");
    const videos = JSON.parse(data);
    return NextResponse.json(videos);
  } catch (error) {
    console.error("Error reading videos:", error);
    return NextResponse.json([]);
  }
}

// POST - Salvar novo vídeo
export async function POST(request: NextRequest) {
  try {
    ensureDirectories();
    
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const client = formData.get("client") as string;
    const type = formData.get("type") as string;

    if (!file || !title) {
      return NextResponse.json(
        { error: "File and title are required" },
        { status: 400 }
      );
    }

    // Salvar arquivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(dataDir, fileName);
    
    fs.writeFileSync(filePath, buffer);

    // Salvar metadados
    let videos = [];
    if (fs.existsSync(videosJsonPath)) {
      const data = fs.readFileSync(videosJsonPath, "utf-8");
      videos = JSON.parse(data);
    }

    const newVideo = {
      id: Date.now(),
      title,
      description,
      client,
      type,
      fileName,
      url: `/portfolio-videos/${fileName}`,
      uploadedAt: new Date().toISOString(),
    };

    videos.push(newVideo);
    fs.writeFileSync(videosJsonPath, JSON.stringify(videos, null, 2));

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error("Error uploading video:", error);
    return NextResponse.json(
      { error: "Failed to upload video" },
      { status: 500 }
    );
  }
}

// DELETE - Remover vídeo
export async function DELETE(request: NextRequest) {
  try {
    ensureDirectories();
    
    const { id, fileName } = await request.json();

    // Remover arquivo
    const filePath = path.join(dataDir, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Atualizar JSON
    let videos = [];
    if (fs.existsSync(videosJsonPath)) {
      const data = fs.readFileSync(videosJsonPath, "utf-8");
      videos = JSON.parse(data);
    }

    videos = videos.filter((v: any) => v.id !== id);
    fs.writeFileSync(videosJsonPath, JSON.stringify(videos, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting video:", error);
    return NextResponse.json(
      { error: "Failed to delete video" },
      { status: 500 }
    );
  }
}
