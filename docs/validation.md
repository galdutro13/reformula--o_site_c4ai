# Validação da base — 2026-09-12

## Ambiente e resultados observados

Execução local em macOS ARM64 com Node 24.21.0, npm 11.19.0, Astro 7.3.2 e Chromium 153.0.8010.12, revisão Playwright 1243. Node foi obtido da distribuição oficial, com SHA256 conferido, e usado isoladamente para não alterar o Node global da máquina.

A reinstalação com `npm ci` terminou com saída 0. O npm registrou aviso sobre o script da dependência opcional macOS `fsevents@2.3.3`; sua execução não foi autorizada indiscriminadamente. Após reinstalar, `npm run dev` iniciou e respondeu 200 com conteúdo principal em `/`, `/pt/` e `/en/`. O navegador Chromium e o preview também foram executados localmente. Os servidores de inspeção foram encerrados ao concluir.

`npm run quality` passou: Prettier, ESLint e Stylelint sem erros; `astro check` com zero erros, avisos e hints; quatro testes de configuração aprovados; build estático com quatro páginas; 56 testes Playwright aprovados. São 48 verificações funcionais nos quatro projetos e oito análises axe em desktop/mobile com JavaScript habilitado. Nenhum teste foi marcado como ignorado ou pendente.

As oito análises axe retornaram zero violações nas tags WCAG A/AA selecionadas. Teclado, idioma, links, metadados, conteúdo e ausência de transbordamento passaram, incluindo navegação sem JavaScript e largura de 320 pixels. O build de publicação temporário verificou URLs em `/centro/`, assets, canonical, hreflang e ausência de `noindex` nas páginas normais; não acessou nem publicou no domínio usado pelo teste.

## Falhas introduzidas e detectadas

Cada alteração foi isolada. Os arquivos originais foram guardados em memória e restaurados em bloco `finally`, com comparação byte a byte. Os comandos abaixo são as verificações afetadas que também integram `quality`.

| Alteração temporária                                        | Comando                                                                                 | Resultado real                                                                                                      |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Remover `title` de `home-pt.md`                             | `npm run build:local`                                                                   | Saída 1; `InvalidContentEntryDataError`, `title: Required`                                                          |
| Trocar o link da demonstração por `/link-interno-quebrado/` | Build local, seguido de `npx playwright test --project=desktop --grep 'links internos'` | Build passou; teste saiu 1, identificando o link e resposta 404 quando esperava 200                                 |
| Remover `src/pages/en/index.astro`, preservando fixtures    | Build local, seguido de `npx playwright test --project=desktop --grep '/en/: conteúdo'` | Build passou com a página ausente; teste obrigatório continuou existindo e saiu 1, resposta 404 quando esperava 200 |

Após a restauração dos três arquivos, o build local voltou a passar. As provas demonstram que build bem-sucedido sozinho não basta: links quebrados e exclusões de páginas são detectados pelo contrato E2E independente.

## Inspeção visual

Foram capturadas e examinadas as quatro páginas (`/`, `/pt/`, `/en/`, `/404.html`) no Chromium, em 1440×900 e 390×844, usando screenshots de página inteira do artefato compilado. Cabeçalho, seletor, títulos, conteúdo, botões e rodapé ficaram legíveis, sem sobreposições ou cortes observados. A composição é demonstrativa, não uma aprovação de identidade visual definitiva.

## Ajustes de integração documentados

- O arquivo existente `/404.html` é servido com 200 pelo preview. O teste separado de URL inexistente exige 404 e a página de erro; esse requisito não foi relaxado.
- Axe não concluiu em contextos com JavaScript desabilitado, inclusive no modo legado. A instrumentação está restrita aos dois projetos com JavaScript; todos os testes funcionais continuam nos quatro. Não foram removidas regras WCAG ou toleradas violações.
- O preview do Astro detecta agentes e pode destacar o processo. A configuração de ambiente descrita em `quality.md` permite ao Playwright controlar o servidor pela CLI sem recorrer à API experimental.
- CSS compartilhado é emitido como arquivo, com `inlineStylesheets: 'never'`, permitindo conferir o caminho dos assets no build com subdiretório.

Não houve redução de regras de lint, tipagem, formatação ou aceitação para aprovar a entrega. A complexidade permanece aviso acima de 10. O script nativo `esbuild@0.28.2` foi autorizado especificamente para permitir a instalação reproduzível.

## Limites da entrega

O workflow foi criado, mas não executado no GitHub porque não existe remoto. Não foram validados infraestrutura USP, DNS/TLS, publicação, rollback real, navegadores além de Chromium ou conformidade integral WCAG. Não houve commit, push ou deploy.
