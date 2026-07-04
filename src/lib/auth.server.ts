import { NextRequest } from "next/server";

/** Verifica se a requisição possui um cookie de admin válido. */
export function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) return false;

  const correctPassword = process.env.ADMIN_PASSWORD || "admin123";
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    return decoded === correctPassword;
  } catch {
    return false;
  }
}
