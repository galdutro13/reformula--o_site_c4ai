# Validação da atualização editorial — 06/10/2026

## Resultado

**Implementação integrada validada localmente.** `npm run quality` terminou com código **0**, com **11 testes de configuração e 518 testes de navegador aprovados**. O Astro analisou 54 arquivos com **0 erros, 0 warnings e 0 hints**; o build estático gerou 38 páginas. O registro integral está em [quality.txt](quality.txt).

A suíte foi executada em Node **24.15.0** e npm **11.12.1**, disponíveis neste ambiente, diferentes das versões fixadas **24.21.0/11.19.0**. Não houve atualização de dependências ou do lockfile. Permanece somente o aviso preexistente de complexidade 15 (limite 10) em `tests/e2e/site.spec.ts`, agora na linha 26, sem supressão. O runner também emitiu avisos de precedência de `FORCE_COLOR` sobre `NO_COLOR`, sem falha.

Esses resultados pertencem à implementação de outubro e substituem, para esta entrega, o estado anterior de cinco testes de configuração e 486 testes de navegador. Não equivalem a homologação editorial externa ou publicação.

## Verificações executadas

| Verificação                  | Resultado observado                                                                                                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prettier, ESLint e Stylelint | Aprovados; mantido o aviso preexistente de complexidade                                                                                                  |
| Astro check e build          | 0 erros/warnings/hints; 38 páginas estáticas                                                                                                             |
| Configuração e schemas       | 11 testes aprovados, incluindo seis novos testes de conteúdo obrigatório, Home vazia, associações Macro/OBIA e Micro/HarpIA, idioma, ordem e procedência |
| Navegador                    | 518 testes aprovados em 50,7 s, quatro projetos Chromium: desktop/mobile com e sem JavaScript                                                            |
| Conteúdo PT/EN               | Novos textos e metadados; dois eixos; Macro/Micro; HarpIA atual; KEML completo ao final do histórico; liderança, fotos e contatos conforme contrato      |
| Rodapé e navegação           | CIAAM/USP e redes sociais verificados nas páginas obrigatórias, inclusive artigos; destinos retirados ausentes                                           |
| Workshop e mapa              | Ano 2022, URL preservada, alternativa sem JavaScript, iframe somente após ação e política de Referer verificados; mapa preservado                        |
| Acessibilidade e navegação   | Axe nos projetos com JS, teclado, ausência de transbordamento inclusive a 320 px, idioma, metadados e links/fragmentos/assets aprovados                  |
| Subdiretório                 | Teste de produção em diretório temporário validou HTML, metadados e assets com `BASE_PATH`                                                               |
| Logo CIAAM                   | Download do arquivo original aprovado; arquivo local PNG 1648 × 646; proporções e legibilidade conferidas no rodapé                                      |
| Revisão visual               | Home, Sobre e Pesquisas PT/EN em desktop/mobile, com 32 capturas efetivamente examinadas                                                                 |
| Preservação do escopo        | Fontes dos oito grupos migrados, notícias, artigos, pares de rotas, evidências históricas, dependências, lockfile e AGENTS.md não foram alterados        |
| Revisão estática             | Revisão independente dos componentes, modelos, dados e estilos integrados sem achado acionável; diff sem erro de whitespace                              |

As fixtures editoriais continuam independentes das coleções. As expectativas substituídas e acrescentadas estão justificadas em [changed-expectations.json](changed-expectations.json), incluindo a tradução autorizada da biografia inglesa de João Paulo Veiga. Nenhuma regra, limite, retry, tag de acessibilidade ou exclusão foi relaxada.

## Revisão visual e capturas

O [manifesto](captures.json) registra página, idioma, estado, viewport, método e timestamp real de cada imagem em [screenshots](screenshots/). Foram examinados os dois cartões de pesquisa, links Macro/Micro, liderança em duas linhas de três pessoas no desktop e empilhada no mobile, destaques YouTube/Flickr, apresentação e localização, galeria, contato, histórico KEML e rodapé CIAAM/USP.

As 12 capturas completas usam larguras de 1440 e 390 pixels, com viewports iniciais de 1440 × 900 e 390 × 844, sem JavaScript. Os 20 recortes usam a mesma largura, mas altura ampliada à seção, registrada individualmente. Os testes de navegador verificam também os tamanhos convencionais e a largura de 320 px; a altura ampliada dos recortes não é apresentada como viewport móvel convencional.

Na primeira geração dos recortes, o Chromium desenhou indevidamente o link fixo de salto sobre a imagem ao ampliar internamente a captura. A inspeção do DOM na viewport real confirmou que o link, sem foco, permanecia acima da área visível (`top: -96px`, `bottom: -44px`). Os recortes foram regenerados com altura de viewport explícita e examinados novamente, sem alterar CSS para ocultar conteúdo. As capturas completas de Pesquisas foram atualizadas após alinhar a introdução visível à organização Macro/Micro.

## Correções durante a validação

- Após a mudança do schema, o cache anterior do Astro ainda continha linhas sem o novo valor padrão de subdivisões. `npm run build:local -- --force` regenerou o cache; o build e a execução final de `quality` funcionaram normalmente, sem fallback para ocultar dados inválidos.
- Stylelint detectou ordem inadequada dos novos seletores. As regras de liderança foram organizadas no stylesheet de Sobre e os seletores gerais/específicos foram reordenados, mantendo seus valores e a regra de lint.
- O check de TypeScript detectou parâmetros e acesso dinâmico sem tipos nos novos testes `.mjs`. Os testes receberam anotações JSDoc e construção explícita dos casos incompletos, sem `any`, exclusões ou supressões.
- O preview usado na revisão visual ocupava o registro exclusivo de preview do Astro. Esse processo foi encerrado antes da suíte final; não houve reutilização de servidor nem remoção artificial de lock.

A verificação final usou `npm run quality` integralmente, sem flags que pulem etapas. Após registrar os resultados, a formatação da documentação e o diff foram verificados novamente.

## Limitações e entrega

A suíte usa Chromium e bloqueia requisições externas. Não foram testados Firefox/WebKit, leitores de tela, reprodução integral no YouTube, disponibilidade de todos os destinos externos nem a infraestrutura de publicação USP. O download do logo e a consulta das fontes HarpIA são verificações separadas, descritas no [registro editorial](editorial.md).

Não houve commit, push ou publicação. As alterações estão no diretório de trabalho para revisão do mantenedor.
