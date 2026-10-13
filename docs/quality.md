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
