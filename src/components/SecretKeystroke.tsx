"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

// Easter Egg: Klondike (sequência de teclas secreta)
const SECRET_SEQUENCE = ["k", "l", "o", "n", "d", "i", "k", "e"];

export default function SecretKeystrokeListener() {
  const router = useRouter();
  const keyPressesRef = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Adicionar tecla à sequência
      keyPressesRef.current.push(e.key.toLowerCase());

      // Manter apenas as últimas 8 teclas
      if (keyPressesRef.current.length > 8) {
        keyPressesRef.current.shift();
      }

      // Verificar se a sequência secreta foi digitada
      if (keyPressesRef.current.join("") === SECRET_SEQUENCE.join("")) {
        // Limpar e redirecionar
        keyPressesRef.current = [];

        // Efeito visual secreto
        const flash = document.createElement("div");
        flash.className = "fixed inset-0 bg-red-500/50 pointer-events-none z-50";
        flash.style.animation = "pulse 0.3s ease-out";
        document.body.appendChild(flash);

        setTimeout(() => flash.remove(), 300);

        // Redirecionar para login
        router.push("/admin-login");

        // Mensagem no console
        console.log("🔓 Sequência secreta detectada! Acesso ao painel concedido.");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [router]);

  return null;
}
