# Validação do hero da Home — 14/10/2026

## Resultado

`npm run quality` terminou com código 0: **21 testes de configuração e 662 testes de navegador passaram**, sem falhas ou retries. A [saída completa](quality.txt) registra a execução. Os 24 novos testes de navegador cobrem três cenários por idioma nos quatro projetos Chromium; os requisitos anteriores dos cards de pesquisa e das demais páginas continuam ativos.

Prettier, ESLint e Stylelint passaram, mantendo somente o aviso anterior de complexidade 15/10 em `tests/e2e/site.spec.ts`, agora na linha 33 após a importação do novo helper. Astro check analisou 68 arquivos com zero erros, avisos ou hints. O build estático gerou 38 páginas. Os testes mantiveram teclado, acessibilidade, links, imagens, metadados, conteúdo histórico, comportamento progressivo, navegação sem JavaScript e publicação em subdiretório. Não foram alterados limites, exclusões, timeouts ou retries.

## Ambiente e isolamento

A validação ocorreu em uma cópia de trabalho em `/private/tmp/c4ai-home-hero-quality-1ytPE0`, preservando a configuração original e reutilizando o `node_modules` existente por link, sem instalar dependências. O [manifesto da cópia](validation-snapshot.json) registra data, branch e hashes dos arquivos, com confirmação de que a origem não mudou durante a cópia. Os diretórios de build e resultados ficaram isolados das validações dos outros trabalhos. Não houve falha nesta execução.

Após a execução, 217 arquivos de código, testes, scripts, configuração e assets foram comparados com a pasta compartilhada: nenhuma divergência. A prévia local usada para as capturas serve o build dessa cópia validada.

O ambiente foi Node **24.15.0** e npm **11.12.1**, diferente das versões fixadas **24.21.0/11.19.0**. Não houve execução com as versões fixadas. A verificação usou Chromium; Firefox e WebKit não foram executados. Os testes de axe e teclado não equivalem a uma auditoria integral de acessibilidade.

## Revisão visual e medidas

As dez capturas foram produzidas com JavaScript desativado e revisadas individualmente. Elas incluem o hero e os cards seguintes, permitindo avaliar a transição. O [manifesto de capturas](captures.json) registra horários, medidas, viewports, estados do botão e ausência de transbordamento.

| Janela  | Português                                                           | Inglês                                                              | Resultado observado                                                                                                                                            |
| ------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1440 px | [Desktop PT](screenshots/home-hero-pt-desktop.png)                  | [Desktop EN](screenshots/home-hero-en-desktop.png)                  | Duas colunas, bloco textual centralizado com a imagem e alinhamento à esquerda dos cards. O título PT ocupa três linhas; o EN ocupa duas, sem quebras manuais. |
| 1024 px | [Desktop compacto PT](screenshots/home-hero-pt-compact-desktop.png) | [Desktop compacto EN](screenshots/home-hero-en-compact-desktop.png) | Duas colunas sem sobreposição; títulos com três linhas e ilustração proporcional. Os cards mantêm seu empilhamento anterior nesta largura.                     |
| 800 px  | [Tablet PT](screenshots/home-hero-pt-tablet.png)                    | [Tablet EN](screenshots/home-hero-en-tablet.png)                    | Hero empilhado: título, botão e ilustração. Imagem limitada a 288 px de altura.                                                                                |
| 390 px  | [Mobile PT](screenshots/home-hero-pt-mobile.png)                    | [Mobile EN](screenshots/home-hero-en-mobile.png)                    | Título legível, botão antes da imagem, arte proporcional e transição compacta para pesquisas.                                                                  |
| 320 px  | [320 px PT](screenshots/home-hero-pt-narrow.png)                    | [320 px EN](screenshots/home-hero-en-narrow.png)                    | Quebras naturais em cinco linhas no título, imagem sem cortes e ausência de rolagem horizontal.                                                                |

O intervalo entre título e botão foi **28 px** em todas as capturas. A ação tem altura de **48 px**. No desktop, o título usa 40 px com entrelinha de 48 px; o hero tem padding vertical de 48 px e altura determinada pelo conteúdo. A imagem mede aproximadamente 374,7 px de altura em 1440 e 301,8 px em 1024, abaixo do máximo de 400 px, preservando a proporção natural 856/580. No empilhamento, suas alturas foram 288 px em 800, 242,6 px em 390 e 195,1 px em 320.

A distância entre o fim da ilustração e o título de pesquisas foi **48 px no desktop e 32 px no empilhamento**. O título da seção seguinte permanece centralizado, e seus cards mantêm a estrutura, tipografia, conteúdo e destinos anteriores.

Os testes verificaram foco visível e navegação por Enter para Sobre/About em ambos os idiomas e modos de JavaScript. A conferência adicional do botão com mouse em PT/EN registrou estados distintos: branco em repouso, fundo claro no hover e fundo mais marcado com borda alterada enquanto pressionado. A seta permanece decorativa no nome acessível. A imagem preserva `alt=""`, carregamento prioritário e dimensões intrínsecas.

## Preservação de escopo

A comparação com os hashes coletados antes desta etapa mostrou alterações apenas em `InstitutionalPage.astro`, `global.css` e `institutional.css`, além do novo CSS dedicado `home-hero.css`. Os JSON institucionais, o PNG da ilustração, os logos e todos os componentes, conteúdos e estilos dos cards de pesquisa permaneceram iguais. As regras antigas exclusivas do hero foram transferidas para o CSS dedicado, sem alterar os heros das demais páginas.

A chamada PT mudou de “Saiba mais” para “Conheça o C4AI”, e a EN de “About us” para “Discover C4AI”. A única expectativa antiga substituída foi o nome PT do link no teste de salto ao conteúdo e recuperação da 404; todo o fluxo continua exigido. O [registro de expectativas](test-expectations.json) diferencia essa substituição das novas verificações independentes.

As alterações anteriores dos cards, logos e documentação foram preservadas. O trabalho permanece na branch `fase2_reformulacao`; este agente não fez staging, commit, push ou publicação.
