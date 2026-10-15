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

## Logo da USP exportado do Figma — 14/10/2026

O mantenedor autorizou também a substituição do logo USP do rodapé pela reconstrução vetorial aprovada no Figma, preservando o enquadramento, as proporções e o layout. Exportação integral, adaptação das margens e resultados estão no [registro do logo USP](reformulation/2026-10-14-usp-logo-figma/validation.md).

## Logo do cabeçalho exportado do Figma — 14/10/2026

O mantenedor autorizou substituir o PNG do cabeçalho pela reconstrução aprovada no Figma. O SVG mantém as formas e a tipografia vetorizada da exportação; apenas o enquadramento do arquivo web é ajustado às margens do logo anterior, preservando a área de 181 × 72 px, as proporções da marca e o layout existente. Origem, exportação integral e resultados estão no [registro da substituição](reformulation/2026-10-14-logo-figma/validation.md).

## Cards de linhas de pesquisa na Home — 14/10/2026

O mantenedor solicitou corrigir equilíbrio visual, hierarquia, densidade de conteúdo e navegação da seção “Nossas linhas de pesquisa”. A proposta e a segunda imagem anexada orientam dois cards de estrutura equivalente: título da linha e descrição geral na região superior; projetos ou subdivisões em uma região separada, cada qual com título, descrição curta e seta decorativa. Línguas apresenta NLP2 e ProIndL; governança apresenta Macro e Micro. A composição preserva o fundo claro, a borda superior verde-azulada e a escala tipográfica institucional.

Os novos resumos portugueses seguem literalmente a proposta do mantenedor e têm tradução equivalente em inglês. Um componente Astro próprio concentra a apresentação da Home, mantendo intactos os resumos compartilhados e a renderização detalhada de Pesquisas. Os dois acessos gerais pelos títulos dos eixos permanecem. Os quatro blocos de navegação apontam para âncoras reais e já existentes em Pesquisas: `NLP2_B_eng`, `ProIndL_B_eng`, `governance-macro` e `governance-micro`, com rotas por identificador estável em cada idioma e suporte a subdiretório.

Os cards ocupam duas colunas iguais quando o espaço acomoda 30 rem por card, com intervalo de 32 px e regiões internas alinhadas. Em espaços menores, empilham-se na ordem línguas → governança e usam altura determinada pelo conteúdo. Os links são nativos e agrupam título, descrição e indicador em uma área navegável com hover e foco visível. Os pequenos símbolos de linguagem e instituição no cabeçalho são decorativos. A Home permanece sem JavaScript cliente, novas dependências ou páginas.

As quatro sínteses editoriais da Home, duas por idioma, são alteradas pelos textos autorizados. Os quatro novos resumos são acrescentados à fixture editorial, preservando as frases iniciais que já eram obrigatórias. A única expectativa anterior substituída é a substring PT `governança` por `Governança`, conforme a capitalização dos títulos preservados; EN e as demais verificações permanecem iguais. A navegação ganha um contrato independente para os quatro novos blocos, preservando os dois destinos gerais. A [nota editorial](reformulation/2026-10-14-home-research/editorial.md) contém os textos, traduções, fontes e limites; [test-expectations.json](reformulation/2026-10-14-home-research/test-expectations.json) explica as mudanças de expectativa. Os requisitos de Pesquisas, Sobre, notícias, artigos históricos e elementos compartilhados permanecem ativos, assim como as evidências anteriores. Resultados reais da verificação de qualidade, capturas e revisão visual devem constar do [registro de validação desta etapa](reformulation/2026-10-14-home-research/validation.md). Não houve autorização para commit, push ou publicação.

## Hero da Home — 14/10/2026

O mantenedor solicitou reorganizar a apresentação inicial da Home em PT/EN conforme a segunda imagem de referência, preservando o título institucional e a ilustração abstrata. Texto e imagem passam a duas colunas de proporção aproximada 52/48 em desktop, com espaço de 48–64 px, escala tipográfica própria e altura determinada pelo conteúdo. A imagem mantém suas proporções e tem altura máxima de 400 px em desktop e 288 px no empilhamento. Até 800 px, os elementos seguem em uma coluna na ordem título → chamada → imagem, sem cortes na ilustração ou transbordamento.

A chamada passa de “Saiba mais” / “About us” para “Conheça o C4AI” / “Discover C4AI”, com seta decorativa, altura mínima de 48 px e os mesmos destinos Sobre por idioma. Essa é a única substituição textual desta etapa. O link continua nativo e sujeito a teclado, foco visível e funcionamento sem JavaScript e em subdiretório. Os estilos da mudança limitam-se ao hero da Home e à margem superior do título da seção seguinte, ajustada a zero para aproximar a transição. Os estilos internos dos cards, logos, conteúdos, metadados e heros das outras páginas mantêm os contratos anteriores.

O [registro editorial](reformulation/2026-10-14-home-hero/editorial.md) reúne escopo, referência, textos e critérios de aceite. Resultados de qualidade, capturas e revisão visual efetivamente realizados devem constar do [registro de validação](reformulation/2026-10-14-home-hero/validation.md), separado das evidências anteriores. Não se acrescentam páginas, dependências ou scripts, nem se autoriza commit, push ou publicação.

## Cabeçalho compartilhado — 14/10/2026

O mantenedor autorizou alinhar logo, navegação principal e idiomas no cabeçalho PT/EN. A composição mantém a largura institucional de 76 rem, o logo Figma e os destinos existentes; usa fundo branco e borda inferior, com altura mínima de 100 px em desktop e sem sombra do contêiner. Artigos com aviso de tradução ausente conservam altura natural maior, até 145,4 px observados, sem truncar essa informação para impor a altura da Home. O rótulo inicial em português passa de “Home” a “Início”; em inglês, “Home” permanece. A página atual recebe `aria-current="page"`, e Notícias/News indica o contexto de artigos e paginações com `aria-current="location"`; a indicação visual usa peso 700 e sublinhado, com fonte local regular 400 nos demais itens.

Até 1240 px, o logo proporcional de 160 px e o controle Menu compartilham a primeira linha, com altura mínima de 80 px quando fechado. O breakpoint considera medições dos 37 HTML `index.html`: a maior largura requerida a 1241 px foi de 1131,3 px, para 1193 px disponíveis, mantendo reserva de 61,7 px. Navegação vertical, idiomas e informação de tradução ausente ficam no menu nativo expandido. Somente uma variante do cabeçalho é visível e focável por largura. Submenus, destinos externos, operação por teclado, foco visível e funcionamento sem JavaScript permanecem; chevrons decorativos e estados de interação são padronizados.

As novas expectativas de composição, rótulo português e indicação atual são registradas independentemente da implementação. O [registro editorial](reformulation/2026-10-14-header/editorial.md) delimita o escopo; [validation.md](reformulation/2026-10-14-header/validation.md) receberá resultados reais de qualidade e revisão visual. Heros, cards, conteúdos, rodapé e evidências anteriores permanecem preservados. Não se acrescentam páginas, dependências ou scripts, nem se autoriza commit, push ou publicação.

## Revisão das interações do cabeçalho — 14/10/2026

Após avaliar a primeira implementação, o mantenedor solicitou corrigir a estrutura dos controles e o comportamento dos painéis. Sua orientação final prefere dropdowns por hover no desktop e clique no texto com navegação direta. Sobre/About e Notícias/News preservam o link da página geral e usam um controle de seta próprio de 24 px no desktop ou 44 px no compacto, sem linha divisória entre texto e seta, conforme a orientação final de retirar esses separadores; Recursos/Resources mantém acionador completo. Visão geral/Overview e Todas as notícias/All news também ficam como primeiro link interno de cada painel. Os demais links, a ordem das seis opções e as indicações acessíveis `aria-current="page"`/`"location"` permanecem.

No compacto, logo e Menu ficam no fluxo de Grid/Flexbox; o controle indica Fechar/Close quando aberto. As seis opções ocupam linhas completas: os links de texto têm a largura restante e as setas conservam 44 px à direita. O conjunto texto/seta recebe fundo persistente quando aberto, os sublinks ficam abaixo com pequena indentação e os idiomas ao final. No desktop, Sobre/About e Notícias/News alinham o painel ao início do controle, enquanto Recursos/Resources pode alinhar ao final para respeitar a janela. O divisor do seletor de idiomas permanece. Estados de página atual, hover, aberto e foco permanecem distintos. Logos, fontes, avisos de tradução ausente e breakpoint de 1240 px são preservados, sujeitos à nova validação.

Na última orientação, o mantenedor pediu igualar a distância entre rótulo e seta nos três itens expansíveis. A composição desktop adota 8 px visíveis em Sobre/About, Notícias/News e Recursos/Resources, mantendo ausência de divisores e, na correção final, áreas de seta de 24 × 44 px no desktop e 44 × 44 px no compacto. No compacto, o glyph fica centralizado na mesma coluna de 44 px à direita. A comparação precisa medir o espaço visual nos três grupos, além das áreas interativas.

A orientação seguinte pede igualar também os cinco espaços visuais entre as seis opções do menu. A composição usa um chevron SVG decorativo compartilhado de 12 × 12 px, 8 px entre rótulo e seta e `gap` de 24 px entre grupos; a referência visual entre o fim do conteúdo de cada item e o próximo rótulo é de 40 px. A medida considera os limites reais dos controles: as setas desktop de 24 × 44 px ficam dentro do próprio grupo, sem extensão clicável ao espaço vazio ou compensação por margem negativa. A igualdade deve ser comprovada pelos cinco intervalos em PT/EN, e não apenas pelo valor CSS declarado.

A última orientação remove a área clicável vazia e o quadrado isolado de hover/abertura nas setas de Sobre/Notícias. As setas desktop passam a 24 × 44 px, preservando 44 × 44 px no compacto. Seu fundo fica transparente; a indicação persistente continua no grupo inteiro e o contorno de foco permanece. O ajuste substitui somente a meta prática anterior de 44 px para essas setas desktop, com justificativa e requisito AA documentados em [quality.md](quality.md#ajuste-autorizado-das-áreas-de-seta-desktop). A validação precisa conferir também os limites clicáveis, além da aparência.

A correção compacta mais recente alinha os três chevrons e a seta externa de Oportunidades/Opportunities no mesmo eixo à direita. Os quatro slots mantêm 44 px com indicadores centralizados a 22 px da borda do menu; os rótulos têm início comum a 12 px da esquerda. A validação inclui PT/EN em 320, 390, 800, 1239 e 1240 px, antes e depois de expandir submenus, mantendo o destino externo e o foco dos controles.

O módulo local progressivo abre submenus por hover de mouse no desktop e fecha ao sair com 150 ms de tolerância para alcançar o painel. Também fecha ao clicar fora e com Escape, devolvendo o foco à seta; a exclusividade nativa por `name` tem fallback no módulo. Os destinos diretos, os controles nativos de seta e a troca de idioma continuam funcionais sem JavaScript. A autorização limita-se ao cabeçalho compartilhado e substitui somente a expectativa absoluta de zero scripts na Home; hero e cards permanecem sem scripts próprios. Não se acrescentam dependências ou páginas.

O [novo registro editorial](reformulation/2026-10-14-header-interactions/editorial.md) documenta a preferência final do mantenedor, traduções e substituições de expectativas. Os registros da primeira implementação em `2026-10-14-header` permanecem intactos. `npm run quality`, capturas PT/EN, revisão visual, zoom e larguras próximas do breakpoint terão resultados próprios em [validation.md](reformulation/2026-10-14-header-interactions/validation.md), ainda pendentes nesta nota. O trabalho continua sem autorização de commit, push ou publicação.

## Retomada da conferência do cabeçalho — 14/10/2026

O [registro da retomada](reformulation/2026-10-14-header-resume/validation.md) atualiza o estado da validação, preservando as notas históricas acima. Foram concluídos o `npm run quality` nas versões fixadas (21 testes de configuração e 726 de navegador) e oito novas capturas de zoom com setas estabilizadas. A conferência nativa em Safari 27.0.1 verificou os destinos e cliques, Escape desktop e o alinhamento dos quatro indicadores compactos em PT/EN. Hover isolado, sequência por Tab e matriz exata de larguras/artigos ainda exigem homologação no Safari, com limites e passos descritos no registro. A implementação permaneceu intacta.
