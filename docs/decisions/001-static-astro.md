# ADR 001 — Astro estático e manutenção por desenvolvedores

Status: adotada. Data: 2026-09-12.

## Contexto e decisão

O site institucional terá cerca de seis páginas por idioma, em português brasileiro e inglês, com atualizações pouco frequentes. Um mantenedor apoiado por agentes precisa conseguir revisar mudanças pequenas e transmitir o projeto a outro desenvolvedor.

Adotamos Astro em `output: 'static'`, componentes `.astro`, TypeScript estrito e CSS nativo. Toda renderização necessária ocorre no build. O servidor recebe HTML, CSS e arquivos estáticos, sem Node, APIs, banco de dados, CMS ou autenticação. Não há adapter nem framework de interface. JavaScript cliente só poderá ser introduzido como melhoria progressiva justificada.

O conteúdo demonstrativo é Markdown validado por coleções locais. Um identificador estável relaciona suas traduções; outro mapa explícito relaciona as rotas. Isso evita deduzir equivalência pela tradução de slugs. Os testes mantêm suas próprias expectativas para detectar exclusões acidentais.

CSS centralizado e tokens tornam as edições previsíveis. A navegação inicial usa links sempre visíveis; não é necessário código para menu recolhível. O design e favicon são demonstrativos.

## Consequências

As mudanças exigem novo build e publicação do artefato. Edição por não desenvolvedores e dados em tempo real não estão atendidos. Em troca, há pouca infraestrutura e superfície de manutenção. Recursos futuros que exijam estado ou servidor devem receber nova decisão, sem descaracterizar esta base silenciosamente.

Builds locais produzem `.test-dist/`, com `noindex`, e não podem ser confundidos com o artefato `dist/` de publicação. Origem HTTPS e base são parâmetros explícitos. Os testes não precisam conhecer a hospedagem real.

## Versões selecionadas

Conferidas na documentação oficial e nos campos `engines`/`peerDependencies` do registro npm em 2026-09-12, antes da instalação. Dependências diretas são exatas; o lockfile fixa as transitivas.

| Ferramenta                                  | Versão            | Motivo                                                                                                  |
| ------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
| Node / npm                                  | 24.21.0 / 11.19.0 | Linha LTS e npm distribuído junto; plugin Astro exige Node >=24.16 nessa linha                          |
| Astro                                       | 7.3.2             | Patch estável da linha 7.3; saída estática                                                              |
| TypeScript                                  | 6.0.3             | Interseção suportada por Astro check e typescript-eslint; TypeScript 7 não é compatível com esses peers |
| `@astrojs/check`                            | 0.9.10            | Tipagem e diagnósticos de componentes Astro                                                             |
| ESLint / `@eslint/js`                       | 10.10.0 / 10.0.1  | Configuração flat e regras recomendadas                                                                 |
| `eslint-plugin-astro` / `typescript-eslint` | 3.1.0 / 8.70.0    | Análise de Astro e TS; peers compatíveis com ESLint 10 e TS 6                                           |
| Prettier / `prettier-plugin-astro`          | 3.9.6 / 1.0.0     | Formatação com suporte a Astro                                                                          |
| Stylelint / `stylelint-config-standard`     | 17.15.0 / 40.0.0  | CSS nativo; configuração requer Stylelint 17                                                            |
| Playwright                                  | 1.63.0            | Testes do HTML compilado, Chromium fixado pelo pacote                                                   |
| `@axe-core/playwright`                      | 4.13.0            | Verificações automáticas de acessibilidade                                                              |
| `@types/node`                               | 24.13.4           | Tipos da mesma linha do runtime                                                                         |

`esbuild@0.28.2`, dependência transitiva, tem seu script de instalação autorizado por versão em `allowScripts`: seleciona e verifica seu executável nativo. O npm 11.19 bloqueia scripts não autorizados por padrão. Não autorize todos os scripts indiscriminadamente ao atualizar o lockfile. Nenhuma dependência de teste é usada pelo servidor institucional.

## Fontes e atualização

- [Node 24.21.0 e npm incluído](https://nodejs.org/en/download/archive/v24.21.0)
- [Astro 7.3](https://astro.build/blog/astro-730/) e [coleções atuais](https://docs.astro.build/en/guides/content-collections/)
- [Requisitos do eslint-plugin-astro](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/) e [compatibilidade do typescript-eslint](https://typescript-eslint.io/users/dependency-versions/)
- [TypeScript 6](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)
- [Prettier](https://prettier.io/docs/install), [plugin Astro](https://github.com/withastro/prettier-plugin-astro) e [Stylelint](https://stylelint.io/user-guide/get-started/)
- [Playwright](https://playwright.dev/docs/release-notes) e [axe no Playwright](https://playwright.dev/docs/accessibility-testing)

Atualizações devem ter escopo limitado: consultar versões oficiais e peers, alterar somente pacotes necessários, regenerar lockfile e executar `quality`. Não aplicar `npm audit fix --force`, `--legacy-peer-deps` ou atualização indiscriminada para resolver conflitos.
