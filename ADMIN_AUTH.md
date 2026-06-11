# 🔐 Sistema de Autenticação de Admin

## 🔓 Formas de Acessar o Admin

### 1️⃣ **Easter Egg Secreto (Recomendado)**
Digiteesta sequência de teclas em qualquer lugar do site:

```
K → L → O → N → D → I → K → E
```

Isso levará você automaticamente à página de login!

### 2️⃣ **URL Direta**
Acesse: `http://localhost:3000/admin-login`

### 3️⃣ **Redirecionamento Automático**
Tente acessar `/admin` sem autenticação - você será redirecionado para a página de login.

---

## 🔑 Configurar Senha

### Desenvolvimento Local

1. **Crie o arquivo** `.env.local` na raiz do projeto:

```bash
ADMIN_PASSWORD=sua_senha_desenvolvimento
```

2. **Acesse o admin:**
   - Digite a senha que você configurou
   - Será criado um cookie seguro

### Produção (Vercel/Deploy)

1. **Adicione a variável no painel de deploy:**
   - Vercel → Project Settings → Environment Variables
   - Key: `ADMIN_PASSWORD`
   - Value: `sua_senha_forte_producao`

2. **Redeploy o projeto**

---

## 🛡️ Como Funciona

### Autenticação
- Formulário POST para `/api/auth`
- Verifica a senha contra `ADMIN_PASSWORD`
- Se correto: cria cookie `admin_token` (24 horas)

### Proteção
- Middleware valida cookie antes de acessar `/admin`
- Se inválido: redireciona para `/admin-login`
- Cookie é `httpOnly` (seguro contra XSS)

### Logout
- Clique no botão "Sair" no painel admin
- Deleta cookie `admin_token`
- Redireciona para a home

---

## 📋 Senhas Recomendadas

❌ **Evite:**
- `admin123`
- `password`
- `123456`

✅ **Use:**
- Mínimo 12 caracteres
- Misture maiúsculas, minúsculas, números e símbolos
- Exemplo: `J3r3m!as@2024#Edit`

---

## 🚀 Teste o Sistema

### Local
```bash
npm run dev
```

1. Digite `klondike` em qualquer página
2. Será redirecionado para login
3. Digite sua senha de `.env.local`
4. Você está dentro! ✅

### Vercel
O mesmo processo, mas com a senha definida em variáveis de ambiente.

---

## 🔧 Melhorias Futuras

- [ ] Dois fatores (2FA)
- [ ] Rate limiting para força bruta
- [ ] Histórico de acessos
- [ ] Múltiplos usuários
- [ ] Auditoria de ações
- [ ] Autenticação com Google/GitHub

---

## 💡 Dicas de Segurança

1. **Nunca compartilhe a senha** no código
2. **Mude regularmente** em produção
3. **Use HTTPS** sempre
4. **Mantenha `.env.local` privado** (já no `.gitignore`)
5. **Não use a mesma senha** de outros serviços

---

## 📞 Suporte

Algum problema? Verif ique:
- `.env.local` existe e tem a senha correta
- Cookies estão habilitados no navegador
- JavaScript está ativado
- Você digitou a sequência `klondike` corretamente
