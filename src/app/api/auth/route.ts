import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (password === correctPassword) {
      // Criar resposta com cookie de sessão
      const response = NextResponse.json({ success: true });
      
      // Definir cookie seguro com token
      response.cookies.set({
        name: "admin_token",
        value: Buffer.from(password).toString("base64"),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60, // 24 horas
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Senha incorreta" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao processar login" },
      { status: 500 }
    );
  }
}

// Logout
export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_token");
  return response;
}
