# Validação do banner e canais de Sobre — 15/10/2026

## Resultado final

`npm run quality` terminou com **código 0: 21 testes de configuração e 766 testes de navegador passaram**, sem falhas ou retries. A [saída completa](quality.txt) registra a execução. Os 24 novos casos de navegador correspondem a três cenários por idioma nos quatro projetos Chromium existentes. A execução [direcionada](targeted.txt) também passou nos 40 casos da introdução, canais e preservação institucional.

Prettier, ESLint e Stylelint passaram; permanece o aviso anterior de complexidade 15/10 no teste de conteúdo/metadados de `site.spec.ts`. Astro check analisou 74 arquivos com zero erros, avisos ou hints. O build gerou 38 páginas estáticas. `git diff --check` passou. Nenhuma dependência, regra, exclusão, timeout, limite ou retry foi alterado.

A suíte completa preserva os contratos das outras páginas, links/fragmentos locais, publicação em subdiretório, conteúdo, imagens, metadados, teclado, navegação sem JavaScript e axe. As expectativas legítimas substituídas estão descritas no [registro editorial](editorial.md): somente os H1 de Sobre/About e a hierarquia semântica dos canais. As descrições de metadados acompanham os novos H1 pela regra existente.

## Revisão visual

As 12 capturas foram revisadas em PT/EN, com JavaScript desativado, nas larguras 1440, 1280, 1024, 768, 390 e 320 px. O [manifesto](captures.json) contém data UTC, dimensões, medidas e confirmação de ausência de transbordamento em cada cenário. As medidas foram coletadas nos viewports declarados; para mostrar a transição até a apresentação institucional, a altura da captura foi ampliada quando necessário, preservando a largura. `captureViewport` distingue essa altura da janela medida.

| Largura | Português                                              | Inglês                                                 | Observação                                                                                                   |
| ------- | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| 1440    | [Desktop PT](screenshots/about-intro-pt-desktop.png)   | [Desktop EN](screenshots/about-intro-en-desktop.png)   | Banner com 416 px, título com 48 px, descrição com 20 px e canais compactos lado a lado.                     |
| 1280    | [Notebook PT](screenshots/about-intro-pt-notebook.png) | [Notebook EN](screenshots/about-intro-en-notebook.png) | Mesma composição; o título institucional C4AI começa em aproximadamente y=756 px na janela de 800 px.        |
| 1024    | [Compacto PT](screenshots/about-intro-pt-compact.png)  | [Compacto EN](screenshots/about-intro-en-compact.png)  | Ações sob as descrições; duas colunas de canais, sem compressão ou sobreposição.                             |
| 768     | [Tablet PT](screenshots/about-intro-pt-tablet.png)     | [Tablet EN](screenshots/about-intro-en-tablet.png)     | Duas colunas legíveis; fotografia preservada, apresentação institucional inicia em aproximadamente y=792 px. |
| 390     | [Mobile PT](screenshots/about-intro-pt-mobile.png)     | [Mobile EN](screenshots/about-intro-en-mobile.png)     | Título adaptado, CTA antes dos canais, cartões empilhados e transição para uma coluna institucional.         |
| 320     | [Estreito PT](screenshots/about-intro-pt-narrow.png)   | [Estreito EN](screenshots/about-intro-en-narrow.png)   | Quebras naturais, conteúdo íntegro e ausência de rolagem horizontal.                                         |

No desktop, os cartões medem aproximadamente **116,6 px** de altura, dentro da faixa recomendada. Nas larguras intermediárias medem aproximadamente 172,6 px para acomodar as ações abaixo do texto; no mobile a altura acompanha as quebras de cada idioma. O título, a descrição, o botão, a área dos canais e o conteúdo institucional compartilham a margem esquerda do contêiner. Os títulos dos dois canais permanecem alinhados mesmo quando suas descrições têm comprimentos diferentes.

A fotografia original ocupa o banner com enquadramento responsivo. O gradiente estabelece a área escura de leitura à esquerda e mantém mais visibilidade da foto à direita. A revisão visual não identificou cortes de texto, sobreposição, transbordamento ou problemas de legibilidade. Os testes verificaram os nomes acessíveis, as setas/ícones decorativos, a sequência Tab entre CTA e canais, foco visível e navegação por Enter para a página Pesquisas correspondente.

## Tentativas anteriores e correções

A [primeira tentativa](quality-first-attempt.txt) parou em duas regras de Stylelint: ordem de seletores e abreviação de `gap`. A ordem foi ajustada e as propriedades consolidadas, sem suprimir regras.

A [segunda tentativa](quality-second-attempt.txt) passou nas etapas estáticas e teve 756 testes de navegador aprovados e dez falhas: oito ainda esperavam os dois h2 antigos dos canais; duas detectaram desalinhamento de 11,4 px entre títulos em inglês. O contrato antigo passou a exigir um h2 e dois h3, mantendo a contagem de destinos. O texto dos cartões passou a alinhar pelo topo, preservando a exigência geométrica de alinhamento. A execução direcionada e a suíte completa foram repetidas depois dessas correções e passaram.

Uma execução direcionada inicial não chegou a iniciar o navegador porque havia uma prévia Astro ativa em outra porta. A prévia pertencente a esta tarefa foi encerrada normalmente, sem ignorar locks nem alterar `reuseExistingServer`. A prévia visual final usa um servidor estático separado; os testes continuam iniciando seu próprio servidor pela configuração original.

## Ambiente e limites

A execução ocorreu na pasta de trabalho atual, com Node **24.15.0** e npm **11.12.1** disponíveis. As versões fixadas no projeto são **24.21.0/11.19.0** e não foram executadas. Não houve instalação de dependências nem alteração do lockfile. Os processos de servidor/navegador precisaram da permissão de execução fora do sandbox local; as restrições não exigiram enfraquecer a configuração ou os testes.

A validação cobre Chromium. Firefox, WebKit e zoom real do navegador não foram executados nesta etapa; axe e revisão visual não constituem auditoria integral de acessibilidade. Os testes bloqueiam requisições externas: os destinos YouTube/Flickr foram preservados e verificados como URLs, sem confirmar a disponibilidade dos serviços externos.

A comparação estruturada dos JSON com `HEAD` confirmou que os `blocks` institucionais e `heroImages` PT/EN são idênticos. As alterações ficam na abertura de Sobre/About, nos seus estilos, conteúdo, testes e documentação. Não houve staging, commit, push ou publicação.
