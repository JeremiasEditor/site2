# Configuração do Banco de Dados e Mídia no Railway

Este projeto salva **todo o conteúdo editado pelo painel `/admin`** (textos,
portfólio, serviços, processo, contato, metadados dos vídeos) no **PostgreSQL
do Railway**, e os **arquivos de vídeo** num **Volume persistente**.

Sem isso, o Railway apagaria tudo a cada novo deploy (o disco do container é
temporário). Siga os passos abaixo **uma vez**.

---

## 1. Adicionar o PostgreSQL

1. No seu projeto do Railway, clique em **+ New** → **Database** → **Add PostgreSQL**.
2. O Railway cria o banco e a variável `DATABASE_URL` automaticamente.

## 2. Ligar o banco ao serviço do site

1. Abra o serviço do **site** (não o do banco) → aba **Variables**.
2. Clique em **+ New Variable** → **Add Reference** → escolha o Postgres →
   variável `DATABASE_URL`.
   - Isso usa a **rede interna** do Railway (host `...railway.internal`), que é
     mais rápida e **não precisa de SSL**.
3. (Opcional) Se, por algum motivo, você usar a **URL pública** do banco em vez
   da interna, adicione também `DATABASE_SSL=true`.

As tabelas (`site_content` e `videos`) são criadas **sozinhas** na primeira vez
que o site acessa o banco. Você não precisa rodar nenhum SQL manualmente.

## 3. Adicionar o Volume (arquivos de vídeo)

1. No serviço do **site**, clique em **+ New** (ou **Settings** → **Volumes**)
   → **Add Volume**.
2. Defina o **Mount Path** como:

   ```
   /app/data
   ```

3. Salve. Pronto — os vídeos enviados pelo admin passam a ser gravados em
   `/app/data/media` e sobrevivem aos deploys.

> Observação: o app já usa `data/media` por padrão, então basta montar o
> volume em `/app/data`. Se preferir outro caminho, monte o volume onde quiser
> e defina a variável `MEDIA_DIR` apontando para `<mount>/media`.

## 4. Definir a senha do admin

Na aba **Variables** do serviço do site, defina:

```
ADMIN_PASSWORD=uma-senha-forte-sua
```

(Se não definir, o padrão inseguro `admin123` é usado — troque em produção.)

## 5. Fazer o deploy

Faça commit e push (o Railway faz deploy automático), ou clique em **Deploy**.
Depois do deploy:

- Acesse `/admin-login`, entre com a senha e edite textos/vídeos.
- Faça um **redeploy** e confirme que as alterações **continuam lá**. 🎉

---

## Como fica o armazenamento

| Dado | Onde é salvo |
|------|--------------|
| Textos, links, portfólio, serviços, processo, contato | Postgres — tabela `site_content` (uma linha, JSON) |
| Metadados dos vídeos (título, cliente, tipo, URL) | Postgres — tabela `videos` |
| Arquivos de vídeo (MP4) e vídeo de fundo | Volume do Railway em `/app/data/media` |

Os vídeos são servidos pela rota `/api/media/<arquivo>` (com suporte a
_streaming_/seek).

## Desenvolvimento local

Sem `DATABASE_URL`, o site cai automaticamente num **modo de arquivos**:
o conteúdo vai para `data/content.json` / `data/videos.json` e os vídeos para
`data/media/`. Assim você desenvolve sem precisar de um banco na sua máquina.
Para testar com Postgres local, defina `DATABASE_URL` no arquivo `.env.local`.
