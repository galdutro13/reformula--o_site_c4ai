# Retomada da validação do cabeçalho — 14/10/2026

Branch: `fase2_reformulacao`. Base conferida: `7f7763511bc5449dc52c00690fa6228e3606e818`.

Esta rodada retoma as três pendências do [registro anterior](../2026-10-14-header-interactions/validation.md#o-que-falta-na-retomada), considerando também a correção posterior do primeiro clique após hover. Nenhum arquivo de implementação, conteúdo, teste, configuração ou dependência foi alterado. As mudanças são evidências e documentação; não houve commit, push ou publicação.

## Resultado das pendências

| Pendência                                        | Resultado atual                                                                                                                                                                                                             |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Executar a qualidade com as versões fixadas      | Concluída: Node 24.21.0/npm 11.19.0, 21 testes de configuração e 726 de navegador aprovados.                                                                                                                                |
| Refazer capturas de zoom com setas estabilizadas | Concluída: oito capturas PT/EN, 200%/400%, menu fechado e Sobre/About aberto.                                                                                                                                               |
| Conferir no Safari do computador                 | Parcial: destinos, cliques de submenu, Escape desktop e alinhamento compacto observados no Safari 27.0.1. Hover isolado, percurso completo por Tab e matriz exata de larguras/artigos ainda precisam de homologação nativa. |

## Qualidade com o ambiente fixado

`npm run quality` terminou com código 0, usando as configurações originais: formatação, lint, Astro, testes de configuração e os quatro projetos Chromium (`desktop`, `mobile`, `desktop-no-js`, `mobile-no-js`). Foram aprovados **21 testes de configuração e 726 testes de navegador**; a etapa de navegador durou 1,6 minuto. Astro verificou 71 arquivos sem erros, avisos ou hints, e o build gerou 38 páginas estáticas. Permaneceu somente o aviso preexistente de complexidade 15/10 em `tests/e2e/site.spec.ts`, sem supressão.

O runtime foi preparado em pasta temporária a partir das distribuições oficiais, com SHA-256 de Node e integridade SHA-512 de npm conferidos. O runtime global e as dependências do projeto permaneceram intactos. A execução utilizou um snapshot isolado com as dependências existentes; não mudou limites, retries, exclusões, fixtures, scripts ou portas da configuração. A comparação de 721 arquivos copiados e de 226 arquivos de implementação/configuração não encontrou divergências entre o snapshot validado e o workspace.

Evidências: [log integral](quality/quality-pinned.txt), [resumo e integridade](quality/verification-summary.json), [procedência do runtime](quality/runtime-provenance.json), [manifesto do snapshot](quality/source-manifest-before.json) e [manifesto de implementação/configuração](quality/source-and-config-manifest.json). SHA-256 do log: `6a328040c7525cba7b1e21e688acf040c5ae438ea7f1f4d9c2730dd6172167cf`.

## Capturas de zoom estabilizadas

As oito imagens em [zoom](zoom/index.json) foram capturadas e inspecionadas em Chromium 153.0.8010.12, nas duas línguas, usando zoom real do navegador. A API do perfil temporário confirmou os fatores 2 e 4; os viewports resultantes foram 720 × 406 e 360 × 203 CSS px. Nenhuma extensão foi instalada no navegador do mantenedor.

Antes de cada captura, o procedimento aguardou as fontes, dois quadros de animação e o estado final do chevron: `none` fechado ou `matrix(-1, 0, 0, -1, 0, 0)` aberto, com movimento reduzido. A superfície capturada tem 1440 × 813 px. Os oito arquivos finais foram inspecionados, sem erros de página ou transbordamento horizontal. Os quatro indicadores mantiveram o mesmo eixo; os idiomas foram alcançados por rolagem normal.

As imagens mostram o viewport, não a extensão inteira do menu aberto. O restante foi conferido por geometria e rolagem, registrado no índice. O [helper reproduzível](zoom/capture.mjs.txt) acompanha as medidas. A primeira passagem foi preservada em `zoom-first-pass/`, e 123 arquivos de origem comparados antes/depois permaneceram idênticos. As evidências antigas com setas em transição não foram substituídas nem apresentadas como capturas estabilizadas.

| Idioma           | Zoom 200%                             | Zoom 400%                             |
| ---------------- | ------------------------------------- | ------------------------------------- |
| PT, fechado      | [Imagem](zoom/pt-zoom-200-closed.png) | [Imagem](zoom/pt-zoom-400-closed.png) |
| PT, Sobre aberto | [Imagem](zoom/pt-zoom-200-about.png)  | [Imagem](zoom/pt-zoom-400-about.png)  |
| EN, fechado      | [Imagem](zoom/en-zoom-200-closed.png) | [Imagem](zoom/en-zoom-400-closed.png) |
| EN, About aberto | [Imagem](zoom/en-zoom-200-about.png)  | [Imagem](zoom/en-zoom-400-about.png)  |

## Conferência no Safari nativo

Foi usado o aplicativo Safari **27.0.1**, identificado pelo `Info.plist` instalado, com uma aba dedicada no servidor local `http://127.0.0.1:4340/`. Esta conferência usa a interface nativa e sua árvore de acessibilidade; não é uma execução de Playwright WebKit. As telas nativas foram inspecionadas na conversa, mas não exportadas como arquivos PNG deste diretório.

| Verificação                                                  | Observação real                                                                                                                                                                                             |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Início/Home, Sobre/About, Pesquisas/Research e Notícias/News | Páginas acessadas nos dois idiomas; links principais preservaram os destinos. A troca de idioma a partir de Notícias levou a News.                                                                          |
| Primeiro e segundo clique na seta de Sobre                   | Em PT desktop, o primeiro clique manteve o painel aberto e o segundo fechou; em About EN, o primeiro clique também manteve a abertura.                                                                      |
| Painel Sobre/About                                           | Quatro links institucionais sob o acionador, com nomes e destinos esperados.                                                                                                                                |
| Exclusividade desktop                                        | Abrir Recursos após Notícias fechou Notícias. Novo clique em Recursos fechou o painel.                                                                                                                      |
| Teclado desktop                                              | Enter abriu o painel focado; Escape fechou e devolveu o foco ao acionador. Em About EN, a árvore passou de `15 resumo Sections of About, Value: on` para foco em `14 resumo Sections of About, Value: off`. |
| Espaço vazio entre opções                                    | Clique no intervalo entre About e Research manteve News e todos os submenus fechados, sem foco no controle da seta ou quadrado isolado.                                                                     |
| Janela estreita, PT e EN                                     | Logo e Menu na primeira linha; abertura com Fechar/Close, seis opções e idiomas ao final. Três chevrons e seta externa visualmente alinhados.                                                               |
| Expansão compacta de About                                   | Quatro links imediatamente abaixo da linha, deslocando as opções seguintes. Escape não fechou o painel compacto; esse incremento é restrito ao desktop no contrato vigente.                                 |

A janela larga observada tinha captura de 2940 px físicos de largura; a estreita, 1484 px. As larguras CSS do Safari não foram medidas por DOM; valores físicos não substituem as medidas automatizadas de viewport.

## O que ainda exige conferência manual

1. **Safari, hover isolado:** passar o ponteiro, sem clicar, sobre Sobre, Notícias e Recursos; atravessar até os painéis e sair deles. A API nativa disponível não expõe movimento do ponteiro sem clique. Os cliques nativos foram conferidos; hover isolado está coberto no Chromium automatizado, mas não foi homologado separadamente no Safari.
2. **Safari, percurso por Tab:** verificar sequência completa de foco e entrada/saída dos painéis. Nesta sessão, Tab/Option+Tab não avançaram o foco informado pela árvore de acessibilidade. A causa não foi determinada; nenhuma preferência do navegador ou sistema foi modificada. Enter/Escape desktop passaram nos controles já focados, o que não valida a sequência completa por Tab.
3. **Safari, larguras exatas próximas de 1240/1241 px e artigos sem tradução:** complementar a inspeção nativa. A janela ativa mudou durante a tentativa de ampliar essa matriz, e a tentativa foi descartada como evidência do C4AI. A matriz exata de larguras, artigos e zoom continua aprovada no Chromium.

Não foi identificado defeito de implementação pendente nos casos efetivamente conferidos. A homologação humana acima permanece aberta; esta rodada não declara cobertura de Safari sem JavaScript, Firefox, leitores de tela ou WCAG completa. Para retomar, conferir somente os itens restantes nesta seção, preservando as evidências e fixtures independentes.
