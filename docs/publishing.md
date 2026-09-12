# Publicação estática e rollback

## Configuração

O servidor institucional recebe **somente o conteúdo de `dist/`**. Não instale Node, npm ou dependências do projeto nele. Nenhum deploy automático foi configurado.

Copie `.env.example` para `.env` e preencha `SITE_URL` com a origem HTTPS confirmada pela equipe responsável. Não há um domínio real presumido nesta base. A variável aceita somente origem, sem usuário/senha, caminho, query, fragmento ou porta não padrão. Domínios locais, IPs e domínios reservados para exemplos são rejeitados.

`BASE_PATH=/` publica na raiz. Para um subdiretório confirmado, use, por exemplo, `BASE_PATH=/c4ai/`; este exemplo representa apenas um caminho. A base deve começar e terminar com `/`, com segmentos de letras ASCII, números, `_` ou `-`, sem segmentos relativos. Links, favicon, CSS, canonical e hreflang incorporam a base. Não coloque a base dentro de `SITE_URL`.

`.env` é local e ignorado pelo Git. Variáveis do processo têm precedência sobre `.env`, pelo carregamento nativo do Node. `build:local` e E2E não carregam `.env`; a origem de teste é explicitamente `http://127.0.0.1:4321`.

## Preparação do artefato

```sh
nvm use
npm ci
npx playwright install chromium
npm run quality
npm run build
npm run preview
```

`build` falha sem origem válida. `preview` requer a mesma configuração de publicação e serve os arquivos de `dist/`; ele não é um servidor de produção. Inspecione o HTML e os metadados, verificando que o domínio corresponde ao aprovado. A validação sintática não comprova propriedade nem existência de um domínio.

O teste de publicação incluído em `quality` gera um artefato temporário com subdiretório, verifica HTML e o remove. Ele não cria uma publicação nem valida uma infraestrutura externa. `.test-dist/` tem `noindex` e nunca deve ser enviado ao servidor.

## Publicação manual

1. Confirme domínio, base e configurações do servidor com a equipe USP. Registre a versão/revisão e os resultados de qualidade.
2. Empacote o conteúdo de `dist/`, identifique a release com data e revisão e guarde seu checksum junto aos registros. Preserve o artefato anterior antes de substituir arquivos.
3. Envie a release para um diretório separado. Prefira troca atômica de diretório ou symlink, caso a infraestrutura permita. Se não permitir, combine janela de manutenção e procedimento de cópia com a equipe responsável.
4. Configure `index.html` como índice dos diretórios, a base correta e `404.html` como documento de erro com **status HTTP 404**. Não configure fallback SPA que responda 200 a toda URL inexistente. Verifique também URLs sem barra final e preserve parâmetros ao normalizar rotas.
5. Faça verificações de `/`, `/pt/`, `/en/` e de uma URL inexistente, acrescidas da base quando houver. Confira idioma, seletor, conteúdo, canonical, hreflang, assets, teclado e comportamento sem JavaScript.
6. Ajuste cache de HTML para permitir atualização; assets com hash podem ter cache longo. Defina invalidação e confirme que a troca não mistura HTML novo com assets antigos.

A estrutura ainda contém conteúdo demonstrativo. Domínio configurado e build aprovado não significam aprovação editorial para publicar o site institucional definitivo.

## Rollback

Guarde a release anterior intacta, com seu checksum e configuração de domínio/base. Se houver falha, restaure o diretório ou ponteiro anterior, invalide o cache de HTML conforme o mecanismo adotado e repita as verificações das rotas e da 404. Prefira restaurar um artefato já validado a recompilar durante um incidente. Registre motivo, horário e release restaurada.

## Pendências da infraestrutura USP

Ainda desconhecidos: servidor HTTP e versão, domínio e subdiretório finais, acesso e protocolo de transferência, diretório público e permissões, TLS/DNS, cabeçalhos, cache/CDN, suporte a releases atômicas, configuração de página 404, redirecionamentos antigos e política de backup/rollback. Esses detalhes devem ser confirmados antes da publicação; não bloqueiam desenvolvimento e testes locais.

O repositório remoto e as proteções de `main` também serão configurados posteriormente. Consulte [qualidade](quality.md). Não há credenciais, integração com hospedagem ou upload nesta etapa.
