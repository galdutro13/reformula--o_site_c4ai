# Validação do cabeçalho compartilhado — 14/10/2026

## Resultado final

`npm run quality` terminou com código 0: **21 testes de configuração e 694 testes de navegador passaram**, sem falhas ou retries. A [saída final](quality.txt) registra a execução. Os 32 novos casos de navegador cobrem quatro cenários por idioma nos quatro projetos Chromium; as verificações anteriores continuam ativas.

Prettier, ESLint e Stylelint passaram. Permanece o aviso anterior de complexidade 15/10 em `tests/e2e/site.spec.ts`; nenhuma regra ou limite foi alterado. Astro check analisou 69 arquivos com zero erros, avisos ou hints. O build estático gerou 38 páginas. A suíte manteve axe, teclado, links, imagens, metadados, histórico, comportamento progressivo, JavaScript desativado e publicação em subdiretório.

## Execuções e ajustes

1. A [primeira execução](quality-first-run.txt) parou no Stylelint, que identificou quatro erros de ordenação de seletores. As regras foram reorganizadas, sem supressões ou alteração de limites. Os testes de configuração e navegador não chegaram a executar nessa rodada.
2. A [segunda execução](quality-second-run.txt) passou com 21 testes de configuração e 694 de navegador. A revisão visual seguinte identificou falta de separação entre os nomes dos recursos e a indicação “site externo”. Foi acrescentado espaçamento entre os elementos do link e permitido seu empilhamento quando necessário.
3. A [terceira execução](quality-third-run.txt) parou na formatação do JSON das primeiras capturas, ainda sem atingir os testes. O arquivo foi formatado e a verificação de formatação da árvore atual passou.
4. A execução final, após esses ajustes, passou integralmente. As primeiras capturas permanecem em [visual-first-pass](visual-first-pass/captures.json); as capturas definitivas registram o espaçamento corrigido e os indicadores em seu estado final, com animações desativadas somente durante a captura.

O [build preliminar](preflight-build.txt) serviu para medir a composição antes do gate completo. Seus resultados não substituem a execução final de qualidade.

## Ambiente e isolamento

A execução final usou a cópia em `/private/tmp/c4ai-header-quality-W9Nmbo`, com configuração original e `node_modules` existente reutilizado por link, sem instalação. O [manifesto da cópia](validation-snapshot.json) registra data, branch e hashes, confirmando que a origem não mudou durante a cópia. A separação de build e resultados evitou interferência com outros trabalhos. A prévia local e as capturas definitivas usam o build dessa cópia validada.

O ambiente foi Node **24.15.0** e npm **11.12.1**, diferente das versões fixadas **24.21.0/11.19.0**. Não foi executada uma rodada com as versões fixadas. Os testes e a revisão visual usaram Chromium; Firefox, WebKit e leitores de tela não foram testados. A verificação automatizada de acessibilidade não equivale a uma auditoria integral WCAG.

Ao concluir, 218 arquivos de código, testes, scripts, configuração e assets foram comparados com a cópia validada, sem divergências. A formatação da árvore atual e `git diff --check` também passaram após acrescentar as capturas e este registro.

## Medições e revisão visual

A [medição da Home](layout-measurement.json) confirmou **100 px no desktop e 80 px no menu compacto fechado**, logo de 181 × 72 px no desktop e 160 px de largura proporcional no compacto. Não houve transbordamento em 1440, 1280, 1241, 1240, 1024, 390 e 320 px. Os testes também cobriram 800 px, os controles expandidos e áreas de interação mínimas de 44 × 44 px.

A [medição dos 37 arquivos index.html](global-measurement.json), a 1241 px, encontrou largura máxima requerida de **1131,3 px**, para 1193 px disponíveis, mantendo **61,7 px de reserva**. Essa demanda veio de artigos sem tradução. O breakpoint de 1240 px conserva espaço para essas informações e para os dois idiomas. A 404 também foi coberta pela suíte, incluindo a ausência de item principal indevidamente ativo.

As 30 primeiras capturas foram revisadas individualmente. Depois da correção visual, foram produzidas 30 capturas definitivas; os quadros dos menus expandidos em 390/320 px e dos submenus desktop foram novamente inspecionados em PT/EN. O [manifesto definitivo](captures.json) registra estados, horários, dimensões e ausência de transbordamento. Os demais enquadramentos mantiveram a composição verificada na primeira revisão.

| Cenário                                        | PT                                                                                                                                                            | EN                                                                                                                                                       |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home e alinhamento com hero/cards, 1440 px     | [Desktop PT](screenshots/header-pt-home-desktop.png)                                                                                                          | [Desktop EN](screenshots/header-en-home-desktop.png)                                                                                                     |
| Limite desktop, 1241 px                        | [1241 PT](screenshots/header-pt-boundary-desktop.png)                                                                                                         | [1241 EN](screenshots/header-en-boundary-desktop.png)                                                                                                    |
| Limite compacto, 1240 px                       | [1240 PT](screenshots/header-pt-boundary-mobile.png)                                                                                                          | [1240 EN](screenshots/header-en-boundary-mobile.png)                                                                                                     |
| Menu fechado, 390/320 px                       | [390 PT](screenshots/header-pt-home-mobile.png), [320 PT](screenshots/header-pt-home-narrow.png)                                                              | [390 EN](screenshots/header-en-home-mobile.png), [320 EN](screenshots/header-en-home-narrow.png)                                                         |
| Todos os submenus abertos, 390/320 px          | [390 PT](screenshots/header-pt-mobile-expanded.png), [320 PT](screenshots/header-pt-narrow-expanded.png)                                                      | [390 EN](screenshots/header-en-mobile-expanded.png), [320 EN](screenshots/header-en-narrow-expanded.png)                                                 |
| Submenu Sobre/About no desktop                 | [PT](screenshots/header-pt-desktop-submenu.png)                                                                                                               | [EN](screenshots/header-en-desktop-submenu.png)                                                                                                          |
| Indicação atual em Sobre, Pesquisas e Notícias | [Sobre](screenshots/header-pt-about-desktop.png), [Pesquisas](screenshots/header-pt-research-desktop.png), [Notícias](screenshots/header-pt-news-desktop.png) | [About](screenshots/header-en-about-desktop.png), [Research](screenshots/header-en-research-desktop.png), [News](screenshots/header-en-news-desktop.png) |
| Artigo sem tradução, desktop/menu móvel        | [Desktop PT](screenshots/header-pt-missing-desktop.png), [Mobile PT](screenshots/header-pt-missing-mobile.png)                                                | [Desktop EN](screenshots/header-en-missing-desktop.png), [Mobile EN](screenshots/header-en-missing-mobile.png)                                           |

Nos artigos sem tradução, o cabeçalho cresce naturalmente até aproximadamente 145,4 px no desktop, preservando o aviso completo e seu acesso alternativo. Com os três submenus móveis abertos simultaneamente, o cabeçalho ocupa 1016 px e a página rola normalmente; nenhum conteúdo é truncado ou sobreposto. Com submenus fechados, o painel apresenta primeiro a navegação e depois os idiomas, mantendo a ordem de leitura.

Os testes confirmaram abertura e fechamento por Enter/Espaço, foco visível, hover, troca de idioma, retorno, link do logo e ativação de destinos nativos com e sem JavaScript. A indicação atual usa `page` nas páginas exatas e `location` no contexto de notícias de artigos/paginação; raiz e 404 não recebem item principal ativo. Não foram adicionados scripts para manter esses estados.

## Preservação de escopo

A comparação com os hashes anteriores a esta etapa mostrou mudanças somente em `Header.astro`, `Navigation.astro`, `navigation.ts`, `BaseLayout.astro` e `navigation.css`. O logo e todos os demais assets, JSON institucionais, hero, cards de pesquisa, conteúdo de artigos, rotas e rodapé permaneceram iguais. O reset compartilhado das listas do rodapé conserva seus valores anteriores.

As adaptações de testes apenas abrem o menu compacto quando necessário e selecionam a variante visível de navegação/idioma. Os nomes, destinos, avisos de tradução, sequência de teclado, âncoras e demais assertivas foram preservados. O [registro de expectativas](test-expectations.json) discrimina cada adaptação, a mudança PT “Home” → “Início” e os novos requisitos manuais.

A implementação permanece na branch `fase2_reformulacao`, sem novas dependências, páginas ou JavaScript cliente. Este agente não fez staging, commit, push ou publicação.
