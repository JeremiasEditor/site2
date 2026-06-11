# 🚀 Configuração para Produção (Vercel/Deploy)

## ✅ Verificação de Deploy

### 1. Variáveis de Ambiente Necessárias

No painel de **Environment Variables** do seu deploy, adicione:

```env
ADMIN_PASSWORD=sua_senha_super_forte_aqui
```

### 2. Configurações do Next.js

✅ **Sem `output: "export"`** - Permite APIs dinâmicas
✅ **Middleware ativado** - Protege `/admin`
✅ **API Routes funcionam** - `/api/videos`, `/api/auth`

### 3. Armazenamento de Arquivos

⚠️ **IMPORTANTE:** O armazenamento local (`/public/portfolio-videos/`) **NÃO funciona em Vercel** porque é serverless (sem sistema de arquivos persistente).

**Opções:**

1. **AWS S3** (Recomendado)
   ```bash
   npm install aws-sdk
   ```
   - Mais barato
   - Escalável
   - Persistent

2. **Supabase Storage** (Recomendado para iniciantes)
   ```bash
   npm install @supabase/supabase-js
   ```
   - Simples de configurar
   - PostgreSQL + Storage
   - Plano gratuito generoso

3. **Cloudinary** (Para vídeos)
   ```bash
   npm install cloudinary
   ```
   - Otimizado para vídeos
   - Streaming automático
   - Transformações de imagem

4. **Firebase Storage**
   ```bash
   npm install firebase
   ```
   - Google Cloud
   - Real-time
   - Fácil integração

### 4. Banco de Dados

Para manter a lista de vídeos persistente, adicione um banco:

**Opção A: Supabase (PostgreSQL)**
```javascript
// Substitua o sistema local por:
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, key)
await supabase.from('videos').insert([...])
```

**Opção B: MongoDB Atlas**
```bash
npm install mongodb
```

**Opção C: PlanetScale (MySQL)**
```bash
npm install @prisma/client
```

### 5. Configuração para Vercel

**Arquivo `vercel.json`:**
```json
{
  "env": {
    "ADMIN_PASSWORD": "@admin_password"
  },
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 60
    }
  }
}
```

### 6. Deploy Steps

```bash
# 1. Instale Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Configure variáveis
# → Dashboard → Settings → Environment Variables

# 4. Redeploy
vercel --prod
```

---

## 🔧 Próximas Melhorias

- [ ] Integrar com Supabase Storage
- [ ] Adicionar banco de dados
- [ ] Cache de vídeos
- [ ] CDN para streaming
- [ ] Autenticação com GitHub/Google
- [ ] Webhooks de upload

---

## 📋 Checklist Final

- [ ] `.env.local` criado com `ADMIN_PASSWORD`
- [ ] `next.config.mjs` sem `output: "export"`
- [ ] Remote Git configurado com SSH
- [ ] Push feito com sucesso
- [ ] Vercel conectado ao GitHub
- [ ] Environment variables adicionadas
- [ ] Deploy bem-sucedido

---

## 🆘 Troubleshooting

### Push não chega no GitHub
✅ Use SSH em vez de HTTPS:
```bash
git remote set-url origin git@github.com:SEU_USER/SEU_REPO.git
```

### API não funciona em produção
✅ Remova `output: "export"` do `next.config.mjs`

### Upload de vídeos falha em produção
✅ Integre com storage externo (S3, Supabase, etc)

### Autenticação não funciona
✅ Verifique se `ADMIN_PASSWORD` está em Environment Variables
