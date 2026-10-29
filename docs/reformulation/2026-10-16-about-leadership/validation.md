# Validação da liderança de Sobre — 16/10/2026

## Resultado

`npm run quality` terminou com **código 0: 21 testes de configuração e 814 testes de navegador passaram**, sem falhas ou retries. A [saída completa](quality.txt) registra a execução final, repetida após um ajuste de redação na tradução inglesa. A execução [direcionada](targeted.txt), anterior a esse ajuste, passou nos 48 casos selecionados de liderança e suas regressões.

Prettier, ESLint e Stylelint passaram. Permanece somente o aviso preexistente de complexidade 15/10 no teste de conteúdo/metadados de `tests/e2e/site.spec.ts`, agora na linha 38 após a inclusão do novo módulo de testes. Astro check analisou 80 arquivos com zero erros, avisos ou hints; o build gerou as mesmas 38 páginas estáticas. Nenhuma regra, limite, exclusão, timeout ou retry foi alterado.

Os 24 casos novos correspondem a três cenários por idioma nos quatro projetos existentes: conteúdo/semântica, teclado/foco e geometria responsiva. O contrato é manual e independente da aplicação. Exige os seis nomes, cargos, afiliações, resumos, retratos, alternativas textuais e três URLs; a hierarquia h2 → h3 → h4; grupos e ordem de leitura; ausência de links inventados e de scripts próprios; biografias com até 45 palavras. As três ações existentes mantêm foco visível e ordem de Tab/Shift+Tab, sem depender de JavaScript.

A geometria é exercitada em **1440, 1100, 1099, 701, 700, 390 e 320 px**. Os testes conferem a transição de três para duas e uma coluna, alinhamento dos retratos/textos à esquerda, dimensões tipográficas, distâncias internas, igualdade das bordas de cada linha, posição dos links e ausência de transbordamento horizontal. Não há altura fixa dos cartões: cada linha se adapta ao maior conteúdo que contém.

As expectativas anteriores de títulos compostos, introdução, biografias e grade foram substituídas conforme a solicitação, com motivos e fontes no [registro editorial](editorial.md). A suíte mantém os demais contratos de rotas, conteúdo, metadados, assets, fragmentos, acessibilidade automatizada, publicação em subdiretório, cabeçalho, rodapé e navegação sem JavaScript.

## Preservação

O [manifesto de preservação](preservation.json) compara o resultado com o estado anterior à revisão, no commit `46f033d`. Confirma:

- As seis fotos e sua ordem, os três destinos externos, as âncoras PT/EN e os IDs dos dois grupos foram preservados. Os arquivos das fotos mantêm os mesmos hashes.
- Todos os campos de Sobre externos a `blocks` e `revision` permanecem iguais; as seções posteriores à liderança são estruturalmente idênticas em PT/EN.
- Os 12 arquivos de controle mantêm os mesmos hashes: canais, apresentação/localização, seu conteúdo/CSS, cabeçalho, rodapé, navegação, Home PT/EN e testes das duas correções anteriores.
- As outras páginas da fixture editorial permanecem idênticas. Em Sobre, oito textos por idioma foram substituídos por oito expectativas novas: seis biografias, introdução e cargo separado de João. Imagens e links da fixture continuam iguais.
- `package.json` e o lockfile não mudaram; nenhuma dependência foi instalada.

O CSS de Sobre perdeu somente as regras antigas dos títulos e retratos da liderança. O CSS novo é restrito aos cartões. O formato horizontal e o recorte de 65% da fotografia institucional, assim como o separador entre canais e apresentação, permanecem intactos.

## Revisão visual

As oito capturas abaixo usam Chromium com JavaScript desativado. O [manifesto visual](visual-measurements.json) registra horários UTC, medidas e ausência de transbordamento. As medidas usam uma janela de 900 px de altura; somente a altura da janela de captura foi ampliada para mostrar a seção inteira, registrada separadamente em `captureViewport`. Os retratos foram aguardados antes das capturas finais.

| Largura | Português                                           | Inglês                                              | Composição                                                                               |
| ------- | --------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1440 px | [Desktop PT](screenshots/leadership-pt-desktop.png) | [Desktop EN](screenshots/leadership-en-desktop.png) | Três cartões por linha; retratos, nomes e links alinhados.                               |
| 900 px  | [Tablet PT](screenshots/leadership-pt-tablet.png)   | [Tablet EN](screenshots/leadership-en-tablet.png)   | Duas colunas por grupo; terceiro perfil segue na linha seguinte, preservando a ordem.    |
| 390 px  | [Mobile PT](screenshots/leadership-pt-mobile.png)   | [Mobile EN](screenshots/leadership-en-mobile.png)   | Uma coluna, com leitura completa e fotografias de tamanho constante.                     |
| 320 px  | [Estreito PT](screenshots/leadership-pt-narrow.png) | [Estreito EN](screenshots/leadership-en-narrow.png) | Subtítulos e afiliações longas quebram naturalmente; nenhum corte ou rolagem horizontal. |

Os retratos medem **128 × 128 px** em todas as capturas. Em 1440 px, os cartões medem aproximadamente 389,3 px de largura; as alturas das duas linhas são 461,9 e 393,5 px em PT, e 461,9 e 417,9 px em EN. As três alturas de cada linha são iguais, adaptadas ao texto do respectivo idioma. O padding é de 24 px, a distância entre cartões é de 24 px e o intervalo entre grupos é de 44 px. A superfície clara, a borda discreta e as cores existentes preservam a identidade do restante da página.

A revisão de código e das capturas, incluindo uma leitura independente, não encontrou cortes, sobreposições ou desalinhamentos relevantes. Os cartões da segunda linha não reservam espaço para links inexistentes. A separação entre nome, cargo, afiliação e biografia permite reconhecer os perfis sem fundir suas funções ao título.

## Ambiente e limites

A execução usou Node **24.15.0** e npm **11.12.1**. As versões fixadas **24.21.0/11.19.0** não foram executadas. A prévia visual serviu o build estático em uma porta separada; a suíte iniciou seu próprio servidor sem reutilização ou alteração de locks.

Os quatro projetos usam Chromium, com/sem JavaScript em desktop/mobile. Firefox, WebKit, Safari nativo, leitores de tela e zoom real do navegador não foram executados nesta etapa. Axe, teclado, geometria e revisão visual não equivalem a uma auditoria integral de acessibilidade. Os testes preservam e verificam as URLs externas, mas não certificam a disponibilidade atual dos serviços de terceiros. A checagem editorial e os limites de atualidade das fontes são descritos separadamente em [editorial.md](editorial.md).

As alterações permanecem locais, sem staging, commit, push ou publicação nesta etapa.
