# Primeira reformulação — 22/09/2026

Este documento preserva o histórico da primeira reformulação e seus resultados. A [atualização editorial de 06/10/2026](#atualização-editorial--06102026) define as mudanças posteriores; resultados e capturas abaixo não devem ser apresentados como validação da atualização de outubro.

Home e Pesquisas, em PT/EN, passam a comunicar o novo foco autorizado pelo mantenedor. Esta etapa altera a apresentação e a organização; não confirma dados atuais de equipes, contatos, resultados ou financiamento.

## Organização adotada

| Linha atual                                                                                                            | Registros associados                                | Âncora nova         |
| ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------- |
| Processamento de linguagem natural para as línguas do Brasil / Natural language processing for the languages of Brazil | NLP2 e ProIndL                                      | `languages`         |
| Governança de IA e avaliação de LLMs / AI governance and LLM evaluation                                                | OBIA@C4AI e KEML                                    | `governance`        |
| Trabalhos anteriores / Previous research                                                                               | OceanML, MClimate, AI Health e AgriBio, nessa ordem | `previous-research` |

As duas primeiras linhas têm sínteses novas e equivalentes nos dois idiomas, limitadas ao foco informado: português, línguas indígenas, governança de IA e avaliação de grandes modelos de linguagem. Elas aparecem com igual importância na Home e no início de Pesquisas. A Home mantém ilustração, acesso a Sobre e destaque de diversidade e inclusão.

Os registros detalhados dos oito grupos foram preservados sem alterações, incluindo lideranças, equipes, recursos, contatos e avisos de divergência existentes. A procedência dos dados fica registrada nesta documentação; os avisos de revisão foram removidos da interface por solicitação do mantenedor. Associar OBIA/KEML ao eixo de governança não significa afirmar que todas as atividades históricas de KEML continuam no escopo atual.

As oito âncoras antigas permanecem nos respectivos registros. A navegação interna oferece as duas linhas e o histórico; os cartões da Home apontam às linhas de Pesquisas. Não há novas páginas, mudança de rotas, redirecionamento, dependência ou JavaScript adicional.

## Conteúdo e procedência

A coleção `researchLines`, em `src/content/research-lines/`, compartilha nomes, sínteses, âncoras e referências dos grupos entre Home e Pesquisas. O esquema exige os campos e dois grupos por linha. O build exige os dois pares de idiomas, as associações autorizadas, referências existentes e os quatro grupos históricos na ordem definida.

`revision` registra a data e o fundamento editorial nos novos registros e nas quatro páginas revisadas. `source` e `retrievedAt` das páginas continuam identificando a origem migrada, não a fonte dos novos textos. A apresentação anterior fica preservada em [Home PT](reformulation/home-pt-before.json), [Home EN](reformulation/home-en-before.json), [Pesquisas PT](reformulation/research-pt-before.json) e [Research EN](reformulation/research-en-before.json). O inventário e a documentação da migração não foram reescritos.

Foram retirados da apresentação pública atual o número aproximado de 250 pesquisadores e a caracterização dos oito desafios como atuais. Textos e índice antigos foram substituídos por sínteses do novo escopo. Nenhum novo número ou composição de equipe foi inferido.

## Implementação e verificações

`ResearchFocus.astro` compartilha a apresentação dos eixos, com cartões na Home e seções com registros em Pesquisas. Foi eliminada a seleção por posição (`slice`) que removia parte da antiga Home. O CSS mantém paleta, tipografia, ilustração e gradiente existentes, usando dois cartões de mesma largura e altura no desktop e uma coluna no celular.

O contrato independente foi atualizado para exatamente duas linhas, nomes PT/EN, associações, avisos, ordem do histórico, navegação por teclado dos cartões e novas descrições de metadados. [changed-expectations.json](reformulation/changed-expectations.json) discrimina os textos substituídos; **757 trechos** continuam obrigatórios, incluindo o conteúdo histórico de Pesquisas e os textos das páginas fora do escopo. Regras, limites, tags axe, exclusões e retries não foram relaxados.

A primeira execução completa de `npm run quality` passou: **486 testes Playwright**, cinco testes de configuração, build estático de 38 páginas, formatação e lint aprovados, Astro check com 52 arquivos e zero erros/avisos/hints. Permanece o aviso preexistente de complexidade 15 no teste de metadados, conforme a política de qualidade. A execução usa Node 24.21.0 e npm 11.19.0, sem alterar dependências ou lockfile.

A prova de detecção removeu temporariamente a seção `governance` do HTML compilado de Pesquisas PT. O teste independente `pt: duas linhas atuais e histórico preservado` falhou especificamente com **duas seções esperadas e uma encontrada**. O arquivo foi restaurado byte a byte. Veja [evidência](reformulation/missing-line-probe.txt). O comando usado foi `npx playwright test site.spec.ts --project=desktop --grep 'pt: duas linhas atuais' --reporter=line`. A verificação completa é repetida após a restauração e a documentação. Seu resultado final é registrado em [quality.txt](reformulation/quality.txt).

## Revisão visual

Comparação manual com as capturas da migração em `docs/migration/screenshots/`, preservadas. As novas capturas ficam em `docs/reformulation/screenshots/`; o [manifesto](reformulation/captures.json) registra caminho, estado, data e dimensões reais.

| Página       | Desktop                                                       | Celular                                                     |
| ------------ | ------------------------------------------------------------- | ----------------------------------------------------------- |
| Home PT      | [1440×900](reformulation/screenshots/home-pt-desktop.png)     | [390×844](reformulation/screenshots/home-pt-mobile.png)     |
| Home EN      | [1440×900](reformulation/screenshots/home-en-desktop.png)     | [390×844](reformulation/screenshots/home-en-mobile.png)     |
| Pesquisas PT | [1440×900](reformulation/screenshots/research-pt-desktop.png) | [390×844](reformulation/screenshots/research-pt-mobile.png) |
| Research EN  | [1440×900](reformulation/screenshots/research-en-desktop.png) | [390×844](reformulation/screenshots/research-en-mobile.png) |

Capturas adicionais: [cartões empilhados no celular](reformulation/screenshots/home-en-mobile-cards.png), [histórico no desktop](reformulation/screenshots/history-pt-desktop.png) e [histórico no celular](reformulation/screenshots/history-pt-mobile.png).

Diferenças intencionais: a Home ganhou uma introdução explícita e dois cartões maiores em lugar dos oito exemplos; Pesquisas ganhou introdução mais curta, índice de três destinos e separação entre sínteses atuais e registros históricos. A sequência histórica foi reorganizada conforme a tabela. No celular, os cartões e os grupos são empilhados; a navegação continua nativa e em fluxo. Os testes também verificam transbordamento em 320 px, teclado, links/arquivos, painéis, idioma, metadados e subdiretório.

## Pendências e limites

- Sobre/About permanece com a descrição estratégica ampla de aprendizado, decisão, representação e raciocínio, além de lideranças, comitês, vínculos e instalações da migração. A revisão institucional dessas afirmações pertence a uma próxima etapa; não foram atualizadas por inferência.
- Notícias, os 26 artigos e os acervos externos permanecem registros datados. Referências a antigos desafios nesses textos não foram reinterpretadas como linhas atuais.
- Permanecem pendentes a confirmação de equipes e contatos, a revisão institucional de traduções, direitos e os detalhes de hospedagem USP. As duas linhas não criam automaticamente as páginas dos dois subprojetos previstas no contrato original.
- A comparação visual é manual e amostral; axe não certifica conformidade integral. Não foram testados leitores de tela, dispositivos físicos, Firefox/WebKit ou CI remota. A suíte obrigatória usa apenas o artefato local, sem consultar o site público.

Sem commit, push ou publicação nesta etapa.

## Ajuste da Home — 23/09/2026

Por solicitação editorial, a Home em português usa o título “Um centro de pesquisa para inteligência artificial avançada no Brasil”; a versão inglesa usa “A research center for advanced artificial intelligence in Brazil”. O idioma do título acompanha cada versão. O parágrafo de `heroBlocks` foi removido. Permanecem a ilustração, o acesso a Sobre, os dois cartões e a descrição dos metadados sobre as linhas atuais. Pesquisas não foi alterada. As capturas acima registram o estado anterior a este ajuste.

As expectativas independentes do título foram atualizadas e a verificação existente passou a conferir a ausência do parágrafo e a identificação de idioma. Nenhuma regra de qualidade foi relaxada.

## Remoção dos avisos de revisão — 23/09/2026

Foram removidos os avisos `historical-notice` das duas linhas e de Trabalhos anteriores, em português e inglês, além do parágrafo explicativo sobre o histórico. Os títulos, grupos, conteúdo, painéis e âncoras permanecem. Observações destinadas ao mantenedor devem ser comunicadas no Codex e registradas na documentação, sem inserção automática na página pública.

Os testes que exigiam os avisos agora verificam sua ausência, conforme a nova solicitação editorial. As verificações de preservação dos oito grupos e de sua organização permanecem. A remoção dos avisos não constitui aprovação editorial dos dados antigos.

## Atualização editorial — 06/10/2026

O plano expressamente autorizado pelo mantenedor consolida a reunião de 29/09 e o email de 30/09 de Fábio Cozman. A nova organização mantém dois eixos, subdivide governança em Macro (OBIA e regulação de IA) e Micro (implantação em empresas e HarpIA), e desloca KEML para o final de Trabalhos anteriores, preservando integralmente seu registro. Home e Sobre recebem a frase e os textos aprovados; Sobre mantém a liderança selecionada como Comitê Executivo e duas fotografias dos comitês, mas retira os demais conteúdos indicados. O workshop permanece com a data 2022. A assinatura CIAAM/USP substitui o conjunto anterior no rodapé de todo o site.

O [registro editorial](reformulation/2026-10-06/editorial.md) discrimina decisões, fontes consultadas, traduções e fragmentos retirados. O [registro de expectativas](reformulation/2026-10-06/changed-expectations.json) documenta as substituições nos testes. O [registro de validação](reformulation/2026-10-06/validation.md) distingue resultados efetivamente executados de verificações pendentes.

Esta etapa não reescreve inventários, relatórios, capturas ou demais evidências anteriores de migração e reformulação. Os artigos e notícias preservam seus conteúdos datados, recebendo apenas a navegação e o rodapé compartilhados. A aprovação das alterações editoriais não confirma a atualidade de equipes e contatos históricos nem autoriza publicação.

## Redesign do índice de Pesquisas — 13/10/2026

O mantenedor solicitou corrigir somente a navegação inicial de Pesquisas, cuja distribuição em três colunas equiparava os dois eixos e Trabalhos anteriores. A segunda imagem anexada orienta o redesign: dois cartões discretos, de largura equivalente, com título, descrição e links subordinados; histórico em faixa complementar inferior. A composição usa as cores e a tipografia existentes, CSS Grid no desktop e empilhamento no mobile.

A navegação recebe o título “Explore nossas pesquisas” (“Explore our research”) e a introdução “Conheça nossas linhas de pesquisa e acesse as áreas temáticas.” (“Discover our research areas and explore their themes.”). Os títulos dos cartões identificam línguas do Brasil e Governança de IA, sem funcionar como links adicionais. Os destinos continuam sendo `#languages`, `#governance-macro`, `#governance-micro` e `#previous-research`, nessa ordem. `#governance` permanece disponível na seção e no acesso da Home.

A descrição de línguas é preservada; a síntese do índice de governança passa a ser “Estudos sobre políticas públicas, implantação e avaliação de sistemas de inteligência artificial.”, traduzida como “Studies of public policy, deployment and evaluation of artificial intelligence systems.”. O histórico usa “Conheça os registros de pesquisas anteriores do C4AI.” (“Explore records of previous C4AI research.”), limitando a descrição aos registros disponíveis. As chamadas de ação são “Conhecer esta linha de pesquisa” / “Explore this research area” e “Consultar trabalhos anteriores” / “Browse previous research”. Macro e Micro mantêm seus nomes completos.

O contrato independente em `tests/e2e/requirements.ts` fixa esses textos e destinos. A expectativa anterior do nome “Nesta página” / “On this page” e do link direto “Trabalhos anteriores” / “Previous research” foi substituída pelo título e pela chamada de ação aprovados. Foram acrescentadas verificações de hierarquia, agrupamento, geometria, ordem de foco e navegação por teclado nos quatro projetos, inclusive sem JavaScript. Os resultados anteriores de qualidade não validam este redesign; a nova execução e a revisão visual são documentadas no [registro de validação desta etapa](reformulation/2026-10-13/validation.md).

Esta alteração não modifica o conteúdo completo das linhas, as associações dos grupos, os registros históricos nem os demais componentes. Não autoriza commit, push ou publicação e não acrescenta dependências ou JavaScript cliente.

## Complementação do HarpIA — 13/10/2026

Por solicitação do mantenedor, o registro HarpIA PT/EN passa da síntese inicial para uma apresentação com idealização/gestão, propósito, instalação própria, seleção da equipe conforme créditos oficiais, documentação e formulário de contato. Dois painéis nativos organizam Equipe e Recursos, mantendo o link principal e a âncora `harpia`. A equipe não é copiada do registro histórico de KEML.

O [registro editorial](reformulation/2026-10-13-harpia/editorial.md) relaciona as páginas consultadas e as divergências entre versões PT/EN. O [registro de validação](reformulation/2026-10-13-harpia/validation.md) contém os resultados desta complementação, preservando separadamente a evidência do redesign do índice feito na mesma data.

Durante a revisão da complementação, o mantenedor pediu retirar a seção Módulos. O painel foi removido em PT/EN, com contrato de ausência explícito; a descrição geral, a equipe e os links de documentação e contato permanecem.

## Cards de NLP2 e ProIndL — 13/10/2026

Na correção seguinte de Pesquisas, o mantenedor solicitou preservar a disposição lado a lado dos projetos de línguas do Brasil, mas padronizar sua organização interna para apoiar descoberta e navegação. A segunda imagem anexada orienta cards com bordas discretas, ilustrações decorativas, sigla subordinada ao nome completo, resumo curto, três frentes de pesquisa, liderança separada, controles expansíveis e contato.

O componente reutilizável em Astro apresenta NLP2 e ProIndL nessa ordem em PT/EN. O grid usa duas colunas quando há espaço para cards de pelo menos 30 rem, com gap de 2 rem, e empilha os projetos quando esse espaço não existe. O controle “Conhecer o projeto” abre a descrição detalhada no próprio card; não se cria uma página específica nem se presume um destino externo ausente do pedido. Equipe e Recursos e publicações permanecem expansíveis por controles HTML nativos, com IDs e destinos históricos preservados.

Os resumos e as frentes seguem a síntese editorial autorizada pelo mantenedor; as traduções e os limites de procedência estão no [registro editorial](reformulation/2026-10-13-languages/editorial.md). O [registro de validação](reformulation/2026-10-13-languages/validation.md) destina-se exclusivamente aos resultados e capturas desta correção. Não se sobrescrevem as evidências anteriores de migração, atualização de 06/10, índice ou HarpIA. Os registros extensos dos dois projetos e os demais grupos continuam disponíveis, sem converter a revisão visual em confirmação institucional da atualidade de equipes, contatos ou resultados.

Durante a tarefa, o mantenedor autorizou corrigir a primeira pergunta da descrição detalhada de ProIndL EN, removendo um fragmento estranho sobre textos sintaticamente anotados, relacionado a NLP2 e ausente do texto português. A pergunta e sua expectativa independente passam a corresponder ao equivalente português; nenhum outro trecho detalhado é reescrito.

## Ilustrações dos cards fornecidas no Figma — 13/10/2026

O mantenedor recriou as ilustrações do mockup e solicitou adotar os dois componentes do [arquivo C4AI — Ícones NLP2 e ProIndL](https://www.figma.com/design/R70QFAvYNAN8NpocOdiBeA/?node-id=0-1). “NLP2 — Balões de conversa” substitui a ilustração de NLP2; “ProIndL — Penas e geometria” substitui a de ProIndL. Os SVGs exportados são servidos localmente, preservando os desenhos, os fundos orgânicos transparentes e suas dimensões intrínsecas de 240 × 240.

A substituição aplica-se aos cabeçalhos dos dois cards em PT/EN. Os pequenos símbolos de frentes, painéis e contato pertencem à implementação anterior; os componentes fornecidos no arquivo são as duas ilustrações grandes. Conteúdo, ordem, âncoras, controles nativos e organização dos cards permanecem. A procedência, os IDs de origem e os hashes estão no [registro editorial](reformulation/2026-10-13-figma-icons/editorial.md). Resultados da nova execução de qualidade e capturas devem constar do [registro de validação desta substituição](reformulation/2026-10-13-figma-icons/validation.md), separado das evidências anteriores.

## Cards de OBIA e HarpIA — 13/10/2026

Por solicitação do mantenedor, os dois projetos de governança reutilizam o padrão visual e o componente dos cards de línguas. Os cabeçalhos Macro e Micro permanecem fora dos cards; a hierarquia distingue eixo, frente e projeto em `h2`, `h3` e `h4`. O grid intrínseco e o subgrid alinham as duas frentes e cinco regiões dos cards, preservando cada frente junto ao seu projeto nas telas pequenas.

Os nomes completos, resumos, três frentes descritivas e lideranças seguem a proposta fornecida, com tradução equivalente em EN. A descrição integral fica em Sobre o projeto / Sobre a plataforma, sem remover a história do OBIA ou as condições de instalação e utilização do HarpIA. Equipe e Recursos mantêm conteúdo e destinos; o componente admite a diferença de quantidade de painéis e o contato externo do HarpIA. NLP2 e ProIndL conservam suas apresentações e SVGs originais do Figma.

O mantenedor autorizou consolidar os dois painéis Resources idênticos de OBIA EN, mantendo `5-c147` no painel e `5-c151` em seu conteúdo real. A chamada OBIA revela esse conteúdo por navegação nativa até a descrição no painel; HarpIA conserva o destino oficial. As ilustrações de rede/observação e checklist/métricas são SVGs decorativos próprios desta implementação, sem alegação de logos institucionais.

As fontes, datas de consulta originais e textos detalhados permanecem preservados. O [registro editorial](reformulation/2026-10-13-governance-cards/editorial.md) contém a tradução e a justificativa da reorganização; [test-expectations.json](reformulation/2026-10-13-governance-cards/test-expectations.json) discrimina as expectativas substituídas. Resultados reais e capturas desta etapa pertencem ao [registro de validação](reformulation/2026-10-13-governance-cards/validation.md). Não houve autorização para commit, push ou publicação.

## Ilustrações de OBIA e HarpIA fornecidas no Figma — 13/10/2026

O mantenedor forneceu um [arquivo Figma com as ilustrações de governança](https://www.figma.com/design/oRyXiLWMBUDsiVWzDeSs4k/?node-id=2-81) e solicitou adotá-las nos cards. OBIA passa a usar a arte de olho com conexões; HarpIA passa a usar a composição completa de ave com circuitos e fundo. Os SVGs exportados são servidos localmente e preservados integralmente, com dimensões intrínsecas de 240 × 240. A descrição do arquivo Figma atribui a arte de HarpIA à importação de `mascote_colorido.svg`, com retirada do lettering e adaptação de enquadramento e cores; esse registro identifica a procedência fornecida, sem atestar um logo oficial.

A troca altera somente a seleção das ilustrações dos cabeçalhos em PT/EN. Layout, CSS, conteúdo, pequenos símbolos, controles e contatos permanecem; os assets próprios usados anteriormente e todas as evidências anteriores são preservados. A consulta aos componentes visuais é registrada separadamente da procedência e das datas dos textos institucionais. Nós, arquivos e hashes estão no [registro editorial](reformulation/2026-10-13-governance-figma-icons/editorial.md). A nova execução de qualidade e as capturas devem constar do [registro de validação desta substituição](reformulation/2026-10-13-governance-figma-icons/validation.md), sem reutilizar resultados anteriores como aprovação automática.
