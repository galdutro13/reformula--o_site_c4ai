# Site institucional C4AI

Base demonstrativa para a reformulação do site: Astro estático, TypeScript estrito, componentes `.astro` e CSS nativo. Conteúdo e navegação funcionam sem JavaScript. O conteúdo institucional completo, o design definitivo e a migração do WordPress são etapas futuras.

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

| Local                                          | Responsabilidade                                                           |
| ---------------------------------------------- | -------------------------------------------------------------------------- |
| `src/pages/pt/`, `src/pages/en/`               | Entradas das páginas localizadas                                           |
| `src/pages/index.astro`, `src/pages/404.astro` | Escolha de idioma e erro bilíngue                                          |
| `src/components/`, `src/layouts/`              | Apresentação reutilizável e documento HTML compartilhado                   |
| `src/content/`, `src/content.config.ts`        | Markdown demonstrativo, consulta com validação de pares e esquemas         |
| `src/i18n/`                                    | Traduções de interface e correspondência explícita por ID de página        |
| `src/styles/`                                  | Tokens e todo CSS utilizado; não há `<style>` nem `style=` nos componentes |
| `public/`                                      | Arquivos copiados sem transformação; favicon tipográfico provisório        |
| `scripts/`                                     | Execução dos modos Astro e validação de publicação                         |
| `tests/config/`, `tests/e2e/`                  | Contratos de configuração e site compilado                                 |
| `docs/`, `.github/`                            | Requisitos, decisões, qualidade, publicação e CI                           |

## Exemplos de edição

**Texto demonstrativo:** edite `src/content/demonstrations/home-pt.md` e sua tradução `home-en.md`. Preserve o mesmo `translationId: home`, o idioma de cada arquivo e `demonstration: true`. Título e descrição são obrigatórios; o corpo Markdown é renderizado na página. Pares ausentes ou duplicados causam erro no build.

**Interface:** altere as duas entradas de `src/i18n/ui.ts`, por exemplo `explore`. Os nomes das chaves devem permanecer correspondentes. IDs de página não são traduzidos: `home` aponta explicitamente para `/pt/` e `/en/` em `src/i18n/routes.ts`.

**Estilo:** altere tokens como `--color-accent` em `src/styles/tokens.css`. Regras de apresentação ficam em `global.css`. Reconfira contraste, foco e larguras móveis. Se passar a usar CSS dentro de Astro, configure sua análise no Stylelint na mesma alteração; não deixe CSS sem verificação.

**Nova página bilíngue:** quando seu conteúdo for aprovado, crie as duas páginas em `src/pages/pt/` e `src/pages/en/`, acrescente um ID estável e os dois caminhos ao mapa, reutilize `BaseLayout` com esse `pageId` e só então acrescente links. Atualize requisitos e fixtures de aceitação com títulos, rotas e metadados esperados, sem importar o mapa da aplicação nos testes. O seletor passa a apontar para a contraparte desse ID. Não crie antecipadamente páginas vazias ou links futuros.

Depois de editar:

```sh
npm run format
npm run quality
```

## Referências do projeto

- [Requisitos implementados e futuros](docs/requirements.md)
- [Política de qualidade e limites](docs/quality.md)
- [Decisão arquitetural e versões](docs/decisions/001-static-astro.md)
- [Publicação e rollback](docs/publishing.md)
- [Instruções para agentes](AGENTS.md)

Nenhum deploy automático está configurado. O servidor institucional receberá apenas o conteúdo de `dist/` e não precisará de Node.
