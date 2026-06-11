# ADMIN PANEL - GERENCIADOR DE VÍDEOS

## 🎥 Como Usar

### 1. Acessar o Painel de Admin
- URL: `http://localhost:3000/admin`
- Acesso livre (sem autenticação no momento)

### 2. Fazer Upload de Vídeos

1. **Preencha os campos:**
   - **Título** (obrigatório): Ex. "Roblox Gameplay"
   - **Cliente**: Ex. "Carlos Santana"
   - **Tipo**: Selecione entre as opções
   - **Descrição**: Detalhes sobre o vídeo
   - **Arquivo**: Selecione um MP4 (máximo 500MB)

2. **Clique em "Enviar Vídeo"**
   - O upload pode levar alguns minutos

3. **Vídeo aparecerá:**
   - Na lista de "Vídeos Salvos" no admin
   - Na seção "Portfólio de Vídeos" na página inicial

### 3. Gerenciar Vídeos

- **👁️ Ícone**: Assistir o vídeo
- **🗑️ Ícone**: Deletar o vídeo

### 📁 Estrutura de Armazenamento

```
projeto/
├── public/
│   └── portfolio-videos/     ← Vídeos salvos aqui
├── data/
│   └── videos.json           ← Metadados dos vídeos
```

### ⚙️ Configuração

#### Para Produção (Vercel/etc)

Se estiver usando `output: "export"` no next.config, a API de upload NÃO funcionará em estático.

**Solução:**
```js
// next.config.mjs
const nextConfig = {
  // Remova 'output: "export"' se precisar de uploads dinâmicos
  images: {
    unoptimized: true,
  },
};
```

#### Para Desenvolvimento

Tudo funciona normalmente com:
```bash
npm run dev
```

### 🔒 Segurança (Recomendações)

Atualmente o admin é público. Para produção, adicione autenticação:

1. Instale: `npm install next-auth bcryptjs`
2. Crie middleware de proteção
3. Adicione variáveis de ambiente para senha

## 📝 Arquivos Adicionados

- `src/app/admin/page.tsx` - Página de gerenciamento
- `src/app/api/videos/route.ts` - API de upload/delete
- `src/components/PortfolioVideos.tsx` - Componente de exibição
- `data/videos.json` - Banco de dados de vídeos

## 🐛 Troubleshooting

### Erro: "ENOENT: no such file or directory"
Crie a pasta `data/` na raiz do projeto manualmente:
```bash
mkdir data
```

### Vídeos não aparecem na home
1. Verifique se vídeos foram salvos em `data/videos.json`
2. Recarregue a página
3. Limpe o cache do navegador

### Upload lento
- Vídeos grandes podem levar tempo
- Máximo recomendado: 100-200MB
- Comprima antes de fazer upload se possível

## 💡 Próximos Passos Sugeridos

1. **Adicionar autenticação** - Proteger o admin
2. **Integrar storage externo** - AWS S3, Google Cloud Storage
3. **Adicionar validação** - Verificar tipo de arquivo
4. **Criar thumbnails** - Gerar previews de vídeos
5. **Otimizar vídeos** - Compress automaticamente
