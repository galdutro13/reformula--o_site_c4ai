# Validação e ponto de retomada — cabeçalho global

Data: 14/10/2026. Branch: `fase2_reformulacao`. Trabalho encerrado nesta rodada a pedido do mantenedor, sem commit, push ou publicação.

## Estado entregue

Código PT/EN atualizado: hover de mouse abre submenus desktop; Sobre/Notícias preservam links diretos; setas nativas mantêm operação por teclado/toque e sem JavaScript. Exclusividade, clique fora e Escape com retorno de foco funcionam no desktop. Os separadores texto/seta foram retirados, os intervalos visíveis padronizados e a área vazia entre menus deixou de ser um controle de expansão. O móvel apresenta seis linhas completas, logo no fluxo de Grid, Menu/Fechar e os quatro indicadores na mesma coluna à direita.

A revisão por teclado identificou que o contorno externo das setas compactas desktop invadia o texto adjacente. O contorno passou para dentro do alvo, preservando sua visibilidade; a última rodada completa já contém esse ajuste.

## Resultados reais

`npm run quality` passou na versão final: **21 testes de configuração e 718 testes de navegador**, nos quatro projetos Chromium desktop/mobile com e sem JavaScript. Astro check não apresentou erros, avisos ou hints. O build estático gerou 38 páginas. Permanece apenas o aviso anterior de complexidade 15/10 em `tests/e2e/site.spec.ts`, sem supressão. Log definitivo: [quality-complete.txt](quality-complete.txt).

A execução ocorreu no snapshot isolado `/private/tmp/c4ai-header-interactions-quality-8wd83fb3`, com configuração, limites, exclusões e retries originais e dependências existentes, sem instalação. A comparação SHA-256 de **224 arquivos de implementação/configuração** não encontrou divergências com o workspace: [source-validation.json](source-validation.json). O primeiro servidor foi bloqueado pelo sandbox; após autorização de execução local, as rodadas completas passaram. Logs intermediários preservam os estados anteriores às orientações posteriores e não substituem a validação definitiva.

A expectativa anterior de nenhuma script na Home foi substituída exclusivamente pela autorização humana ao módulo progressivo do cabeçalho. O teste de publicação exige um único módulo local do header, sem scripts próprios de cards/hero, hidratação, rede, storage ou avaliação dinâmica. A mudança localizada de alvo desktop para 24 × 44 px, mantendo 44 × 44 px no compacto, decorre do pedido de retirar o controle do espaço vazio; justificativa e requisitos em [editorial.md](editorial.md) e `docs/quality.md`.

As medidas automatizadas confirmam 8 px entre rótulo e chevron desktop, cinco intervalos visuais de 40 px e ausência de controles nos espaços entre opções. No móvel, os centros dos três chevrons e do indicador externo coincidem com a borda direita da navegação menos 22 px; os seis rótulos compartilham o alinhamento esquerdo. Esses checks cobrem PT/EN, 320/390/800/1239/1240/1241/1280/1440 px, estados abertos/fechados e teclado. Axe, links, imagens, metadados, conteúdo histórico, proteção dos frames e publicação em subdiretório permaneceram ativos.

## Revisão visual e zoom

Foram produzidas e inspecionadas **38 capturas** em Chromium 153.0.8010.12: PT/EN, desktop fechado e três painéis, 1240/1241 px, 390/320 px, artigos sem tradução e zoom real de 200%/400%. Arquivos e medidas: [captures/index.json](captures/index.json). As capturas usam o servidor de desenvolvimento existente, com os mesmos arquivos assinados da validação estática. Nenhum erro de página ou transbordamento foi registrado nesses estados. O cabeçalho fechado mede 100 px no desktop e 80 px no compacto; o aviso de tradução ausente amplia naturalmente o desktop a aproximadamente 145,4 px.

O zoom foi aplicado pela API `tabs.setZoom` em perfil Chromium temporário e confirmado por `getZoom`, viewport CSS 720/360 px e densidade 2/4. Nenhuma extensão foi instalada no navegador do usuário. Referências do método: [Chrome Tabs](https://developer.chrome.com/docs/extensions/reference/api/tabs#method-setZoom) e [Playwright extensions](https://playwright.dev/docs/chrome-extensions), consultadas em 14/10/2026. A navegação ampliada continua acessível pela rolagem normal; o acesso aos idiomas foi verificado após rolar.

As tentativas anteriores de captura de zoom ficaram recortadas pela ferramenta. A captura final usa a superfície completa do navegador; os arquivos anteriores permanecem em `zoom-before-viewport-capture/`. `captures-first-pass/` e `captures-before-focus-adjustment/` preservam as etapas precedentes. Algumas capturas finais de zoom ainda registraram a seta durante a transição de rotação: elas comprovam o enquadramento e o reflow, mas a documentação do estado estabilizado de abertura deve ser refeita na retomada. Os testes funcionais já verificam a rotação final da seta.

## O que falta na retomada

1. Conferir a versão atual no Safari usado pelo mantenedor, principalmente hover, clique direto, foco e alinhamento compacto. Não foram executados Safari/WebKit, Firefox ou leitores de tela; Chromium automatizado e revisão interna não representam homologação humana.
2. Refazer somente as capturas de zoom com as setas em estado estabilizado, sem registrar quadros intermediários da transição. Não há defeito de código conhecido pendente, mas essa evidência visual precisa ser completada.
3. Validar com Node 24.21.0/npm 11.19.0, versões fixadas pelo projeto. As rodadas desta etapa usaram Node 24.15.0/npm 11.12.1; não houve instalação forçada nem troca de dependências.

Não reiniciar a implementação nem substituir as fixtures pela aplicação ao retomar. Primeiro revisar esse estado e as pendências acima. Commit, push e publicação continuam fora do escopo até solicitação explícita.

## Correção do primeiro clique — 14/10/2026

A revisão posterior identificou a regressão de hover seguido de clique: o `summary` fechava o painel que acabara de abrir. O módulo agora registra a abertura por hover somente quando o painel estava fechado. O primeiro clique de mouse confirma essa abertura, o segundo fecha; teclado e fechamentos limpam a marcação. Reentrar em um painel já aberto não renova a confirmação.

O teste novo falhou antes da correção nos quatro cenários com JavaScript (PT/EN nos projetos desktop/mobile, com viewport desktop), na primeira expectativa de painel aberto após clique real. Após a correção, esses quatro cenários passaram. A versão final acrescenta a verificação dos dois cliques nativos também aos projetos sem JavaScript, sem skips ou remoção de verificações anteriores. São cobertos os três acionadores, hover explícito, reabertura, reentrada e Enter/Espaço após hover.

`npm run quality` concluiu com código 0: formatação aprovada, lint sem erros (um aviso preexistente de complexidade em `tests/e2e/site.spec.ts`), Astro com zero diagnósticos, **21 testes de configuração e 726 testes de navegador aprovados**, estes em 2,3 minutos. Saída integral: [quality-first-click.txt](quality-first-click.txt). `git diff --check` também passou. Nenhuma regra, limite, retry ou exclusão foi alterado.

Ambiente desta rodada: Node 24.15.0 e npm 11.12.1, ainda diferentes das versões fixadas pelo projeto. A execução exigiu permissão para servidor/navegador fora do sandbox; o servidor antigo PID 48445 foi encerrado com autorização explícita do mantenedor, liberando a porta IPv4 4321. A configuração original do Playwright foi preservada. Não houve nova revisão visual, execução em Safari/Firefox ou leitor de tela nesta correção. As limitações anteriores continuam registradas. Nenhum commit, push ou publicação foi realizado.
