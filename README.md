# Site institucional C4AI

Migração local de Home, Sobre, Pesquisas e Notícias em português e inglês, com 26 artigos do acervo inventariado. Astro estático, TypeScript estrito, componentes `.astro` e CSS nativo. Conteúdo, navegação, painéis e paginação funcionam sem JavaScript; busca e incorporações são melhorias progressivas. A migração técnica não representa aprovação editorial ou publicação. Veja [fontes, diferenças e pendências](docs/migration.md).

## Começar

Instale um gerenciador de versões de Node, como nvm, e use a versão exata de `.nvmrc`. Node 24.21.0 inclui npm 11.19.0; `engine-strict` impede instalações incompatíveis. Não é necessário instalar ferramentas globalmente além do ambiente Node.

```sh
nvm install
nvm use
node --version # v24.21.0
npm --version  # 11.19.0
npm ci
npx playwright install chromium
npm run dev
```

Abra <http://localhost:4321/> e escolha o idioma. No Linux de CI, use `npx playwright install --with-deps chromium`. Downloads são necessários na preparação inicial; as verificações obrigatórias não dependem de serviços externos.

Não é preciso criar `.env` para desenvolver ou executar `quality`. Para preparar publicação, copie `.env.example` para `.env` e preencha a origem HTTPS confirmada; consulte [publicação](docs/publishing.md).

## Comandos

| Comando                 | Comportamento                                                         |
| ----------------------- | --------------------------------------------------------------------- |
| `npm run dev`           | Servidor de desenvolvimento                                           |
| `npm run format`        | Formata fontes e documentação explicitamente                          |
| `npm run format:check`  | Verifica formatação sem editar                                        |
| `npm run lint`          | ESLint para JS/TS/Astro e Stylelint para CSS                          |
| `npm run check`         | Validação estática com `astro check`                                  |
| `npm run build`         | Exige `SITE_URL` real e gera somente arquivos estáticos em `dist/`    |
| `npm run build:local`   | Gera `.test-dist/`, com origem local e `noindex`                      |
| `npm run preview`       | Serve `dist/` localmente; usa a configuração de publicação            |
| `npm run preview:local` | Serve `.test-dist/` localmente                                        |
| `npm run test:config`   | Testa configuração, rejeições e build real em subdiretório temporário |
| `npm run test:e2e`      | Compila `.test-dist/` e executa Playwright                            |
| `npm run quality`       | Formatação check → lint → tipagem → configuração → build e E2E        |

`quality` nunca executa correções automáticas. Caches, saídas de build e relatórios são regenerados; fontes não são reescritas. O Playwright abre seu próprio servidor na porta 4321 e falha se já houver outro usando-a. Encerre `dev`/`preview` antes dos testes. O relatório pode ser aberto com `npx playwright show-report`.

## Organização

| Local                                          | Responsabilidade                                                             |
| ---------------------------------------------- | ---------------------------------------------------------------------------- |
| `src/pages/pt/`, `src/pages/en/`               | Entradas das páginas localizadas                                             |
| `src/pages/index.astro`, `src/pages/404.astro` | Escolha de idioma e erro bilíngue                                            |
| `src/components/`, `src/layouts/`              | Apresentação reutilizável e documento HTML compartilhado                     |
| `src/content/`, `src/content.config.ts`        | Coleções JSON de páginas, desafios e artigos; esquemas e pares validados     |
| `src/i18n/`                                    | Traduções de interface e correspondência explícita por ID de página          |
| `src/styles/`                                  | Tokens, CSS por responsabilidade e fontes locais; sem estilos embutidos      |
| `public/`                                      | Imagens e marcas locais, licença tipográfica; favicon tipográfico provisório |
| `scripts/`                                     | Execução dos modos Astro e validação de publicação                           |
| `tests/config/`, `tests/e2e/`                  | Contratos de configuração e site compilado                                   |
| `docs/`, `.github/`                            | Requisitos, decisões, qualidade, publicação e CI                             |

## Exemplos de edição

**Conteúdo institucional:** edite, por exemplo, `src/content/pages/about-pt.json` e `about-en.json`. `source` e `retrievedAt` registram a origem, sem substituir aprovação editorial. Título, descrição, idioma, identificador e blocos são validados. Páginas principais exigem ambos os idiomas. Os blocos têm tipos explícitos: `heading`, `html` sem scripts/estilos/eventos, `image`, `group` (linha/coluna/seção), `details`, `embed` e referência `challenge`. Preserve IDs de âncora usados por submenus e links antigos.

```json
{ "type": "html", "html": "<p>Texto aprovado pela equipe editorial.</p>" }
```

**Desafios:** edite `src/content/challenges/nlp2-pt.json` e sua contraparte. A página Pesquisas referencia os registros por `ref`; os oito pares são obrigatórios. Equipes e recursos ficam em painéis `details`. Não confunda os oito desafios com os dois subprojetos ainda não definidos.

**Artigos:** `src/content/articles/` contém título, descrição, data original, autoria, categorias, blocos, caminho local e origem. O `id` é o slug da rota. Para uma tradução confirmada, ambos os artigos recebem o mesmo `translationId`; use `null` sem par. O seletor informa a ausência em vez de inventar tradução. `sourceOrder` desempata artigos publicados no mesmo dia conforme a listagem original. Artigos portugueses que a fonte classificava somente como `News` estão em uma listagem complementar, documentada na migração. Para adicionar conteúdo além dos 26, obtenha escopo editorial, atualize as fixtures independentes e revise paginação, pares e ordenação.

**Imagens:** copie o arquivo aprovado para `public/media/`, registre dimensões em `src/data/media.json` e procedência/crédito/licença no registro da migração. Use `Media.astro` ou bloco `image`, com `alt` contextual quando necessário. O build não busca arquivos remotos. Retratos com nome adjacente e ilustrações decorativas não precisam duplicar texto acessível.

**Interface e navegação:** `src/i18n/ui.ts` e `navigation.ts` guardam os rótulos; `routes.ts` relaciona IDs `home`, `about`, `research`, `news` aos caminhos PT/EN. Não traduza identificadores. Links externos e destinos temporários são explícitos; confira antes de incorporá-los.

**Estilo:** edite `src/styles/tokens.css` e os arquivos CSS por responsabilidade, importados em `global.css`: navegação, rodapé, conteúdo editorial, páginas institucionais e notícias. Reconfira contraste, foco e larguras móveis. Fontes locais estão em `src/styles/fonts/`, com licença distribuída em `public/fonts/OFL.txt`.

**Nova página bilíngue:** crie seus registros e entradas Astro, acrescente o ID e os caminhos no mapa, reutilize `BaseLayout`/componentes e então inclua links. Atualize requisitos e fixtures com expectativas aprovadas, sem importar coleções ou rotas da aplicação nos testes. Não crie páginas vazias antecipadamente.

Depois de editar:

```sh
npm run format
npm run quality
```

## Referências do projeto

- [Inventário preservado](docs/inventory.md)
- [Migração e evidências](docs/migration.md)
- [Requisitos implementados e futuros](docs/requirements.md)
- [Política de qualidade e limites](docs/quality.md)
- [Decisão arquitetural e versões](docs/decisions/001-static-astro.md)
- [Publicação e rollback](docs/publishing.md)
- [Instruções para agentes](AGENTS.md)

Nenhum deploy automático está configurado. O servidor institucional receberá apenas o conteúdo de `dist/` e não precisará de Node.
