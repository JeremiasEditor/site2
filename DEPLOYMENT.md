# Tutorial de Deploy no Railway

Este tutorial irá guiá-lo passo a passo para fazer o deploy deste projeto Next.js no Railway.

## Pré-requisitos

Antes de começar, você precisará de:

- [ ] Conta no GitHub (gratuita em https://github.com)
- [ ] Conta no Railway (gratuita em https://railway.app)
- [ ] Git instalado no seu computador
- [ ] Docker instalado no seu computador (para testes locais)
- [ ] Código do projeto em um repositório GitHub

## Passo 1: Preparar o Repositório GitHub

### 1.1 Fazer fork ou clonar o repositório

Se você tem acesso ao repositório original:
```bash
git clone https://github.com/zinyzin/terceirao.git
cd terceirao
```

Se você fez um fork:
```bash
git clone https://github.com/SEU-USUARIO/terceirao.git
cd terceirao
```

### 1.2 Verificar os arquivos de configuração

Certifique-se que os seguintes arquivos existem no root do projeto:
- `dockerfile` - Configuração do Docker
- `.dockerignore` - Arquivos a ignorar no build
- `package.json` - Dependências do projeto
- `next.config.mjs` - Configuração do Next.js

## Passo 2: Testar Localmente (Opcional)

### 2.1 Testar o Docker localmente

Antes de fazer o deploy, é recomendável testar o build localmente:

```bash
# Buildar a imagem Docker
docker build -t terceirao .

# Rodar o container
docker run -p 80:80 terceirao
```

Acesse http://localhost:3000 para verificar se o site está funcionando.

Se funcionar corretamente, pare o container com Ctrl+C e remova a imagem:
```bash
docker container prune
docker image prune
```

### 2.2 Testar sem Docker

Você também pode testar o projeto sem Docker:

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

Acesse http://localhost:3000 para verificar.

## Passo 3: Fazer Push das Mudanças

Se você fez alterações no código, faça commit e push:

```bash
# Verificar mudanças
git status

# Adicionar arquivos
git add .

# Commitar
git commit -m "Sua mensagem de commit"

# Push para o GitHub
git push origin master
```

## Passo 4: Configurar o Railway

### 4.1 Criar conta no Railway

1. Acesse https://railway.app
2. Clique em "Sign Up" ou "Login"
3. Você pode usar sua conta GitHub para login (recomendado)

### 4.2 Criar novo projeto

1. No dashboard do Railway, clique em "New Project"
2. Selecione "Deploy from GitHub repo"
3. O Railway pedirá permissão para acessar seus repositórios GitHub
4. Autorize o acesso se solicitado

### 4.3 Selecionar o repositório

1. Na lista de repositórios, encontre e selecione `terceirao`
2. Se não aparecer, clique em "Configure" para adicionar o repositório manualmente

### 4.4 Configurar o deploy

O Railway detectará automaticamente o Dockerfile e configurará o build. Verifique as configurações:

**Build Configuration:**
- **Build Command**: (deixar vazio, Railway detectará automaticamente)
- **Start Command**: (deixar vazio, Railway detectará automaticamente)

**Environment Variables (se necessário):**
- Geralmente não há necessidade de variáveis de ambiente para este projeto estático

### 4.5 Iniciar o deploy

1. Clique em "Deploy" ou "Create Project"
2. O Railway iniciará o processo de build e deploy
3. Você pode acompanhar o progresso nos logs

## Passo 5: Acompanhar o Deploy

### 5.1 Monitorar o build

O processo de build envolve:
1. **Clone do repositório** - Railway baixa seu código
2. **Build Docker** - Constrói a imagem Docker
3. **Deploy** - Inicia o container

Isso pode levar de 2-10 minutos dependendo do tamanho do projeto.

### 5.2 Verificar logs

Clique no seu projeto e depois em "Deployments" para ver os logs em tempo real.

### 5.3 Troubleshooting comum

**Erro de build:**
- Verifique se o Dockerfile está correto
- Certifique-se que o Node.js versão 18 está sendo usado
- Veja os logs para identificar o erro específico

**Erro de runtime:**
- Verifique se as portas estão configuradas corretamente (porta 80)
- Certifique-se que o nginx está configurado para servir arquivos estáticos

## Passo 6: Acessar o Site Deployed

### 6.1 Obter a URL

Quando o deploy terminar com sucesso, o Railway fornecerá uma URL como:
```
https://seu-projeto.up.railway.app
```

### 6.2 Configurar domínio personalizado (Opcional)

Se você tem um domínio próprio:

1. No projeto Railway, vá em "Settings"
2. Clique em "Domains"
3. Clique em "New Domain"
4. Insira seu domínio (ex: `seusite.com`)
5. Configure os DNS conforme as instruções do Railway

## Passo 7: Configurar CI/CD (Automatizar Deploy)

### 7.1 Deploy automático

Por padrão, o Railway fará deploy automático sempre que você fizer push para o branch master.

### 7.2 Configurar branches diferentes

Se você quer deploy automático de branches específicos:

1. Vá em "Settings" no seu projeto Railway
2. Clique em "GitHub"
3. Configure quais branches devem trigger deploy automático

## Manutenção

### Atualizar o site

Quando fizer mudanças no código:

```bash
# Fazer commit das mudanças
git add .
git commit -m "Descrição das mudanças"
git push origin master
```

O Railway detectará automaticamente e fará um novo deploy.

### Monitorar uso

- Vá ao dashboard do Railway
- Verifique o uso de CPU, memória e bandwidth
- Plano gratuito tem limites mensais

### Rollback

Se algo der errado:

1. Vá em "Deployments" no Railway
2. Encontre o deploy anterior que funcionava
3. Clique no botão de rollback (↩️)

## Dicas e Melhores Práticas

### 1. Otimizar imagens
- Comprima vídeos e imagens grandes antes de commitar
- Use ferramentas como TinyPNG para imagens

### 2. Usar .dockerignore
- Certifique-se que node_modules está no .dockerignore
- Isso reduz significativamente o tempo de build

### 3. Variáveis de ambiente
- Para dados sensíveis, use variáveis de ambiente no Railway
- Nunca commite senhas ou chaves de API

### 4. Monitorar custos
- O plano gratuito tem limites
- Monitore o uso regularmente para evitar cobranças inesperadas

### 5. Backups
- Mantenha backup dos dados importantes
- Railway não faz backup automático de banco de dados

## Solução de Problemas Comuns

### Erro: "Build failed"

**Possíveis causas:**
- Dockerfile incorreto
- Dependências faltando no package.json
- Node.js versão incompatível

**Solução:**
- Verifique os logs do build
- Teste localmente com `docker build`
- Revise o Dockerfile

### Erro: "Application not responding"

**Possíveis causas:**
- Porta incorreta
- Aplicação crashando
- Nginx mal configurado

**Solução:**
- Verifique logs de runtime
- Certifique-se que a porta 80 está exposta
- Teste localmente

### Erro: "Out of memory"

**Possíveis causas:**
- Projeto muito grande
- Muitos arquivos de mídia
- Memory leak no código

**Solução:**
- Otimizar assets
- Reduzir número de arquivos
- Usar streaming para vídeos grandes

## Recursos Úteis

- [Railway Documentation](https://docs.railway.app)
- [Docker Documentation](https://docs.docker.com)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Railway Community Discord](https://discord.gg/railway)

## Suporte

Se você tiver problemas:

1. Verifique os logs do Railway
2. Consulte a documentação oficial
3. Procure na comunidade Railway
4. Abra uma issue no GitHub do projeto

---

**Dica final**: Sempre teste localmente antes de fazer deploy em produção. Isso economiza tempo e evita problemas no ambiente de produção.