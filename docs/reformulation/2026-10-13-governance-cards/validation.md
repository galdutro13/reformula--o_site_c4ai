# Validação dos cards de governança — 13/10/2026

## Resultado final

`npm run quality` terminou com código **0**, com **19 testes de configuração e 598 testes de navegador aprovados** nos quatro projetos Chromium desktop/mobile com e sem JavaScript. Astro check analisou 63 arquivos com **0 erros, 0 warnings e 0 hints**; o build gerou 38 páginas estáticas. A saída integral está em [quality.txt](quality.txt).

O ambiente utiliza Node **24.15.0** e npm **11.12.1**, diferentes das versões fixadas **24.21.0/11.19.0**. Permanece o aviso preexistente de complexidade 15, limite 10, em `tests/e2e/site.spec.ts:31`, sem supressão. A validação do modelo foi dividida em funções pequenas, sem acrescentar avisos de complexidade. Os avisos de `NO_COLOR`/`FORCE_COLOR` do runner não impediram a execução.

## Aceitação e preservação

- Eixo Governança em `h2`, frentes Macro/Micro em `h3` fora dos cards, projetos em `h4` e rótulos internos em `h5`, com a mesma tipografia dos cards de línguas.
- Dois cards com identificadores discretos, títulos completos, resumo, três frentes com ícones/títulos/descrições, liderança, chamada e contato, na ordem OBIA → HarpIA.
- OBIA com Sobre o projeto e Recursos; HarpIA com Sobre a plataforma, Equipe e Recursos. Controles nativos inicialmente fechados, com foco visível e expansão/fechamento por Enter e Space, inclusive sem JavaScript. Nenhum painel vazio ou painel Módulos foi acrescentado.
- Chamada OBIA navega para o conteúdo de sua descrição e revela o painel pelo comportamento nativo de fragmentos do Chromium. HarpIA mantém a página oficial de cada idioma e o link para contato com a equipe.
- Conteúdo completo obrigatório no HTML e nos painéis abertos, incluindo junho de 2022, NIC.br e informações institucionais de OBIA, arquitetura modular de HarpIA, instalação própria e ausência de treinamento, otimização ou serviço hospedado.
- Recursos, equipe, créditos e contatos preservados. OBIA EN possui uma única cópia do recurso, com `5-c147` no painel e `5-c151` em conteúdo real, conforme autorização do mantenedor; ambos os fragmentos continuam funcionais.
- Duas colunas equivalentes a 1440 px, com alturas e faixas de conteúdo alinhadas; empilhamento a 800, 390 e 320 px, mantendo cada frente imediatamente antes do projeto correspondente. Os testes também abrem todos os painéis a 320 px e exigem ausência de transbordamento.
- Esquema exige apresentações dos quatro projetos atuais, frentes descritivas de governança, par Sobre/chamada, destinos seguros e conteúdo nos painéis. Equipe e email continuam obrigatórios em NLP2/ProIndL; HarpIA exige equipe e contato externo; OBIA mantém email e pode omitir Equipe.

Uma comparação programática com cópias dos quatro registros anteriores confirmou preservação de IDs, idioma, fonte, data de consulta, âncoras e HTML detalhado. Os três parágrafos de HarpIA e os conteúdos de Equipe/Recursos permanecem literalmente iguais. O único recurso deduplicado é o de OBIA EN, autorizado expressamente, mantendo uma cópia literal e as duas âncoras. Os hashes dos dois SVGs fornecidos no Figma continuam iguais ao registro anterior.

Foram acrescentadas 32 execuções de navegador e quatro contratos de configuração. As expectativas são manuais e independentes da aplicação; as [substituições justificadas](test-expectations.json) tratam da nova apresentação e da consolidação autorizada. Nenhum teste, regra, limite, retry ou exclusão foi reduzido. As verificações existentes de línguas, ilustrações do Figma, história, navegação, metadados, teclado, axe, arquivos locais e publicação em subdiretório passaram.

## Revisão visual e ilustrações

Foram geradas e examinadas **10 capturas finais**, com JavaScript desabilitado: PT/EN em desktop e celular, com painéis fechados e expandidos, mais tablet de 800 px com painéis fechados. O [manifesto](captures.json) registra viewport real, timestamp, estado, suporte a subgrid, dimensões das ilustrações e ausência de transbordamento.

Conferi a separação entre frentes e projetos, tipografia, cores discretas, ilustrações, hierarquia dos textos, alinhamento das cinco faixas e contatos no desktop. No tablet os projetos empilham com seus cabeçalhos e ilustrações. No celular as ilustrações grandes ficam ocultas, seguindo o padrão anterior, e os controles/textos permanecem no fluxo. As capturas expandidas mostram todas as descrições e recursos, sem colisões ou cortes.

As alturas das viewports foram ampliadas para capturar a seção completa, conforme o manifesto; os testes também usam alturas convencionais. As capturas maiores foram reduzidas pela ferramenta de visualização e serviram para conferir fluxo e cortes. A conferência do conteúdo detalhado também ocorreu nas capturas desktop e nos testes independentes.

- [PT desktop](screenshots/governance-pt-desktop.png) e [expandido](screenshots/governance-pt-desktop-expanded.png)
- [PT tablet](screenshots/governance-pt-tablet.png)
- [PT celular](screenshots/governance-pt-mobile.png) e [expandido](screenshots/governance-pt-mobile-expanded.png)
- [EN desktop](screenshots/governance-en-desktop.png) e [expandido](screenshots/governance-en-desktop-expanded.png)
- [EN tablet](screenshots/governance-en-tablet.png)
- [EN celular](screenshots/governance-en-mobile.png) e [expandido](screenshots/governance-en-mobile-expanded.png)

As duas ilustrações novas são SVGs próprios desta implementação, inspirados na proposta: rede/observação para OBIA e checklist/métricas para HarpIA, com fundo orgânico transparente e paleta institucional suave. Não representam logos oficiais. São servidas localmente com proporção quadrada e dimensões naturais/renderizadas de **240 × 240 px** no desktop/tablet; são decorativas, com `alt=""` e `aria-hidden="true"`.

| Asset                              | Bytes | SHA-256                                                            |
| ---------------------------------- | ----- | ------------------------------------------------------------------ |
| `public/media/research-obia.svg`   | 1723  | `32debba5bfc144e456287855e0cdcd2a3b4de0525d51f4cc3fd309d98355ef03` |
| `public/media/research-harpia.svg` | 1835  | `96f4d1a13d60427905befa68a05550b604460657b0f99c491490eb008ca70124` |

## Ocorrências durante a integração

A primeira execução completa registrou 16 falhas nos dois novos testes de painéis/âncoras: os seletores CSS usavam IDs legados iniciados por números sem escape. Foram corrigidos somente os seletores para correspondência por atributo `id`, preservando IDs, fixtures e assertions. Essa saída está em [quality-first-attempt.txt](quality-first-attempt.txt); os demais 582 testes de navegador e os 19 de configuração passaram nessa rodada.

A repetição aprovou os 598 testes de navegador e os 19 de configuração, conforme [quality-before-spacing-fix.txt](quality-before-spacing-fix.txt). A revisão visual identificou depois padding adicional no grupo recém-criado para a âncora `5-c151`. Esse grupo passou a usar o layout de coluna, preservando a âncora e o HTML, sem introduzir espaçamento de seção. A execução completa final passou novamente. As duas capturas expandidas de EN foram atualizadas e conferidas; o grupo tem padding de 0 px e não há transbordamento.

A revisão independente delimitada dos componentes e da preservação editorial não encontrou defeitos concretos. Após registrar os resultados, a formatação e `git diff --check` foram conferidos novamente.

## Limites e estado

Não foram testados Firefox/WebKit, leitores de tela, disponibilidade externa dos portais ou entrega dos contatos. O comportamento de revelação por fragmento foi verificado no Chromium; não foi verificado em outros motores. Axe e teclado não certificam conformidade WCAG integral. A consulta desta etapa às fontes de conteúdo foi local e não atualiza as datas de coleta institucionais.

A implementação mantém Astro estático, TypeScript estrito e CSS nativo, sem dependências, páginas ou JavaScript cliente adicionais. Os registros anteriores de migração e reformulação permanecem preservados. Não houve commit, push ou publicação.
