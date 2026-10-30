# Política de qualidade

## Verificação obrigatória

Execute `npm run quality` após `npm ci` e instalação do Chromium. Local e CI usam o mesmo comando. A primeira falha interrompe a cadeia e retorna código diferente de zero. Não existem opções de correção automática nesse comando. Saídas geradas e caches podem mudar; arquivos-fonte não.

| Etapa                  | Responsabilidade                                                                                         |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| Prettier               | Formatação de Astro, JS/TS, CSS, JSON, Markdown e YAML, incluindo arquivos de configuração               |
| ESLint                 | Regras recomendadas de JS, TypeScript e Astro; frontmatter, componentes, scripts, configurações e testes |
| Stylelint              | Regras padrão para todo `src/**/*.css`; nenhuma ferramenta adicional de formatação dentro do ESLint      |
| Astro check            | Tipagem estrita e diagnósticos Astro; `checkJs` inclui scripts e configurações JS                        |
| Testes de configuração | Rejeições de origem/base, comportamento do comando de build e HTML real de produção em subdiretório      |
| Build local            | Compilação estática e validação de esquemas e pares bilíngues                                            |
| Playwright             | HTML compilado, navegação, conteúdo, teclado, links, metadados, responsividade e axe                     |

Arquivos gerados, dependências e relatórios são ignorados pelos linters. O lockfile é gerado pelo npm, não formatado por Prettier. CSS fica exclusivamente em arquivos `.css`; adicionar estilos embutidos exige ampliar a configuração do Stylelint e demonstrar que ela os analisa. Prettier não executa lint, e ESLint não executa Prettier. Stylelint preserva suas regras complementares de separação de blocos.

## Critérios e limitações

- Chromium, quatro projetos: desktop 1440×900 e mobile 390×844, ambos com e sem JavaScript. Transbordamento também é testado em 320×800; isso não equivale a testar todos os dispositivos nem outros motores de navegador.
- Axe analisa as regras marcadas `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` e `wcag22aa`, exigindo zero violações nos dois tamanhos com JavaScript habilitado. Sua instrumentação requer JavaScript: a execução em contexto desabilitado foi verificada e não conclui, inclusive no modo legado. Por isso `accessibility.spec.ts` roda nos projetos desktop/mobile; todos os testes de `site.spec.ts`, incluindo teclado, conteúdo, navegação, links e metadados, rodam também sem JavaScript. Não é uma declaração de conformidade integral WCAG; resultados incompletos e aspectos editoriais exigem avaliação humana.
- Testes funcionais usam papéis e nomes acessíveis e uma lista obrigatória independente dos arquivos da aplicação. O percurso adicional de HTML compilados amplia a busca por links quebrados, sem substituir a lista obrigatória.
- Links externos não são consultados; requisições externas do navegador são bloqueadas. O teste com `https://usp.br` usa essa origem apenas para inspecionar strings de HTML em pasta temporária e não confirma o domínio de publicação do C4AI.
- A CI guarda relatório HTML, screenshot e trace das falhas por 14 dias, mesmo se os testes falharem. Não há retries para mascarar instabilidade. A revisão visual é manual, sem comparação automática de imagens.
- O preview local serve o arquivo existente `/404.html` com 200; o teste de URL inexistente exige status 404 e o conteúdo da página de erro. Status HTTP, cache e tratamento de URLs na infraestrutura USP precisam ser verificados após a configuração real do servidor.

## Alertas e exceções

Complexidade ciclomática de funções JavaScript/TypeScript acima de **10** gera `warning`. O limite é provisório e orienta revisão de responsabilidades e legibilidade; não impede aprovação sozinho. Não use `--max-warnings=0` para transformar esse aviso em uma barreira indireta. Não há limite geral de linhas para `.astro`, cobertura global mínima ou pontuação agregada.

Não desative testes, diminua expectativas nem amplie exclusões apenas para tornar a execução verde. Toda alteração em regras, fixtures, configurações de CI ou instruções de agentes deve ser relatada e justificada no PR. Quando uma exceção for necessária por motivo técnico, registre aqui ou em documento vinculado: requisito afetado, justificativa, risco, compensação, responsável e data ou condição de revisão. Não há regra ou exclusão excepcional ativa.

Uma mudança legítima de requisito pode mudar o teste, mas precisa preservar evidência independente do comportamento novo. A remoção de página obrigatória não pode remover seu teste silenciosamente.

## Comprovação inicial de detecção

A entrega deve executar falhas isoladas e reversíveis: remover um campo obrigatório do conteúdo estruturado, quebrar um link e remover a página inglesa. Registrar comandos, falha observada e restauração em `docs/validation.md`. Executar a verificação completa novamente após restaurar, sem deixar falhas deliberadas nos arquivos.

## CI e proteção de branch

O job `quality` executa em Ubuntu 24.04, com Node de `.nvmrc`, `npm ci`, instalação do Chromium com dependências Linux e `npm run quality`. Não recebe segredos de publicação e tem somente permissão de leitura do repositório.

O Playwright controla o preview pela CLI, sem usar a API programática experimental. `ASTRO_PREVIEW_BACKGROUND=1` no ambiente do servidor suprime a autodetecção de agentes do Astro 7.3.2 e mantém o processo servidor controlado pelo Playwright, como o subprocesso da própria CLI. Essa integração depende da versão fixada e deve ser revisitada ao atualizar Astro. Não reutilizamos servidores existentes nem ignoramos locks.

Após criar um remoto, configure uma regra para `main`: exigir PR, exigir o check `quality`, bloquear force push e exclusão da branch. O mantenedor único não precisa de segundo revisor obrigatório; a revisão dos resultados e do diff continua necessária. A regra de proteção não pode ser aplicada antes de existir o remoto. Verifique o nome do check apresentado pelo primeiro workflow.

## Cards de governança — 13/10/2026

As expectativas de OBIA/HarpIA passam a exigir cards com síntese, frentes descritivas e liderança separada, subordinados a Macro/Micro. Foram acrescentados 32 casos de navegador e quatro contratos do modelo, sem reduzir as verificações de línguas, SVGs do Figma, conteúdo detalhado, teclado, acessibilidade, links ou publicação em subdiretório. Sobre a plataforma é acrescentado aos painéis de HarpIA; Módulos continua ausente.

O mantenedor autorizou a consolidação dos dois painéis Resources idênticos de OBIA EN, preservando ambos os IDs em conteúdo real. As mudanças legítimas dos títulos, rótulos, chamada e quantidade de painéis estão discriminadas em [test-expectations.json](reformulation/2026-10-13-governance-cards/test-expectations.json). As descrições completas permanecem obrigatórias na fixture independente e visíveis nos painéis abertos. Nenhuma regra, limite, retry ou exclusão foi relaxado. Resultados e limitações desta etapa pertencem ao [registro de validação](reformulation/2026-10-13-governance-cards/validation.md).

## Evoluções possíveis

Lighthouse CI, testes de mutação, comparação automatizada de screenshots e regras de fronteiras arquiteturais só devem ser adicionados quando houver requisito, manutenção e uso concretos. Também poderão ser ampliados navegadores, testes de tecnologias assistivas e revisão editorial de acessibilidade. Nenhuma dessas ferramentas é instalada antecipadamente.

Fontes: [Playwright e acessibilidade](https://playwright.dev/docs/accessibility-testing), [servidor local para testes](https://playwright.dev/docs/test-webserver), [regras de complexidade ESLint](https://eslint.org/docs/latest/rules/complexity).

## Ampliação do contrato na migração de 19/09/2026

Os testes da demonstração foram substituídos por oito páginas institucionais, 26 artigos, duas paginações, raiz e 404. `article-requirements.json`, `editorial-requirements.json` e `news-order.json` são fixtures independentes, congeladas das fontes e revisadas com o escopo; não as regenere a partir da aplicação para corrigir falhas. O contrato inclui 787 trechos, autoria, datas, descrições e ordem observada. O percurso de links examina todos os HTML e deduplica destinos para evitar requisições repetidas; também verifica IDs únicos, arquivos e imagens não vazias.

Axe passa a cobrir as 38 páginas e estados de painéis/submenus expandidos. Testes progressivos validam busca e criação de iframe por ação explícita, bloqueando a rede externa. O teste de publicação passa a inspecionar os caminhos locais de todos os HTML e CSS com BASE_PATH. Regras, limites, tags WCAG, retries e exclusões permanecem iguais. O teste de Home sem scripts continua válido; páginas com busca/frames têm JavaScript progressivo autorizado.

Alerta de complexidade revisado: o cenário de metadados e conteúdo em `site.spec.ts` reúne casos de raiz, 404, páginas pareadas e artigos sem tradução, acima do limite provisório 10. As ramificações representam requisitos explícitos, não código de produção; mantido como aviso, com revisão pelo mantenedor quando novos tipos de página forem incluídos. Não há supressão nem limite elevado. A renderização foi dividida em conteúdo e mídia com dimensões verificadas.

As falhas induzidas, resultados e limitações da migração estão em [validation.md](migration/validation.md); a [validação inicial](validation.md) permanece como histórico da base.

## Regressões P2 de busca e vídeo — 22/09/2026

A cobertura progressiva foi ampliada para detectar frases interrompidas por marcação inline, entidades HTML, caixa, acentos, espaços repetidos/não separáveis, limpeza da consulta e falsos resultados provenientes da estrutura JSON. Uma fixture de transporte isolada verifica separação entre parágrafos, quebras e itens de lista, continuidade de palavras com ênfase, URLs textuais e ausência de carregamento de imagens ao interpretar o índice. Essa fixture não altera as coleções nem substitui o contrato editorial independente. Um teste de extração recursiva cobre grupos, painéis, cabeçalhos, imagens, rótulos e referências a desafios.

Os testes de Sobre PT/EN inspecionam o `Referer` da requisição do workshop após o clique, inclusive partindo de página com consulta e fragmento: o YouTube recebe somente a origem. Mapa e agenda mantêm `no-referrer`. A rede externa continua bloqueada; essa verificação detecta a incompatibilidade da requisição, sem afirmar disponibilidade ou reprodução integral no provedor. Não houve redução de expectativas, alteração de fixtures editoriais, regras, limites ou exclusões. Os resultados estão no [registro de validação](migration/validation.md#correções-p2--22092026).

## Contrato da primeira reformulação — 22/09/2026

As expectativas de Home e da apresentação/índice de Pesquisas foram substituídas pelo escopo editorial autorizado. O registro [changed-expectations.json](reformulation/changed-expectations.json) discrimina os textos retirados e a justificativa; os 757 trechos restantes, incluindo as descrições dos oito grupos, continuam obrigatórios. Foram acrescentados testes independentes de exatamente duas linhas, associações, ordem do histórico, avisos e navegação dos cartões nos quatro projetos com/sem JavaScript. Metadados passaram a exigir as novas descrições. Nenhuma regra, limite ou exclusão foi relaxada; o aviso existente de complexidade permanece sem supressão. Evidências e limitações em [reformulação](reformulation.md).

Em 23/09/2026, por solicitação do mantenedor, as expectativas de presença dos avisos de revisão em Pesquisas foram substituídas por verificações de ausência. Trata-se de alteração do requisito editorial; os testes de conteúdo, agrupamento e navegação permanecem. Ver [reformulação](reformulation.md).

## Contrato da atualização editorial — 06/10/2026

A reunião de 29/09, o email de 30/09 e as resoluções expressas do mantenedor autorizam a substituição das expectativas de Home, Sobre, organização de Pesquisas, navegação e rodapé. O [registro editorial](reformulation/2026-10-06/editorial.md) delimita o escopo; [changed-expectations.json](reformulation/2026-10-06/changed-expectations.json) registra textos e expectativas substituídos. A lista de páginas e os requisitos continuam independentes da aplicação. Fixtures não devem ser regeneradas a partir do conteúdo implementado para obter aprovação.

O contrato exige dois eixos, subdivisões Macro/Micro e suas associações fixas; KEML preservado no histórico; HarpIA com síntese e fonte próprias; liderança selecionada e duas fotografias preservadas; workshop identificado como 2022; contato e assinatura CIAAM/USP conforme o escopo aprovado. Verificações de ausência são restritas aos locais autorizados: referências históricas em grupos, notícias e artigos permanecem exigidas. A substituição dos logos vale para o rodapé compartilhado, inclusive nos artigos.

A aceitação de `blocks: []` somente para Home acompanha seu conteúdo principal renderizado por componentes próprios. Essa mudança de esquema deve ter um caso positivo para Home e casos negativos para as outras páginas, grupos, painéis e campos obrigatórios. Não se trata de uma dispensa geral de conteúdo nem de exceção ao controle de qualidade.

Permanecem os quatro projetos Chromium com/sem JavaScript, axe, teclado, links e fragmentos, imagens, metadados, largura de 320 px, publicação em subdiretório, ativação explícita dos conteúdos externos e proteção de `Referer` do workshop. Não se alteram regras, limites, exclusões ou retries para acomodar esta revisão editorial. O aviso de complexidade já documentado continua sujeito à mesma política.

Executar `npm run quality` após a integração, além da revisão visual de Home, Sobre e Pesquisas em PT/EN nos tamanhos desktop/mobile. Registrar versões reais do ambiente, saídas, capturas, falhas e limitações em [validation.md](reformulation/2026-10-06/validation.md). Resultados de setembro e o estado anterior mencionado no plano não validam a implementação de outubro.

## Contrato do índice de Pesquisas — 13/10/2026

A correção solicitada pelo mantenedor substitui legitimamente o nome acessível “Nesta página” / “On this page” por “Explore nossas pesquisas” / “Explore our research”. O acesso ao histórico usa a chamada descritiva “Consultar trabalhos anteriores” / “Browse previous research”. As expectativas anteriores desses dois rótulos são atualizadas; os testes de preservação de conteúdo, agrupamento e ordem dos registros permanecem. A justificativa e os textos estão no [registro de reformulação](reformulation.md#redesign-do-índice-de-pesquisas--13102026).

O novo contrato manual de `tests/e2e/requirements.ts` verifica dois grupos principais equivalentes, títulos e descrições, histórico abaixo dos grupos, quatro destinos nativos e listas semanticamente estruturadas. A suíte acrescenta checks de duas colunas no desktop, empilhamento no mobile e a 320 px, sequência de Tab, foco visível e ativação dos quatro links por Enter. Esses cenários são importados por `site.spec.ts` para executar em desktop/mobile com e sem JavaScript. A varredura de links, axe, metadados, conteúdo histórico, requisitos das demais páginas e publicação em subdiretório continuam ativos, sem novas exclusões ou redução de limites.

A execução integral de `npm run quality` e a revisão visual desta mudança devem ser registradas após integrar componente, CSS e testes em [validation.md](reformulation/2026-10-13/validation.md); os resultados de 06/10 são evidência da entrega anterior.

## Contrato da complementação HarpIA — 13/10/2026

O pedido de complementar o registro com as informações do site oficial substitui o requisito editorial anterior de um único link e nenhum painel. O link principal continua obrigatório; os testes passam a exigir dois painéis nativos em ordem (Equipe, Recursos), documentação, créditos e contato oficiais, nomes e funções da equipe e ausência do painel Módulos. Não se acrescentam emails herdados, iframe ou formulário embutido.

As novas expectativas textuais são manuais, baseadas nas fontes e na síntese editorial registrada. O teste PT/EN importado por `site.spec.ts` abre e fecha os dois painéis com Enter, exige foco visível e verifica o conteúdo nos quatro projetos com/sem JavaScript. Demais verificações, regras, limites, exclusões e retries permanecem. Resultados e limites em [validation.md](reformulation/2026-10-13-harpia/validation.md).

Na revisão desta mesma entrega, o mantenedor solicitou retirar a seção Módulos. Foram removidas suas expectativas de presença e acrescentada a exigência de ausência de `#harpia-modules`, mantendo os testes da equipe, dos recursos, do contato e da interação dos painéis. Essa mudança acompanha a decisão editorial, sem redução de regras gerais.

## Contrato dos cards de NLP2 e ProIndL — 13/10/2026

O pedido de redesign altera a apresentação inicial desses dois projetos: os títulos deixam de concatenar a liderança e passam a destacar o nome completo; as siglas são identificadores visuais subordinados. Os resumos, as três frentes de pesquisa e a liderança separada seguem a síntese fornecida pelo mantenedor. “Recursos” / “Resources” passa a “Recursos e publicações” / “Resources and publications”, preservando os links do painel. As expectativas desses rótulos e dos títulos concatenados são substituídas por um contrato manual da nova hierarquia, sem regenerar fixtures a partir das coleções.

Os textos longos originais são preservados no painel nativo “Conhecer o projeto” / “Explore the project” de cada card. A única correção adicional, autorizada expressamente pelo mantenedor durante a tarefa, remove da primeira pergunta de ProIndL EN o fragmento estranho sobre textos sintaticamente anotados. Sua expectativa é substituída manualmente pela pergunta equivalente ao português, exigindo também a ausência do fragmento em ProIndL; não se reescrevem as outras descrições detalhadas. A cobertura passa a distinguir o conteúdo detalhado do resumo inicialmente visível, verificando sua presença após abrir o controle. Os painéis Equipe e Recursos e publicações mantêm os IDs e destinos existentes; a ação de contato continua usando o email de cada projeto. A interação abre e fecha os três controles por teclado, com foco visível, em PT/EN nos quatro projetos Chromium com/sem JavaScript. Os ícones e as ilustrações são decorativos e não acrescentam nomes acessíveis aos controles.

Verificar duas colunas a 1440 px e uma a 800, 390 e 320 px, conforme a largura mínima intrínseca de 30 rem por card e gap de 2 rem. A decisão usa a largura disponível dos componentes, sem breakpoint exclusivo para dispositivo. A revisão manual deve conferir títulos, espaçamento, alinhamento dos blocos, contraste, conteúdo expandido e contato nos dois idiomas. Axe continua usando as tags WCAG existentes; seu resultado não equivale a certificação integral de conformidade.

Os testes de conteúdo detalhado, origem dos registros, equipes, links, contatos, âncoras e demais pesquisas continuam obrigatórios. Também permanecem navegação do índice, histórico, metadados, scripts progressivos existentes, assets e publicação em subdiretório. Não se alteram regras, limites, exclusões ou retries, nem se acrescentam dependências. A justificativa editorial está em [editorial.md](reformulation/2026-10-13-languages/editorial.md); registrar `npm run quality` e revisão visual efetivamente realizados em [validation.md](reformulation/2026-10-13-languages/validation.md).

## Contrato das ilustrações fornecidas no Figma — 13/10/2026

A solicitação do mantenedor troca exclusivamente as duas ilustrações grandes dos cards de NLP2 e ProIndL pelos componentes de seu arquivo Figma. O [registro editorial](reformulation/2026-10-13-figma-icons/editorial.md) fixa a associação entre projeto, nó exportado e asset local, com dimensões intrínsecas de 240 × 240 e hashes para verificar integridade. As expectativas são acrescentadas manualmente ao contrato independente; não são obtidas dos componentes implementados nem substituem requisitos anteriores dos cards.

Verificar arquivos locais não vazios, associação correta em PT/EN, dimensões e proporções preservadas, caráter decorativo, funcionamento com/sem JavaScript e URLs em subdiretório. A revisão visual deve conferir as duas ilustrações em seus cabeçalhos, os fundos e o espaçamento dos cards nos tamanhos existentes. Os SVGs exportados não devem ser redesenhados ou alterados para acomodar o layout. A apresentação responsiva dos cards e os controles nativos continuam sujeitos aos testes anteriores.

Executar `npm run quality` após a substituição e registrar resultados, versões reais do ambiente, capturas e limitações em [validation.md](reformulation/2026-10-13-figma-icons/validation.md). Os resultados dos cards anteriores não validam automaticamente os novos assets. Não se reduzem regras, limites, exclusões, tags WCAG ou retries.

## Contrato das ilustrações de governança fornecidas no Figma — 13/10/2026

O pedido do mantenedor substitui as duas ilustrações grandes próprias da implementação de OBIA e HarpIA por exports completos de seu arquivo Figma. O [registro editorial](reformulation/2026-10-13-governance-figma-icons/editorial.md) fixa associação por projeto, nós de origem, assets locais, dimensões intrínsecas de 240 × 240 e hashes. O contrato independente deve acrescentar manualmente essas associações; os arquivos ou componentes da aplicação não geram as expectativas da suíte.

Verificar integridade e carregamento dos dois SVGs locais, seleção correta em PT/EN, proporções, caráter decorativo e geometria nos tamanhos existentes. A revisão visual deve conferir a composição completa de cada arte: olho e conexões em OBIA; fundo, penas, corpo com circuitos e cabeça em HarpIA. Os exports não devem ser redesenhados, inseridos como paths inline, recortados ou simplificados. Preservar as verificações anteriores de navegação, conteúdo, teclado, acessibilidade, quatro projetos Chromium com/sem JavaScript e publicação em subdiretório.

A mudança legítima de requisito é a adoção das ilustrações fornecidas em lugar das próprias; não exige retirar verificações dos cards, dos pequenos símbolos ou dos assets de NLP2/ProIndL. Os assets anteriores e as evidências das etapas anteriores permanecem preservados. Executar `npm run quality` após a troca e registrar resultados, ambiente, capturas e limitações reais em [validation.md](reformulation/2026-10-13-governance-figma-icons/validation.md). Nenhuma regra, limite, exclusão, retry ou tag WCAG é relaxada por esta substituição.

## Contrato dos cards de linhas de pesquisa na Home — 14/10/2026

O pedido do mantenedor altera exclusivamente a seção “Nossas linhas de pesquisa” da Home em PT/EN. A organização passa a exigir dois cards com título, novo resumo e região navegável equivalente: NLP2 e ProIndL no primeiro, Macro e Micro no segundo. As quatro sínteses editoriais da Home, duas por idioma, são alteradas pelos textos fornecidos e pelas traduções registradas em [editorial.md](reformulation/2026-10-14-home-research/editorial.md). Os quatro novos resumos são acrescentados à fixture editorial, sem remover as expectativas anteriores das frases iniciais. Somente a substring PT `governança` é substituída por `Governança` no teste de presença das linhas, pois os títulos preservam essa capitalização e o novo resumo não contém a palavra minúscula; EN e as demais assertivas permanecem inalterados. Os conteúdos de Pesquisas mantêm as expectativas anteriores. O [registro de expectativas](reformulation/2026-10-14-home-research/test-expectations.json) justifica essa substituição e as verificações acrescentadas; fixtures não devem ser geradas a partir da aplicação para fazer a suíte passar.

O contrato independente em `tests/e2e/requirements.ts` mantém os dois acessos gerais aos eixos e acrescenta os quatro blocos de navegação com nomes, descrições e destinos próprios. Verificar hierarquia semântica, equivalência de estrutura, links nativos e foco visível por teclado, destinos e idioma corretos com e sem JavaScript, estados de hover/foco e composição responsiva sem transbordamento. Duas colunas de largura igual e regiões alinhadas devem dar lugar a cards empilhados com altura natural quando faltar espaço. A Home permanece sem scripts, e os caminhos locais continuam sujeitos ao teste de publicação em subdiretório.

Os quatro projetos Chromium, axe e tags WCAG vigentes, links, metadados, imagens, conteúdo histórico, controles de Pesquisas e demais requisitos continuam obrigatórios. Nenhuma regra, limite, exclusão ou retry é reduzido; não se acrescentam dependências. Executar `npm run quality` após a integração e registrar saída, ambiente, capturas e revisão visual em PT/EN efetivamente realizados em [validation.md](reformulation/2026-10-14-home-research/validation.md). Resultados anteriores não validam automaticamente este redesign.

## Contrato do hero da Home — 14/10/2026

A nova etapa preserva título e ilustração da Home e substitui somente a chamada “Saiba mais” / “About us” por “Conheça o C4AI” / “Discover C4AI”. O [registro editorial](reformulation/2026-10-14-home-hero/editorial.md) explica essa mudança legítima de expectativa e a composição aprovada. Os requisitos obrigatórios continuam independentes da aplicação: exigir texto, destino e nome acessível da chamada, seta decorativa, foco visível, altura mínima de 48 px e navegação por teclado com/sem JavaScript.

Verificar duas colunas em desktop, empilhamento até 800 px na ordem título → chamada → imagem, proporções da imagem sem corte, hierarquia tipográfica, altura natural e largura de 320 px sem transbordamento. Preservar as verificações de cards da Home, logos, heros das outras páginas, metadados, conteúdo histórico e demais requisitos, incluindo publicação em subdiretório. Executar `npm run quality` e registrar resultados e revisão visual reais em [validation.md](reformulation/2026-10-14-home-hero/validation.md), com capturas PT/EN de desktop, tablet e mobile. Nenhuma regra, limite, exclusão, retry ou tag WCAG é relaxado; os resultados anteriores não validam esta etapa automaticamente.

## Contrato do cabeçalho compartilhado — 14/10/2026

Este trecho registra a primeira implementação; a revisão posterior descrita em “Revisão das interações do cabeçalho” define o comportamento vigente dos acionadores e a permissão limitada do módulo global. Suas evidências históricas permanecem intactas.

A reorganização autorizada substitui a expectativa portuguesa “Home” por “Início” e a faixa separada de idiomas por três regiões alinhadas em desktop, com idiomas dentro do menu responsivo. Os destinos e as funções anteriores permanecem. O [registro editorial](reformulation/2026-10-14-header/editorial.md) justifica essas alterações; o contrato independente deve exigir `aria-current="page"` nas páginas correspondentes e `aria-current="location"` em Notícias/News para artigos e paginações, preservando a indicação de idioma e as mensagens de tradução ausente.

Verificar proporções e integridade do logo, alturas mínimas naturais, áreas de interação de 44 px, uma única variante disponível ao foco por largura, IDs únicos, controle Menu e submenus nativos, teclado/foco com e sem JavaScript, nomes acessíveis, movimento reduzido, largura de 320 px e publicação em subdiretório. O breakpoint é de 1240 px, definido pela medição de largura nos dois idiomas; verificar também a transição entre 1240 e 1241 px. Os estados atuais usam peso 700 e sublinhado, mantendo a fonte local regular 400. A referência de 100 px para a Home em desktop não é uma exigência de altura fixa dos artigos: avisos de tradução ausente devem continuar legíveis e podem ampliar a altura natural, com até 145,4 px observados. Manter as verificações anteriores de hero, cards, logos, conteúdo, metadados e demais componentes. Executar `npm run quality` e registrar resultados, capturas PT/EN, ambiente, revisão visual e limitações reais em [validation.md](reformulation/2026-10-14-header/validation.md). Nenhuma regra, limite, exclusão, retry ou tag WCAG é reduzido para validar esta mudança.

## Revisão das interações do cabeçalho — 14/10/2026

O mantenedor inicialmente solicitou acionadores únicos e depois definiu sua preferência final: dropdowns por hover no desktop e clique no texto com redirecionamento para Sobre/About ou Notícias/News. A revisão adota link mais controle de seta com ações distintas. O pedido posterior de retirar separadores aplica-se às linhas entre texto e seta; o divisor do grupo de idiomas permanece. Cada link principal preserva seu destino e cada seta usa `summary` nativo com nome “Seções de Sobre”/“Sections of About” ou “Seções de Notícias”/“Sections of News”. Recursos/Resources permanece um acionador completo porque não tem página geral de destino. Visão geral/Overview e Todas as notícias/All news ficam como primeiro link dos painéis, também oferecendo acesso alternativo. A indicação acessível anterior é preservada: `aria-current="page"` no link exato e `aria-current="location"` em Notícias/News nos artigos/paginações.

A expectativa substituída é a distribuição ambígua do par link/seta, não o acesso direto às páginas gerais. No compacto, o link ocupa a largura disponível e a seta conserva 44 px delimitados à direita, sem borda divisória entre os dois controles. A distinção das ações decorre do rótulo, da seta, dos nomes acessíveis e do foco, mantendo uma superfície visual contínua. A opção forma uma linha inteira regular, com fundo persistente em todo o conjunto texto/seta quando aberta, sublinks indentados abaixo e logo no fluxo de Grid/Flexbox. Menu passa a Fechar/Close conforme o estado nativo. No desktop, o painel referencia o controle: início em Sobre/About e Notícias/News e final em Recursos/Resources para respeitar a janela. Verificar PT/EN, nomes distintos de link e seta, clique no texto, expansão por Enter/Espaço, foco, menus fechados/abertos, 320 px, zoom, 1240/1241 px e artigos sem tradução.

O incremento progressivo limita-se ao cabeçalho. No desktop com mouse, `pointerenter` abre o submenu; `pointerleave` permite 150 ms para atravessar o pequeno intervalo até o painel e fecha ao sair, sem interferir com a interação por toque ou teclado. Clique externo fecha; Escape fecha e devolve o foco ao controle da seta. A exclusividade usa `details[name]`, com grupos distintos por variante e fallback no módulo. Sem JavaScript, links diretos, controles nativos de seta, destinos dos painéis e troca de idioma permanecem funcionais. Hover e os fechamentos adicionais têm testes próprios nos projetos com JavaScript; nenhuma verificação essencial é retirada dos projetos sem JavaScript.

A última orientação exige a mesma distância visual entre rótulo e chevron nos três grupos desktop. O valor adotado é 8 px em Sobre/About, Notícias/News e Recursos/Resources, sem divisores. A medição deve usar as bordas visuais do rótulo e do glyph, em vez de confundir a largura da área interativa com o intervalo percebido. Na correção final, a área de seta é de 24 × 44 px no desktop e 44 × 44 px no compacto, com SVG centralizado em ambas. Recursos/Resources continua sendo um único acionador, mesmo com a mesma composição visual. Verificar as distâncias em PT/EN nas larguras desktop e preservar a validação independente das áreas de interação e do foco.

A orientação seguinte também exige espaço visual igual entre as seis opções principais. O contrato C14 verifica os cinco intervalos do último conteúdo visível de cada opção até o início do rótulo seguinte, com referência de 40 px. O valor de `gap` CSS isolado não comprova essa igualdade: áreas invisíveis dos controles de seta podem ampliar apenas alguns intervalos. A composição adota um chevron SVG decorativo compartilhado de 12 × 12 px e `gap` de 24 px entre grupos, mantendo 8 px entre rótulo e chevron. A área de seta desktop de 24 × 44 px deve terminar dentro de seu próprio grupo, sem extensão clicável ao espaço vazio, compensação por margem negativa ou sobreposição do controle seguinte; isso também precisa ser medido. Verificar os cinco intervalos em PT/EN, incluindo larguras próximas de 1240/1241 px, além de foco e funcionamento nativo.

A orientação mais recente identifica desalinhamento dos quatro indicadores no menu compacto. C15 exige que os chevrons de Sobre/About, Notícias/News e Recursos/Resources e a seta externa de Oportunidades/Opportunities compartilhem um eixo. Cada indicador ocupa um slot de 44 px com centro a 22 px da borda direita do menu; os rótulos permanecem a 12 px da esquerda. Controles de seta com um único SVG precisam centralizar seu conteúdo, evitando que a distribuição genérica entre extremos o empurre para a esquerda. A seta externa é decorativa dentro do link inteiro, preservando seu nome acessível e destino. Medir os quatro centros em PT/EN a 320, 390, 800, 1239 e 1240 px, antes e depois de expandir cada submenu. A aparência corrigida não dispensa geometria, foco e funcionamento nativo.

### Ajuste autorizado das áreas de seta desktop

A última orientação do mantenedor identifica uma área clicável indevida no espaço entre itens e um quadrado de interação isolado em Sobre/Notícias. A solução definitiva retira a extensão desktop da seta a 44 px e qualquer compensação por margem negativa: `summary` usa 24 × 44 px, com SVG de 12 × 12 px centralizado, dentro do próprio grupo. O fundo do `summary` de seta permanece transparente em hover, aberto e ativação; o feedback de abertura fica no grupo inteiro de texto/seta, e o contorno de foco por teclado permanece. Mobile conserva 44 × 44 px. A distância rótulo–seta de 8 px e os cinco intervalos visuais de 40 px continuam exigidos, agora sem zonas clicáveis extras entre opções.

O requisito afetado é C06, complementado por C07/C13/C14. A referência anterior de 44 px era uma meta prática de conforto e é substituída somente para setas desktop pelo pedido humano posterior de remover o espaço clicável vazio. A documentação do [W3C para WCAG 2.2, critério 2.5.8 nível AA](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), consultada em 14/10/2026, define alvo mínimo de 24 × 24 pixels CSS; o alvo desktop previsto é 24 × 44 px e não depende de uma exceção desse critério. Isso não declara conformidade integral WCAG. A compensação mantém alvo maior no compacto, altura de 44 px, foco visível, teste de limites clicáveis e todas as verificações de teclado/axe. A responsabilidade editorial é do mantenedor, em 14/10/2026; revisar dimensões e limites sempre que a composição dos controles mudar. Nenhuma regra de lint, limite de complexidade, tag WCAG, retry ou exclusão é alterado por essa decisão.

A antiga expectativa de zero scripts na Home e no artefato de publicação é substituída por uma permissão limitada: somente o módulo compartilhado do cabeçalho, local e sujeito a BASE_PATH. H06 e HH05 continuam vedando scripts próprios nos cards e no hero. Não se admite outro módulo inesperado, recurso remoto, framework, dependência ou alteração das demais funcionalidades da Home. O contrato verifica o módulo autorizado e os caminhos locais de publicação, mantendo links, imagens, metadados e conteúdo.

A orientação final substitui a opção inicialmente planejada de acionador único; não constitui redução de testes para mascarar falhas. Permanecem quatro projetos Chromium, axe e tags WCAG, regras de lint, limites, exclusões, ausência de retries e todos os contratos anteriores fora das substituições justificadas. O [registro editorial](reformulation/2026-10-14-header-interactions/editorial.md) discrimina decisões, traduções, fontes e expectativas. Executar `npm run quality` e registrar resultados, capturas, zoom, ambiente, revisão visual e limitações efetivamente observados em [validation.md](reformulation/2026-10-14-header-interactions/validation.md); a validação desta revisão está pendente até essa execução. As evidências da primeira implementação permanecem intactas.

## Primeiro clique após hover — 14/10/2026

No desktop, a abertura de um painel fechado por hover de mouse fica pendente de confirmação: o primeiro clique no acionador mantém o painel aberto e consome essa marcação; o segundo fecha normalmente. Reentrar em um painel já aberto não renova a confirmação. Fechamento, mudança de breakpoint e ativação por Enter/Espaço limpam a marcação. Teclado, toque, links diretos e navegação sem JavaScript preservam a alternância nativa.

O teste de regressão cobre PT/EN e os três acionadores, com clique real partindo de fora do menu, segundo clique, hover explícito, reabertura, reentrada e Enter/Espaço após hover. Os projetos sem JavaScript verificam os dois cliques nativos; nenhuma verificação anterior é removida.

## Retomada da validação do cabeçalho — 14/10/2026

A qualidade da implementação vigente foi executada com as versões fixadas Node 24.21.0/npm 11.19.0: 21 testes de configuração e 726 testes de navegador aprovados, nos quatro projetos originais, sem alterar requisitos ou verificações. As oito capturas de zoom PT/EN foram refeitas com setas estabilizadas. A revisão nativa no Safari 27.0.1 conferiu destinos, cliques, Escape desktop e alinhamento compacto; hover isolado, sequência completa por Tab e matriz exata de larguras/artigos permanecem para homologação nativa. Resultados, integridade, capturas e limites estão no [registro da retomada](reformulation/2026-10-14-header-resume/validation.md). Esta etapa acrescenta somente documentação e evidências.

## Movimento reduzido e saída do foco no cabeçalho — 14/10/2026

C06/C10 exigem chevrons sem transição quando `prefers-reduced-motion: reduce` estiver ativo, preservando a indicação instantânea do estado aberto/fechado. O teste emula essa preferência em PT/EN, nas variantes desktop/mobile com e sem JavaScript, e verifica duração zero e orientação da seta nos dois estados. Sem a preferência, a transição de 150 ms continua disponível. A correção é restrita aos chevrons.

C11 exige que o submenu desktop permaneça aberto enquanto contiver o foco ou o ponteiro de mouse. Saída de qualquer um agenda a reavaliação após 150 ms; a entrada de ponteiro ou foco cancela o fechamento pendente. O callback só fecha quando ambos estão fora, sem mover o foco. O teste usa relógio controlado e Tab/Shift+Tab para verificar saída conjunta, deslocamento interno do foco, permanência do ponteiro e reentrada antes do prazo nos três submenus PT/EN. Sem JavaScript, mantém-se a expansão nativa até nova ativação do controle. A regressão do primeiro clique e os demais testes permanecem ativos. Nenhum limite, regra, retry ou exclusão foi relaxado.

## Banner e canais de Sobre — 15/10/2026

A alteração autorizada substitui os H1 PT/EN de Sobre e a hierarquia antiga de dois h2 dos canais por um h2 contextual com dois h3 subordinados. A lista obrigatória de páginas continua independente das rotas/coleções; as expectativas de conteúdo institucional, imagens e destinos permanecem ativas. Os novos cenários exigem título/descrição/CTA, canais compactos, ordem, alinhamento, fotografia, teclado/foco e responsividade em seis larguras nos quatro projetos existentes. Nenhuma regra, limite, retry ou exclusão foi relaxado. O [registro editorial](reformulation/2026-10-15-about-intro/editorial.md) explica as mudanças legítimas de expectativas; o [registro de validação](reformulation/2026-10-15-about-intro/validation.md) registra resultados e limitações desta execução.

## Blocos institucionais de Sobre — 15/10/2026

A segunda correção reorganiza apresentação, missão/visão e localização sem remover os textos exigidos pela fixture editorial. O terceiro parágrafo institucional passa a um detalhamento nativo acessível com/sem JavaScript. Os testes acrescentam o contrato manual dos três blocos, fotos únicas, teclado, foco, contato e geometria responsiva; o teste da primeira correção atualiza somente o seletor equivalente da coluna textual, mantendo a exigência de alinhamento. Nenhuma regra, limite, retry, timeout ou exclusão foi relaxado. O [registro editorial](reformulation/2026-10-15-about-overview/editorial.md) explica as decisões e expectativas; o [registro de validação](reformulation/2026-10-15-about-overview/validation.md) registra os resultados reais e seus limites.

## Cartões de liderança de Sobre — 16/10/2026

A alteração autorizada substitui a introdução sobre o Comitê Executivo, os títulos compostos de nome/cargo/afiliação e as seis biografias extensas por uma introdução contextual, campos separados e sínteses verificadas. As fixtures editoriais passam a exigir os novos textos; não se mantém oculto conteúdo antigo com informações conflitantes apenas para satisfazer expectativas anteriores. As seis pessoas, sua ordem, os qualificadores atuação/acting, retratos e três URLs permanecem obrigatórios. O [registro editorial](reformulation/2026-10-16-about-leadership/editorial.md) explica cada decisão e suas fontes.

Os testes anteriores passam a localizar os nomes como h4 e a avaliar cada grupo de três perfis separadamente. A antiga expectativa global de três colunas acima de 700 px é substituída pelo comportamento solicitado: três a partir de 1100 px, duas entre 701–1099 px e uma até 700 px. O contrato manual adicional verifica hierarquia, cargos, afiliações, biografias, fotos, links, teclado/foco e alinhamentos em sete larguras, nos quatro projetos existentes. Não mudam regras, limites, retries, timeouts, exclusões ou a lista obrigatória de páginas. Resultados reais, capturas e limitações estão no [registro de validação](reformulation/2026-10-16-about-leadership/validation.md).

## Acesso direto em português — 29/10/2026

O plano aprovado substitui legitimamente o título, a descrição e o H1 da antiga tela de escolha na raiz pelos da Home portuguesa. A fixture independente passa a declarar `/` como Home PT, `/en/` como Home EN e `/pt/` como alias obrigatório com canonical `/`. As expectativas manuais de hero, cards, cabeçalho e retorno de idioma passam à raiz; o alias mantém testes de conteúdo, metadados, acessibilidade, largura e navegação. Os trechos da fixture editorial da Home portuguesa permanecem intactos, mudando apenas o caminho principal de `/pt/` para `/`; são exigidos tanto na raiz quanto no alias.

O cenário da tela de escolha é substituído pela entrada direta com navegador `en-US`, ausência de redirecionamento/tela intermediária e troca por teclado nos controles do cabeçalho. Cenários adicionais conferem compatibilidade de `/pt/`, logo, Início e os dois retornos da 404. A expectativa de nenhum item ativo na antiga entrada neutra é substituída pela exigência de Início com `aria-current="page"` na raiz e no alias; a 404 continua sem item ativo. As verificações de teclado/salto ao conteúdo, trocas nas páginas internas, pares e ausência de tradução em artigos continuam. O teste de publicação temporário passa a conferir raiz, alias e Home inglesa em `/centro/`, incluindo igualdade do HTML português, canonical, hreflang, favicon e somente o módulo de cabeçalho previamente autorizado.

Essas mudanças acompanham o novo requisito; não reduzem regras, limites, exclusões, retries ou páginas obrigatórias e não constituem uma exceção à política. Executar `npm run quality`, revisar as duas Homes em desktop/mobile e registrar resultados e limitações no [registro da mudança](reformulation.md#acesso-direto-em-português--29102026).

O esquema editorial passa a aceitar `/` exclusivamente quando `kind`, `locale` e `translationId` identificam a Home portuguesa. Os demais registros continuam exigindo caminhos iniciados por `/pt/` ou `/en/`. Um teste sintético independente aceita a raiz portuguesa e os caminhos localizados; rejeita raiz inglesa, identificador de tradução diferente/ausente, outros tipos de página mesmo com conteúdo e caminhos sem prefixo de idioma. Essa atualização restrita acompanha o endereço aprovado; não libera caminhos arbitrários.

Com a Home na raiz, o layout precisa passar o caminho da 404 ao cabeçalho quando `notFound` estiver ativo, evitando marcar Início por herança do caminho canônico padrão. O teste de ausência de seleção na 404 permanece inalterado e detectou essa regressão durante a implementação.

## Títulos das áreas de governança — 30/10/2026

Por decisão expressa do mantenedor, as expectativas manuais de títulos das seções, links nos cards da Home e links do índice de Pesquisas substituem os quatro títulos longos pelos novos títulos PT/EN descritos nos [requisitos](requirements.md#títulos-das-áreas-de-governança--30102026). A lista de páginas e as expectativas de textos explicativos, metadados, âncoras, ordem e associações OBIA/HarpIA não mudam. Os testes existentes continuam exigindo nomes acessíveis exatos, destinos, teclado, foco, apresentação responsiva e funcionamento com/sem JavaScript; nenhuma regra, limite, exclusão ou retry foi alterado. Registrar qualidade e revisão visual no [registro da alteração](reformulation.md#títulos-das-áreas-de-governança--30102026).
