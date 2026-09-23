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
